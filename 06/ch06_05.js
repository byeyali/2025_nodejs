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

(async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "고길동",
    email: "eee@example.com",
    password: "12345678",
    age: 50,
  });

  const user2 = await User.create({
    username: "나길동",
    email: "e123@example.com",
    password: "12345678",
    age: 29,
  });

  const user3 = await User.create({
    username: "다길동",
    email: "abc@example.co.kr",
    password: "12345678",
    age: 52,
  });
  const user4 = await User.create({
    username: "김도영",
    email: "docap@kia.co.kr",
    password: "7777777",
    age: 22,
  });

  const users1 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 30,
      },
    },
  });

  console.log(
    users1.map((u) => {
      return {
        email: u.email,
        name: u.username,
      };
    })
  );
})();
