const express = require("express");
const moment = require("moment");
const path = require("path");
const Database = require("better-sqlite3");

// DB 세팅
const db_name = path.join(__dirname, "checklist.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("나의 첫번째 미들웨어");
  next();
});

// TABLE CREATE
const createSql = `
    create table if not exists checklist
        (id integer primary key autoincrement,
        category varchar(300),
        item text,
        amount integer,
        checkyn boolean default 'N'
        )
`;
db.exec(createSql);

// 1. POST /checklist
app.post("/checklist", (req, res) => {
  const { category, item, amount } = req.body;
  let sql = `insert into checklist
                (category
                ,item
                ,amount)
            values
                (?
                ,?
                ,?)
        `;
  db.prepare(sql).run(category, item, amount);

  res.status(200).json({ message: "등록되었습니다." });
});

// 2. GET /checklist?category=여름휴가준비물
app.get("/checklist", (req, res) => {
  const category = req.query.category;

  let sql = `select id
                    ,item
                    ,amount
                    ,checkyn
                from checklist
                where category = ?`;

  const result = db.prepare(sql).all(category);

  res.status(200).json({ message: "ok", data: result });
});

// 3. PUT /checklist/:id
app.put("/checklist/:id", (req, res) => {
  const id = req.params.id;

  let sql = `update checklist
            set checkyn = IIF(checkyn='Y', 'N', 'Y') 
            where id = ? `;

  db.prepare(sql).run(id);
  res.status(200).json({ message: "ok" });
});

// 4. DELETE /checklist
app.delete("/checklist/:id", (req, res) => {
  const id = req.params.id;

  let sql = `delete from checklist
                where id = ?`;

  db.prepare(sql).run(id);
  res.status(200).json({ message: "ok" });
});

app.listen(PORT, (req, res) => {});
