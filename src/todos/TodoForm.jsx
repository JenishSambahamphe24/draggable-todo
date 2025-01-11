import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";
import { useSelector } from "react-redux";

function TodoForm() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.mode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      dispatch(addTodo(task));
      setTask(""); 
    } else {
      alert("Please enter a task!"); 
    }
  };

  return (
    // <main className="form-wrapper">
      <main className={`form ${mode === "dark" ? "dark" : ""}`}>
        <div style={{ padding: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <h1 >Add your task</h1>
            <span>If the task is completed, please check the checkbox.</span>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <div className="field-wrapper">
              <form
                style={{ width: "100%", position: "relative" }}
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter your task"
                  className="input-field"
                />
                <button type="submit" className="form-button">
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    // </main>
  );
}

export default TodoForm;
