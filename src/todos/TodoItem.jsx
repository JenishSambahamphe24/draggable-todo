

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