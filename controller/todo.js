const Todo = require("../model/todo");

exports.createTodo = async (req, res) => {
  const { body } = req;
  if (body.status.value === "active") {
    body.status = true;
  } else {
    body.status = true;
  }
  const todo = new Todo(body);
  try {
    await todo.save();
    res.status(201).json({
      status: 201,
      message: "Create successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

exports.readTodo = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).send({
      status: 200,
      response: todo,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

exports.updateTodo = async (req, res) => {
  const { body, params } = req;
  const id = params.id;
  try {
    if (body.status.value === "active") {
      body.status = true;
    } else {
      body.status = true;
    }
    const todo = await Todo.findByIdAndUpdate(id, body, {
      new: true,
      useFindAndModify: false,
    });
    if (!todo) {
      return res.status(500).send({
        status: 500,
        message: `todo not found with id ${id}`,
      });
    }
    res.status(200).send({
      status: 200,
      message: "Update successfully",
      response: todo,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!todo) {
      return res.status(500).send({
        status: 500,
        message: `user not found with id ${id}`,
      });
    }
    res.status(200).send({
      status: 200,
      message: "Delete successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};
