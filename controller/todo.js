const Todo = require("../model/todo");

exports.createTodo = async (req, res) => {
  // if (!req.body.firstName || !req.body.lastName || !req.body.email) {
  //   return res.status(422).json({
  //     status: 422,
  //     user: {
  //       firstName: "firstName is required",
  //       lastName: "lastName is required",
  //       email: "enail is required",
  //     },
  //   });
  // }
  const { body } = req;
  console.log("body => ", body);
  const todo = new Todo(body);
  try {
    await todo.save();
    res.status(201).json({
      status: 201,
      message: "Create successfully",
    });
  } catch (error) {
    console.log("error =========> ",error)
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

// exports.readUserById = async (req, res) => {
//   const id = req.params.userId;
//   try {
//     const user = await User.findById(id);
//     res.status(200).send({
//       status: 200,
//       response: user,
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: 500,
//       message: `Something wen't wrong`,
//     });
//   }
// };

exports.updateTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
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
      message: "Update successfully",
      response: todo
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.params.userId;
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
