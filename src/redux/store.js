import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import modeReducer from './slices/modeSlice'
const store = configureStore({
  reducer: {
    todos: todoReducer,
    mode: modeReducer
  },
});

export default store;
