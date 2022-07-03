const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json());
app.use(require("./routes/todo.route"));

mongoose
  .connect(
    "mongodb+srv://Askhab:askhab622@cluster0.gutn8.mongodb.net/todos",
  )
  .then(() => console.log("Успешное соединение с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(4000, () => {
  console.log("Сервер запущен");
});
