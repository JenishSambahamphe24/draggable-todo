import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./todos/Navbar";
import TodoForm from "./todos/TodoForm";
import TodoList from "./todos/TodoList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [count, setCount] = useState(0);
  const mode = useSelector((state) => state.mode.mode);
  console.log(mode);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`wrapper ${mode === "light" ? "light" : "dark"}`}>
        <Navbar />
        <div style={{ marginTop: "4rem" }}>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
