// import React, { useState, useRef, useEffect } from "react";
// import { Trash2, FilePenLine } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { toggleComplete, deleteTodo, editTodo } from "../redux/slices/todoSlice";
// import { useDrag, useDrop } from "react-dnd";

// const ItemTypes = {
//   TODO: "todo",
// };

// function DraggableTaskItem({ item, index, moveTodo, startEditing, inputRef }) {
//   const dispatch = useDispatch();
//   const [newText, setNewText] = useState(item.text); 


//   useEffect(() => {
//     if (item.editing && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [item.editing, inputRef]);

//   const handleEditSubmit = (id) => {
//     dispatch(editTodo({ id, text: newText }));
//     startEditing(null, "");
//   };

//   const dragRef = useRef(null);

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.TODO,
//     item: { index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, drop] = useDrop({
//     accept: ItemTypes.TODO,
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         moveTodo(draggedItem.index, index);
//         draggedItem.index = index;
//       }
//     },
//   });

//   drag(drop(dragRef));

//   return (
//     <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       <div
//         style={{
//           color: item.completed ? "white" : "black",
//           backgroundColor: item.completed ? "#90c551" : "#f3f4f6",
//         }}
//         className={`item-wrapper ${item.completed ? "completed" : ""}`}
//       >
//         <input
//           type="checkbox"
//           style={{ marginRight: "1rem" }}
//           checked={item.completed}
//           onChange={() => dispatch(toggleComplete(item.id))}
//           className="item-checkbox"
//         />
//         <div className="item" style={{ flexGrow: 1 }}>
//           {item.editing ? (
//             <div className="relative">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={newText}
//                 onChange={(e) => setNewText(e.target.value)}
//                 onBlur={() => handleEditSubmit(item.id)} // Save changes on blur
//                 className="item-edit-field"
//               />
//             </div>
//           ) : (
//             <p className="item-text">{item.text}</p>
//           )}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: "10px",
//           }}
//         >
//           <button
//             className="mode-Button"
//             onClick={() => startEditing(item.id, item.text)}
//           >
//             <FilePenLine className="text-gray-800 dark:text-white" />
//           </button>
//           <button
//             className="mode-Button"
//             onClick={() => dispatch(deleteTodo(item.id))}
//           >
//             <Trash2 className="text-gray-800 dark:text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DraggableTaskItem;

import React, { useState, useEffect, useRef } from "react";
import { Trash2, FilePenLine } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo, editTodo } from "../redux/slices/todoSlice";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  TODO: "todo",
};

const DraggableTaskItem = React.memo(({ item, index, moveTodo, startEditing }) => {
  const dispatch = useDispatch();
  const [newText, setNewText] = useState(item.text); // Manage new text state during editing
  const inputRef = useRef(null); // Create a ref for the input field

  // Focus input when editing starts
  useEffect(() => {
    if (item.editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [item.editing]);

  const handleEditSubmit = (id) => {
    if (newText.trim()) { // Prevent empty edits
      dispatch(editTodo({ id, text: newText }));
      startEditing(null, ""); // Reset editing state
    }
  };

  const dragRef = useRef(null); // Create the drag ref here

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index; // Update the index for the dragged item
      }
    },
  });

  drag(drop(dragRef));

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div
        style={{
          color: item.completed ? "white" : "black",
          backgroundColor: item.completed ? "# 90c551" : "#f3f4f6",
        }}
        className={`item-wrapper ${item.completed ? "completed" : ""}`}
      >
        <input
          type="checkbox"
          style={{ marginRight: "1rem" }}
          checked={item.completed}
          onChange={() => dispatch(toggleComplete(item.id))}
          className="item-checkbox"
        />
        <div className="item" style={{ flexGrow: 1 }}>
          {item.editing ? (
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onBlur={() => handleEditSubmit(item.id)} // Save changes on blur
                className="item-edit-field"
              />
            </div>
          ) : (
            <p className="item-text">{item.text}</p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            className="mode-Button"
            onClick={() => startEditing(item.id, item.text)}
          >
            <FilePenLine className="text-gray-800 dark:text-white" />
          </button>
          <button
            className="mode-Button"
            onClick={() => dispatch(deleteTodo(item.id))}
          >
            <Trash2 className="text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default DraggableTaskItem;
