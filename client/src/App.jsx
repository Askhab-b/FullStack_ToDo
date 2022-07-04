import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./app.module.css";

import {
  addTodo,
  fetchTodos,
  patchTodo,
  removeTodo,
} from "./features/todosSlice";

function App() {
  const todos = useSelector((state) => state.todos); // []
  const loading = useSelector((state) => state.loading);

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    dispatch(addTodo(text));
    setText("");
  };

  const handleFav = (todo) => {
    dispatch(patchTodo(todo));
  };

  if (loading) {
    return "загрузка...";
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <input
          placeholder="Type your todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAddTodo} className={styles.addBtn}>
          Добавить
        </button>
        {todos.map((todo) => {
          return (
            <div
              key={todo._id}
              className={`${styles.todo} ${
                todo.completed ? styles.completed : ""
              }`}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button onClick={() => handleFav(todo)}>выполнено</button>
              <p>{todo.text}</p>
              <button onClick={() => handleRemoveTodo(todo._id)}>x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
