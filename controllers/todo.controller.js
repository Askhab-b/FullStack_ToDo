const Todo = require("../models/Todo.model");

module.exports.todoController = {
  postTodo: async (req, res) => {
    try {
      const todoAdd = await Todo.create({
        text: req.body.text,
      });
      res.json(todoAdd)
    } catch (error) {
      res.json(error.message);
    }
  },

  deleteTodo: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      res.json("DELETED");
    } catch (error) {
      res.json(error.message);
    }
  },

  patchTodo: async (req, res) => {
    try {
      const patchTodo = await Todo.findByIdAndUpdate(req.params.id, {
        completed: req.body.completed
      }, {new: true});
      res.json(patchTodo)
    } catch (error) {
      res.json(error.message);
    }
  },

  findAllTodo: async (req, res) => {
    try {
      const AllTodo = await Todo.find();
      res.json(AllTodo);
    } catch (error) {
      res.json(error.message);
    }
  },
};
