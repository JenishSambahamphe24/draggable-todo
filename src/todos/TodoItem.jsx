
// import React, { useState, useEffect, useRef } from "react";
// import DraggableTaskItem from "./DraggableTaskItem";
// import {  reorderTodos } from "../redux/slices/todoSlice";
// import { useDispatch } from "react-redux";

// function TodoItem({ todos }) {
//   const [editingTodoId, setEditingTodoId] = useState(null);
//   const [newText, setNewText] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (editingTodoId !== null && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [editingTodoId]);

//   const inputRef = useRef(null);


//   const moveTodo = (dragIndex, hoverIndex) => {
//     const updatedTodos = [...todos];
//     const [movedTodo] = updatedTodos.splice(dragIndex, 1);
//     updatedTodos.splice(hoverIndex, 0, movedTodo);
//     dispatch(reorderTodos(updatedTodos));
//   };

//   const startEditing = (id, text) => {
//     setEditingTodoId(id);
//     setNewText(text);
//   };

//   return (
//     <>
//       {todos.map((item, index) => (
//         <DraggableTaskItem
//           key={item.id}
//           item={item}
//           index={index}
//           moveTodo={moveTodo}
//           startEditing={startEditing}
//           inputRef={inputRef}
//         />
//       ))}
//     </>
//   );
// }

// export default TodoItem;

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import DraggableTaskItem from "./DraggableTaskItem";
import { reorderTodos } from "../redux/slices/todoSlice";
import { setEditing } from "../redux/slices/todoSlice";

function TodoItem({ todos }) {
  const dispatch = useDispatch();

  const moveTodo = (dragIndex, hoverIndex) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, movedTodo);
    dispatch(reorderTodos(updatedTodos));
  };

  const startEditing = (id, text) => {
    // Dispatch an action to set the editing state in Redux
    dispatch(setEditing({ id, editing: true, text }));
  };

  return (
    <>
      {todos.map((item, index) => (
        <DraggableTaskItem
          key={item.id}
          item={item}
          index={index}
          moveTodo={moveTodo}
          startEditing={startEditing}
        />
      ))}
    </>
  );
}

export default TodoItem;