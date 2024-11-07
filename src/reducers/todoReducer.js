const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState = getTodosFromLocalStorage();

import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodoItem(state, action) {
      console.log(action.payload);
      const newTodo = {
        title: action.payload,
        completed: false,
        id: nanoid(),
      };
      const newState = [...state, newTodo];
      saveTodosToLocalStorage(newState);
      return newState;
    },
    deleteTodoItem(state, action) {
      const stateAfterDeletion = state.filter(
        (todo) => todo.id !== action.payload
      );
      saveTodosToLocalStorage(stateAfterDeletion);
      return stateAfterDeletion;
    },
    markItemToBeCompleted(state, action) {
      const id = action.payload;
      const todoToComplete = state.find((todo) => todo.id === id);
      const completedTodo = {
        ...todoToComplete,
        completed: !todoToComplete.completed,
      };
      const newState = state.map((item) =>
        item.id !== id ? item : completedTodo
      );
      saveTodosToLocalStorage(newState);
      return newState;
    },
    updateTodoItem(state, action) {
      const id = action.payload.id;
      const todoToUpdate = state.find((todo) => todo.id === id);
      const updatedTodo = {
        ...todoToUpdate,
        title: action.payload.title,
      };
      const newState = state.map((todo) =>
        todo.id !== id ? todo : updatedTodo
      );
      saveTodosToLocalStorage(newState);
      return newState;
    },
  },
});

export const {
  createTodoItem,
  deleteTodoItem,
  markItemToBeCompleted,
  updateTodoItem,
} = todoSlice.actions;

export default todoSlice.reducer;
