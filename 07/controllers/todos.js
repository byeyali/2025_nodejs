const models = require("../models");

exports.createTodo = async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(201).json({ message: "ok", data: todo });
};

exports.getAllTodo = async (req, res) => {
  const todos = await models.Todo.findAll();

  res.json({ message: "ok", data: todos });
};

exports.getOneTodo = async (req, res) => {
  const id = req.params.id;

  const todo = await models.Todo.findByPk(id);
  if (todo) res.status(200).json({ message: "ok", data: todo });
  else res.status(404).json({ message: "데이터가 없어요" });
};

exports.updateTodo = async (req, res) => {
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
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;

  const result = await models.Todo.destroy({
    where: { id: id },
  });

  if (result > 0) res.status(200).json({ message: "삭제 성공" });
  else res.status(404).json({ message: "데이터가 없어요" });
};
