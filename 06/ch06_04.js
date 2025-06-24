const { Sequelize, Model, DataType, Op, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
});

// 1. 회원모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], // 사용자이름 2장리 부터 5자리까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // 이메일 형식이어야지만 데이터 저장 가능
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);

// 2. 게시판 모델 정의
const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
// 3. 답변 모델 추가
const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "comments" }
);

User.hasMany(Post, {
  foreignKey: "authorId", // 여기서는 FK 컬럼명 지정
}); // 1 User : N Post
Post.belongsTo(User, {
  foreignKey: "authorId",
}); // N Post : 1 User
// post 테이블에 foreign key로 user 잡힌다.

// User <-> Comment
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// Post <-> Comment
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

(async () => {
  await sequelize.sync({ force: true });

  // Post 테이블에는 1명의 유저 ID 가 있다.
  // 1. 사용자 정보 생성 이후에 게시글 정보를 생성한다.
  const user1 = await User.create({
    username: "홍길동",
    email: "gildong@gmail.com",
    password: "007bbang",
  });
  const user2 = await User.create({
    username: "TRUMP",
    email: "madman@gmail.com",
    password: "ddorrai",
    age: 87,
  });

  const post1 = await Post.create({
    title: "내가 하는말을 믿어?",
    content: "훗 순진하군!!!",
    authorId: user2.id,
  });
  const post2 = await Post.create({
    title: "하늘을 날아 바람을 가르고 휘리릭~",
    content: "나는 뭐든지 할수 있지 이야기 속에서만",
    authorId: user1.id,
  });

  // 댓글 INSERT
  const comment1 = await Comment.create({
    content: "내용1",
    userId: user1.id,
    postId: post1.id,
  });

  const comment2 = await Comment.create({
    content: "내용2",
    userId: user1.id,
    postId: post2.id,
  });

  const comment3 = await Comment.create({
    content: "내용2",
    userId: user2.id,
    postId: post2.id,
  });

  const getPosts = await Post.findAll({
    include: [{ model: User }],
  });

  console.log(`getPosts => ${JSON.stringify(getPosts)}`);

  const userInfo = await User.findByPk(2, {
    include: [
      {
        model: Post,
      },
    ],
  });
  console.log(`UserInfo=>${JSON.stringify(userInfo)}`);
})();
