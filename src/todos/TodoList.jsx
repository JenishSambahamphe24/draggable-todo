import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "active") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div style={{marginTop:'1rem'}} className="todo-list">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.75rem",
          padding: ".25rem",
        }}
      >
        <button
          className={`filter-button ${
            filter === "all" ? "active" : "inactive"
          }`}
          onClick={() => setFilter("all")}
        >
          All tasks
        </button>
        <button
          className={`filter-button ${
            filter === "completed" ? "active" : "inactive"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed tasks
        </button>
        <button
          className={`filter-button ${
            filter === "incomplete" ? "active" : "inactive"
          }`}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete tasks
        </button>
      </div>
      <TodoItem todos={filteredTodos} />
    </div>
  );
}

export default TodoList;
