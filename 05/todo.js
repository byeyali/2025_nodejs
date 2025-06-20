const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");

// database setting
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

const create_sql = `
    create table if not exists todos (
        id integer primary key autoincrement,
        task varchar(255),
        description text,
        completed boolean default 0,
        createdAt datetime default current_timestamp,
        priority integer default 1
    );
`;
db.exec(create_sql);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json());

//1. 할일 쓰기
app.post("/todos", (req, res) => {
  const { task, description } = req.body;

  let sql = `
        insert into todos
            (task
            ,description)
        values
            (?
            ,?)
    `;
  const stmt = db.prepare(sql);
  stmt.run(task, description);

  res.status(201).json({ message: "ok" });
});

//2. todos 목록
app.get("/todos", (req, res) => {
  let sql = `
        select id
            ,task
            ,createdAt
            ,completed
            ,priority
        from todos
        order by createdAt desc
    `;
  const stmt = db.prepare(sql);
  const rows = stmt.all();

  res.status(200).json({ message: "ok", data: rows });
});

//3. todos 상세
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;

  let sql = `
        select task
            ,description
            ,createdAt
            ,priority
        from todos
        where id = ?
    `;

  const stmt = db.prepare(sql);
  const row = stmt.get(id);
  if (row) res.status(200).json({ message: "ok", data: row });
  else res.status(404).json({ error: "Not Found" });
});

//4. 할일수정
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;

  const { task, description } = req.body;

  let sql = `update todos
            set task = ?
                ,description = ?
            where id = ?
    `;

  const stmt = db.prepare(sql);
  stmt.run(task, description, id);
  res.status(200).json({ message: "ok" });
});

//5. 할일삭제
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  let sql = `delete from todos
            where id = ?
    `;

  const stmt = db.prepare(sql);
  stmt.run(id);
  res.json({ message: "ok" });
});

// server start
app.listen(PORT, (req, res) => {});
