const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 1. Todo 모델정의
const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "todos",
  }
);

// 모델 생성
(async () => {
  await sequelize.sync({ force: true });

  // 2. Todo 데이터 2개 입력
  const insTodo1 = await Todo.create({
    task: "Backend Project 찾기",
    description: "1년 이상 프로젝트 찾자",
  });
  console.log(`insert1 log => ${JSON.stringify(insTodo1)}`);

  const insTodo2 = await Todo.create({
    task: "Leader",
    description: "조직에서 Team Leader의 역할",
  });
  console.log(`insert log2 => ${JSON.stringify(insTodo2)}`);

  // 3. Todo 데이터 전체 조회
  const Todos = await Todo.findAll();
  console.log(`select todos => ${JSON.stringify(Todos)}`);

  // 4. Todo 아이디가 2번인 항목조회
  const Todo3 = await Todo.findByPk(2);
  console.log(`select by pk => ${JSON.stringify(Todo3)}`);

  // 5. Todo 아이디가 2번인 항목의 completed 를 완료로 바꿈
  await Todo.update(
    {
      completed: true,
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const Todo4 = await Todo.findByPk(2);
  console.log(`Todo4 => ${JSON.stringify(Todo4)}`);

  // 6. Todo 아이디가 2번인 항목 삭제
  await Todo.destroy({
    where: {
      id: 2,
    },
  });
  const Todo5 = await Todo.findByPk(2);
  console.log(`Todo5 => ${JSON.stringify(Todo5)}`);
})();
