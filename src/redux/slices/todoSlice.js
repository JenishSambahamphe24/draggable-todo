// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     todos : JSON.parse(localStorage.getItem('todos')) || []
// };

// const todoSlice = createSlice({
//     name:'todos',
//     initialState,
//     reducers: {
//         addTodo: (state, action) => {
//             const newTodo = {
//                 id: Date.now().toString(),
//                 text: action.payload,
//                 completed: false
//             }
//             state.todos.push(newTodo);
//             localStorage.setItem('todos', JSON.stringify(state.todos));
//         },
//         editTodo: (state, action) => {
//             const todo = state.todos.find(item => item.id === action.payload.id)
//             if (todo) {
//                 todo.text = action.payload.text;
//                 localStorage.setItem('todos', JSON.stringify(state.todos));
//             }
//         },
//         deleteTodo: (state, action) => {
//             state.todos = state.todos.filter(todo => todo.id !== action.payload);
//             localStorage.setItem('todos', JSON.stringify(state.todos));
//         },
//         toggleComplete: (state, action) => {
//             const todo = state.todos.find(todo => todo.id === action.payload);
//             if (todo) {
//                 todo.completed = !todo.completed;
//                 localStorage.setItem('todos', JSON.stringify(state.todos));
//             }
//         },
//         reorderTodos: (state, action) => {
//             state.todos = action.payload;
//           },
     

//     }
// })

// export const { addTodo, editTodo, deleteTodo, toggleComplete, reorderTodos } = todoSlice.actions;
// export default todoSlice.reducer
// todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: Date.now(), text: action.payload, completed: false, editing: false });
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.editing = false; // Reset editing state after editing
      }
    },
    setEditing: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.editing = action.payload.editing; // Set editing state
      }
    },
    reorderTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo, editTodo, setEditing, reorderTodos } = todoSlice.actions;
export default todoSlice.reducer;