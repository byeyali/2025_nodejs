const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");
const { create } = require("domain");

// db Setting
const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

// table create
const create_sql = `
    create table if not exists expenses(
        id integer primary key autoincrement,
        title text not null,
        amount integer not null,
        date text not null,
        memo text
    )
`;
db.exec(create_sql);

// express setting
const app = new express();
const PORT = 3000;

app.use(express.json());

// 1. 가계부 입력 POST /expenses
app.post("/expenses", (req, res) => {
  const { title, amount, date, memo } = req.body;

  let sql = `insert into expenses
            (title
            ,amount
            ,date
            ,memo)
            values
            (?
            ,?
            ,?
            ,?)`;

  const stmt = db.prepare(sql);
  stmt.run(title, amount, date, memo);

  res.status(200).json({ message: "ok" });
});

// 2. 가계부 전체 목록 조회
app.get("/expenses", (req, res) => {
  let sql = `select title
                ,amount
                ,date
                ,memo
            from expenses
            order by id desc
            `;
  const stmt = db.prepare(sql);
  const rows = stmt.all();

  res.status(200).json({ data: rows });
});

// 3. 가계부 목록 조회 (날짜)
app.get("/expenses/:date", (req, res) => {
  const date = req.params.date;

  let sql = `select id
                    ,title
                    ,amount
                    ,memo
                from expenses
                where date = ?
            `;
  const stmt = db.prepare(sql);
  const dRows = stmt.all(date);

  if (dRows.length == 0)
    res.status(404).json({ message: " 데이터가 없습니다. ", data: dRows });
  else res.status(200).json({ data: dRows });
});

// 4. 가계부 수정 PUT /expenses/12
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { title, amount, memo } = req.body;
  let sql = `update expenses
                set title = ?
                    ,amount = ?
                    ,memo = ?
                where id = ?
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, amount, memo, id);

  res.status(200).json({ message: "ok" });
});

// 5. 가계부 삭제  DELETE /expenses/12
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;

  let sql = `delete from expenses
                where id = ?`;
  const stmt = db.prepare(sql);
  stmt.run(id);
  res.status(200).json({ message: "ok" });
});

// 가계부 입력 POST /expenses
app.listen(PORT, (req, res) => {});
