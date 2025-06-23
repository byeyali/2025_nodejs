const express = require("express"); // express 모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqlite3 모듈 임포트
const path = require("path"); // 경로 모듈 임포트

// DB 세팅
const db_name = path.join(__dirname, "post.db"); // sqlite용 데이터베이스 파일
const db = new Database(db_name); // better-sqlite3 데이터베이스 생성

// express setting
const app = express(); // app 이란 변수에 express 함수를 담습니다. app 변수 이용해 express 기능 사용
const PORT = 3000; // 포트 설정
app.use(express.json()); // app.use 미들웨어 설정. 모든 요청 응답에 json 포맷 설정

app.use((req, res, next) => {
  console.log("나의 첫번째 미들웨어");
  next();
});

// 1. post.db 게시판 전용 테이블을 만들어야 합니다.
const create_sql = `
create table if not exists posts (
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0
);

create table if not exists comments (
  id integer primary key autoincrement,
  comment text,
  author text,
  createdAt datetime default current_timestamp,
  postId integer,
  foreign key(postId) references posts(id) on delete cascade
);
`;

db.exec(create_sql); // 쿼리 실행

// 글등록
// app.post => POST 요청 처리. http://my-url/posts POST -> 두번째 인자의 핸들러 함수 실행
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;

  let sql = `
        insert into posts (title, content, author)
        values (?, ?, ?);
    `;
  const stmt = db.prepare(sql); // 문자열 sql 실제 쿼리문으로 파싱. statement 객체로 만듬
  const result = stmt.run(title, content, author);
  const newPost = db
    .prepare(` select * from posts where id = ? `)
    .get(result.lastInsertRowid);
  // stmt.run - INSERT, UPDATE, DELETE 사용시
  // stmt.all - [] - 배열로 값 반환
  // stmt.get - {} - 객체로 값 반환
  res.status(201).json({ message: "ok", data: newPost });
});

// 글목록
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  let sql = `
        select id
            ,title
            ,author
            ,createdAt
            ,count
        from posts
        order by createdAt desc limit ? offset ?
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset); // 쿼리를 실행하고 결과는 []배열로 반환
  console.log(rows);

  // 전체 게시글 수 조회
  const totalCount = db
    .prepare(`select count(*) as count from posts `)
    .get().count;
  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({
    data: rows,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      limit: limit,
    },
  }); // JSON.stringify({data:rows}) 객체를 JSON 문자열
});

// 글상세
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
    select title
        ,content
        ,author
        ,createdAt
        ,count
    from posts
    where id = ?
    `;
  let ac_sql = `
        update posts
        set count = count + 1
        where id = ?
        `;

  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql);
  const row = stmt.get(id);

  if (row) res.status(200).json({ data: row });
  else res.status(404).json({ error: "Not Found" });
});

// 글수정
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content, author } = req.body;
  let sql = `
        update posts
        set title = ?
            ,content = ?
            ,author = ?
            ,createdAt = ?
       where id = ?
    `;

  const stmt = db.prepare(sql);
  stmt.run(title, content, author, moment().format("YYYY-MM-DD"), id);

  const updatedPost = db.prepare(`select * from posts where id = ?`).get(id);
  if (!updatedPost) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  res.status(200).json({ message: "ok", data: updatedPost });
});

// 글삭제
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        delete from posts
        where id = ?
    `;

  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({ message: "ok" });
});

// 댓글 추가
app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  const { comment, author } = req.body;

  // 1. 게시글 있는지 확인
  const post = db
    .prepare(
      `
    select id from posts where id = ?
    `
    )
    .get(postId);

  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을수 없음" });
  }

  //2. 답변 추가
  const sql = `
      insert into comments
          (postId
          ,author
          ,comment)
          values
          (?
          ,?
          ,?)
  `;

  const result = db.prepare(sql).run(postId, author, comment);

  //3. 신규 답변 조회 및 반환
  const newComment = db
    .prepare(`select * from comments where id = ?`)
    .get(result.lastInsertRowid);

  res.status(201).json({ message: "ok", data: newComment });
});

// 댓글 목록
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const postSql = `select * from comments where postId = ?`;

  const post = db.prepare(postSql).get(postId);

  if (!post) {
    return res.status(404).json({ message: "게시글 찾을 수 없음" });
  }
  const sql = `
    select id
        ,author
        ,comment
        ,createdAt
    from comments
    where postId = ?
    order by id desc
  `;

  const commentsRows = db.prepare(sql).all(postId);

  res.status(200).json({ message: "ok", data: commentsRows });
});

// 댓글 삭제
app.delete("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const comment = db
    .prepare(`select * from comments where postId = ? and id = ?`)
    .get(postId, commentId);

  if (!comment) {
    return res.status(404).json({ message: "댓글을 찾을 수 없어요." });
  }

  const sql = `delete from comments where id = ?`;
  db.prepare(sql).run(commentId);

  res.status(200).json({ message: "ok" });
});

// 댓글 수정
app.put("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { author, comment } = req.body;

  const commentObj = db
    .prepare(`select * from comments where postId = ? and id = ?`)
    .get(postId, commentId);

  if (!commentObj) {
    return res.status(404).json({ message: "댓글이 없어요" });
  }
  const newAuthor = author !== undefined ? author : commentObj.author;
  const newComment = comment !== undefined ? comment : commentObj.comment;

  db.prepare(
    `update comments
            set author = ?
              ,comment = ?
            where id = ?
    `
  ).run(newAuthor, newComment, commentId);

  const updatedComment = db
    .prepare(`select * from comments where id = ?`)
    .get(commentId);

  res.status(200).json({ message: "ok", data: updatedComment });
});
// server start
app.listen(PORT, (req, res) => {});
