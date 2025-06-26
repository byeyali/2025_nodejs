// express + sequelize crud 를 제공하는 서버가 이 파일에 코딩
// notes restful api 서버가 코딩
// 관련된 모듈 임포트
const express = require("express");
const models = require("./models");
const { QueryTypes } = require("sequelize");
const app = express();
const PORT = 3000;

app.use(express.json());

// route add
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  // 원래는 jwt 토큰에서 사용자 ID를 받아와서 넣어줘야 하지만 배우지 않아 생성후에 넣도록 한다.
  let user = await models.User.findOne({
    where: {
      email: "byeyali:hotmail.com",
    },
  });

  if (!user) {
    user = await models.User.create({
      name: "양연희",
      email: "byeyali@hotmail.com",
      password: "1234567",
    });
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
  });

  res.status(201).json({ message: "ok", data: post });
});

// 게시글 목록
app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();

  res.json({ message: "ok", data: posts });
});

// 게시글 상세
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;

  const post = await models.Post.findByPk(id);

  if (post) res.status(200).json({ data: post });
  else res.status(404).json({ message: "데이터가 없습니다." });
});

// 게시글 수정
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;

  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);

  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "데이터가 없습니다." });
  }
});

// 게시글 삭제
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;

  const result = await models.Post.destroy({
    where: {
      id: id,
    },
  });

  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "데이터가 없습니다." });
  }
});

// 댓글 추가
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  // 사용자 추가
  let user = await models.User.findOne({
    where: {
      email: "b@example.com",
    },
  });
  if (!user) {
    user = await models.User.create({
      name: "뉴진스",
      email: "b@example.com",
      password: "444777",
    });
  }
  // 게시물 존재여부 체크
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "게시글이 없어요" });
  }
  // userId 로그인 뒤에 jwt 토큰에서 받아야 하지만 지금은 무조건 1
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: 1,
  });
  res.status(201).json({ message: "ok", data: comment });
});

// 댓글 목록 가지고 오기
app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comments });
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
  console.log(`http://localhost:3000/${PORT}에서 실행중!!!!!`);
});
