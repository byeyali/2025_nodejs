const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

router.post("/", todoController.createTodo);
router.get("/", todoController.getAllTodo);
router.get("/:id", todoController.getOneTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
