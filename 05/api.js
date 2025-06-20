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

// 1. post.db 게시판 전용 테이블을 만들어야 합니다.
const create_sql = `
create table if not exists posts (
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0
)`;
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
  stmt.run(title, content, author);
  // stmt.run - INSERT, UPDATE, DELETE 사용시
  // stmt.all - [] - 배열로 값 반환
  // stmt.get - {} - 객체로 값 반환
  res.status(201).json({ message: "ok" });
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

  res.status(200).json({ data: rows }); // JSON.stringify({data:rows}) 객체를 JSON 문자열
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
  res.redirect("/posts");
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

// server start
app.listen(PORT, (req, res) => {});
