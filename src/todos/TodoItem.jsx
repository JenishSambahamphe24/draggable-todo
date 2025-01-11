import React, { useState, useRef, useEffect } from "react";
import { Trash2, FilePenLine } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  editTodo,
} from "../redux/slices/todoSlice";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";


function TodoItem({ todos }) {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newText, setNewText] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const dragRef = useRef()
 
  useEffect(() => {
    if (editingTodoId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodoId]);  
  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = (id, text) => {
    setEditingTodoId(id);
    setNewText(text);
  };

  const handleEditSubmit = (id) => {
    dispatch(editTodo({ id, text: newText }));
    setEditingTodoId(null);
    setNewText("");
  };


  // handle drag and drop
  const moveTodo = (dragIndex, hoverIndex) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, movedTodo);
    dispatch(reorderTodos(updatedTodos));
  };
  return (
    <>
    {todos.map((item, index) => {
      const [{ isDragging }, drag] = useDrag({
        type: "TODO",
        item: { id: item.id, index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

      const [, drop] = useDrop({
        accept: "TODO",
        hover: (draggedItem) => {
          if (draggedItem.index !== index) {
            moveTodo(draggedItem.index, index);
            draggedItem.index = index;
          }
        },
      });

      drag(drop(dragRef)); 

      return (
        <div
          key={item.id}
          ref={dragRef}
          style={{
            opacity: isDragging ? 0.5 : 1,
            backgroundColor: item.completed ? "#90c551" : "#f3f4f6",
            marginBottom: "0.5rem",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => dispatch(toggleComplete(item.id))}
            style={{ marginRight: "1rem" }}
          />
          <p style={{ flex: 1 }}>{item.text}</p>
          <button onClick={() => dispatch(deleteTodo(item.id))}>
            <Trash2 />
          </button>
        </div>
      );
    })}
  </>
  );
}

export default TodoItem;
