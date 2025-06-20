const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// DB 세팅
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json());

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
db.exec(create_sql);

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;

  let sql = `
        insert into posts (title, content, author)
        values (?, ?, ?);
    `;
  db.prepare(sql).run(title, content, author);
  res.status(201).json({ message: "ok" });
});

// 글목록
app.get("/posts", (req, res) => {
  let sql = `
        select id
            ,title
            ,content
            ,author
            ,createdAt
            ,count
        from posts
        order by createdAt desc
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all();
  console.log(rows);

  res.status(200).json({ data: rows });
});

// 글상세
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  sql = `
    select title
        ,content
        ,author
        ,createdAt
        ,count
    from posts
    where id = ?
    `;
  const stmt = db.prepare(sql);
  const row = stmt.get(id);

  if (row) res.status(200).json(row);
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

  db.prepare(sql).run(
    title,
    content,
    author,
    moment().format("YYYY-MM-DD"),
    id
  );
  res.redirect("/posts");
});

// 글삭제
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        delete from posts
        where id = ?
    `;

  db.prepare(sql).run(id);
  res.redirect("/posts");
});

// server start
app.listen(PORT, (req, res) => {});
