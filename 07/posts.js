// express + sequelize crud 를 제공하는 서버가 이 파일에 코딩
// notes restful api 서버가 코딩
// 관련된 모듈 임포트
const express = require("express");
const models = require("./models");
const multer = require("multer");
const path = require("path");
const { QueryTypes } = require("sequelize");
const app = express();
const PORT = 3000;

app.use(express.json());
// 멀터 formdata, multi part form data 수신을 위한 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
// 다운로드 디렉토리 설정
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));
// http://localhost:3000/downloads/aa.png - uploadDir 아래에서 찾음

// 멀터저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 요 파일이 있는 디렉토리 하위로 uploadDir 생성
  filename: function (req, file, cb) {
    // file.originalname : aa
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, // Error
      fname
    );
  },
});

const upload = multer({ storage: storage });

// route add
// 1. POST /posts 요청이 들어오면 먼저 upload.single("file") 미들웨어를 탑니다.
// upload 미들웨어의 역할은 첨부파일을 uploadDir 폴더에 저장을 하는데 aa-123444.png 파일로 저장한다.
// req 객체에 첨부파일 첨부파일 정보를 실어 줍니다.
// 2. 우리가 만든 핸들러 함수에서 req.file 객체에서 파일정보를 사용할 수 있습니다.
app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;
  // http://localhost:3000/ + filename -> http://localhost:3000/downloads/aa-123444.png

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
    fileName: filename,
  });

  res.status(201).json({ message: "ok", data: post });
});

// 1. 게시글 목록
app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();

  res.json({ message: "ok", data: posts });
});

// 2. 게시글 상세
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;

  const post = await models.Post.findByPk(id);

  if (post) res.status(200).json({ data: post });
  else res.status(404).json({ message: "데이터가 없습니다." });
});

// 3. 게시글 수정
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

// 4. 게시글 삭제
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

// 5. 댓글 추가
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;

  // 5-1. 사용자 추가
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
  // 5-2.게시물 존재여부 체크
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

// 6. 댓글 목록 가지고 오기
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

// 7. 댓글 수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  // 7-1. 게시물 있는지 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 7-2. 댓글 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  // 7-3. 댓글 수정 및 저장
  if (comment) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "comment save ok" });
});

// 8. 댓글 삭제
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  // 8-1. 게시물 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 8-2. 댓글 삭제
  const result = await models.Comment.destroy({
    where: {
      postId: postId,
      id: commentId,
    },
  });

  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
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
