import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos : JSON.parse(localStorage.getItem('todos')) || []
};

const todoSlice = createSlice({
    name:'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now().toString(),
                text: action.payload,
                completed: false
            }
            state.todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        editTodo: (state, action) => {
            const todo = state.todos.find(item => item.id === action.payload.id)
            if (todo) {
                todo.text = action.payload.text;
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        toggleComplete: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                localStorage.setItem('todos', JSON.stringify(state.todos));
            }
        },
        reorderTodos: (state, action) => {
            state.todos = action.payload;
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },  
    }
})

export const { addTodo, editTodo, deleteTodo, toggleComplete, reorderTodos } = todoSlice.actions;
export default todoSlice.reducer