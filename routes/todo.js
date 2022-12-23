const express = require("express");
const router = express.Router();
const {
  createTodo,
  readTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todo");

router.post("/todo", createTodo);

router.get("/todo", readTodo);

router.put("/todo/:id", updateTodo);

router.delete("/todo/:id", deleteTodo);

module.exports = router;
