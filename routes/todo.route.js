const { Router } = require("express");
const { todoController } = require("../controllers/todo.controller");

const router = Router();

router.post("/todo", todoController.postTodo);
router.delete("/todo/:id", todoController.deleteTodo);
router.patch("/todo/:id", todoController.patchTodo);
router.get("/todo", todoController.findAllTodo);

module.exports = router;
