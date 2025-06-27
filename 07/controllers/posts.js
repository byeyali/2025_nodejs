const models = require("../models");

const createPost = async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null; // filename aa-123444.png
  filename = `/downloads/${filename}`;

  let attachments = [];
  if (req.file) {
    // single file
    attachments.push({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } else if (req.files && req.files.length > 0) {
    // multiple file
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: req.user.id,
    // fileName: filename,
    attachments: attachments,
  });
  res.status(201).json({ message: "ok", data: post });
};

const findAllPosts = async (req, res) => {
  const posts = await models.Post.findAll();

  res.status(200).json({ message: "ok", data: posts });
};

const findOnePost = async (req, res) => {
  const id = req.params.id;

  const post = await models.Post.findByPk(id);

  if (post) res.status(200).json({ data: post });
  else res.status(404).json({ message: "데이터가 없습니다." });
};

const updatePost = async (req, res) => {
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
};

const deletePost = async (req, res) => {
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
};

const addComments = async (req, res) => {
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
};

const findComments = async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comments });
};

const updateComments = async (req, res) => {
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
};

const deleteComments = async (req, res) => {
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
};

module.exports = {
  createPost,
  findAllPosts,
  findOnePost,
  updatePost,
  deletePost,
  addComments,
  findComments,
  updateComments,
  deleteComments,
};
