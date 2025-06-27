const models = require("../models");

// 모델에서 데이터 조회, 수정, 추가, 삭제
exports.createNote = async (req, res) => {
  const { title, content, tag } = req.body;

  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(201).json({ message: "등록되었습니다.", data: note });
};

exports.getAllNotes = async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll();

  if (notes) res.status(201).json({ message: "ok", data: notes });
};

exports.getNotes = async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({
    where: {
      tag: tag,
    },
  });

  if (notes) res.status(201).json({ message: "ok", data: notes });
};

exports.updateNote = async (req, res) => {
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
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;

  const result = await models.Note.destroy({
    where: {
      id: id,
    },
  });

  if (result > 0) res.status(200).json({ message: "삭제성공" });
  else res.status(404).json({ message: "데이터가 없습니다." });
};
