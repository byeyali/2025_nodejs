const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

(async () => {
  // 함수는 즉시실행 함수인데
  // 이렇게 하는 이유는 sequelize 는 Promise를 이용해서 작업하는데
  // async/await 를 이용해서 Promise 작업을 위해서 즉시실행함수 안에서 코딩
  await sequelize.sync({ force: false });

  const post1 = await Post.create({
    title: "이거 별로 간단치 않아요",
    content: "난 쿼리문 바로 입력하는게 좋은데요.",
    author: "흠흠흠",
  });
  //  console.log(post1);

  const post2 = await Post.create({
    title: "내가 원하는 방식이 아니에요",
    content: "난 옛날 사람",
    author: "꼰대",
  });
  //  console.log(`post2 created===> ${JSON.stringify(post2)}`);

  const posts = await Post.findAll();
  //console.log(`post findAll => ${JSON.stringify(posts)}`);

  const post11 = await Post.findByPk(1);
  //console.log(`post11 => ${JSON.stringify(post11)}`);

  const post12 = await Post.findOne({
    where: {
      author: "흠흠흠",
    },
  });
  //console.log(`post12 => ${JSON.stringify(post12)}`);

  await Post.update(
    {
      title: "이번주는 ORM 공부하는 주입니다.",
      content: "반복반복반복",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const post13 = await Post.findByPk(1);
  console.log(`post13 => ${JSON.stringify(post13)}`);

  await Post.destroy({
    where: {
      id: 1,
    },
  });
  const post14 = await Post.findByPk(1);
  console.log(`post14 => ${JSON.stringify(post14)}`);
})();
