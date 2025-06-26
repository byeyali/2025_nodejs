// express + sequelize crud 를 제공하는 서버가 이 파일에 코딩
// todos restful api 서버가 코딩
// 관련된 모듈 임포트
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());
// 1. 등록
app.post("/todos", async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(201).json({ message: "ok", data: todo });
});

// 2. 조회
app.get("/todos", async (req, res) => {
  const todos = await models.Todo.findAll();

  res.json({ message: "ok", data: todos });
});

// 3. 단건조회
app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;

  const todo = await models.Todo.findByPk(id);
  if (todo) res.status(200).json({ message: "ok", data: todo });
  else res.status(404).json({ message: "데이터가 없어요" });
});

// 4. 수정
app.put("/todos/:id", async (req, res) => {
  const { task, description, completed, priority } = req.body;
  const id = req.params.id;

  const todo = await models.Todo.findByPk(id);
  if (todo) {
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (completed) todo.completed = completed;
    if (priority) todo.priority = priority;
    await todo.save();
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "데이터가 없어요" });
  }
});

// 5. 삭제
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  const result = await models.Todo.destroy({
    where: { id: id },
  });

  if (result > 0) res.status(200).json({ message: "삭제 성공" });
  else res.status(404).json({ message: "데이터가 없어요" });
});

app.listen(PORT, (req, res) => {
  console.log(`Todo 서버가 http://localhost:${PORT} 에서 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
    });
});
