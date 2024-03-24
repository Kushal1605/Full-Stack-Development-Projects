import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        task: action.payload.task,
        isCompleted: false,
      };

      state.todos.push(todo);
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, task: action.payload.task }
          : todo
      );
    },

    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    },

    fetchTodos: (state, action) => { 
      state.todos = action.payload.todos
    }
  },
});

export const reducers = todoSlice.reducer;
export const { createTodo, deleteTodo, updateTodo, toggleTodo, fetchTodos } = todoSlice.actions;
