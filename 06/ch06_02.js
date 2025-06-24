const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  // 1. 모델로 생성하는 코드를 넣어보세요.
  await sequelize.sync({ force: false });

  // 2. 사용자 2명 생성
  const user1 = await User.create({
    username: "yhyang",
    password: "yang2973#!",
    email: "byeyali92@gmail.com",
    birthDate: "1973-03-23",
  });
  console.log(`user1 => ${JSON.stringify(user1)}`);

  const user2 = await User.create({
    username: "yslee",
    password: "ysl8922",
    email: "lee0811@email.com",
    birthDate: "1970-08-11",
  });
  console.log(`user2 => ${JSON.stringify(user2)}`);

  // 3. 사용자 전체 검색
  const users = await User.findAll();
  console.log(`users => ${JSON.stringify(users)}`);

  // 4. 사용자 아이디가 2번인 사람만 출력
  const user3 = await User.findByPk(2);
  console.log(`user3 => ${JSON.stringify(user3)}`);

  // 5. 사용자가 2번인 사람의 email jihooni@kakao.com 으로 바꾸고 출력
  await User.update(
    {
      email: "jihooni@kakao.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const user4 = await User.findByPk(2);
  console.log(`user4 => ${JSON.stringify(user4)}`);

  // 6. 사용자 아이디가 2번인 사람을 삭제하고, 2번인 사람을 출력해 보세요.(null)
  await User.destroy({
    where: {
      id: 2,
    },
  });
  const user5 = await User.findByPk(2);
  console.log(`user5 => ${JSON.stringify(user5)}`);
})();
