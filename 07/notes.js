// express + sequelize crud 를 제공하는 서버가 이 파일에 코딩
// notes restful api 서버가 코딩
// 관련된 모듈 임포트
const express = require("express");
const models = require("./models");
const { QueryTypes } = require("sequelize");
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. post notes
app.post("/notes", async (req, res) => {
  const { title, content, tag } = req.body;

  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });

  res.status(201).json({ message: "등록되었습니다.", data: note });
});

// 2. get all notes
app.get("/notes", async (req, res) => {
  const notes = await models.Note.findAll();

  if (notes) res.status(200).json({ message: "ok", data: notes });
  else res.status(404).json({ message: "데이터가 없습니다." });
});

// 2-1. get tag notes
app.get("/notes/:tag", async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({
    where: {
      tag: tag,
    },
  });

  if (notes) res.status(200).json({ message: "ok", data: notes });
  else res.status(404).json({ message: "데이터가 없습니다." });
});

// 3. get id note
app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;

  const note = await models.Note.findByPk(id);
  if (note) res.status(200).json({ message: "ok", data: note });
  else res.status(404).json({ message: "데이터가 없습니다." });
});

// 4. update note
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tag } = req.body;

  const note = await models.Note.findByPk(id);
  if (note) {
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;

    await note.save();
    res.status(200).json({ message: "ok", data: note });
  } else {
    res.status(404).json({ message: "데이터가 없습니다." });
  }
});

// 5. delete note
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;

  const result = await models.Note.destroy({
    where: {
      id: id,
    },
  });

  if (result > 0) res.status(200).json({ message: "삭제성공" });
  else res.status(404).json({ message: "데이터가 없습니다." });
});

// 0. note 테이블 생성
app.listen(PORT, (req, res) => {
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connect !!!");
    })
    .catch(() => {
      console.log(" db connection error !!!");
    });
  console.log(`http://localhost:3000/${PORT}에서 실행중`);
});
