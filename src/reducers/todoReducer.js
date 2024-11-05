const todoReducer = (state = getTodosFromLocalStorage(), action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newStateAdded = [...state, action.payload];
      saveTodosToLocalStorage(newStateAdded);
      return newStateAdded;
    }
    case "DELETE_TODO": {
      const newStateDelete = state.filter(
        (todo) => todo.id !== action.payload.id
      );
      saveTodosToLocalStorage(newStateDelete);
      return newStateDelete;
    }
    case "COMPLETE_TODO": {
      const id = action.payload.id;
      const todoToComplete = state.find((todo) => todo.id === id);
      const completedTodo = {
        ...todoToComplete,
        completed: !todoToComplete.completed ? true : false,
      };
      const updatedCompleteStatusTodos = state.map((todo) =>
        todo.id !== id ? todo : completedTodo
      );
      saveTodosToLocalStorage(updatedCompleteStatusTodos);
      return updatedCompleteStatusTodos;
    }
    case "UPDATE_TODO": {
      const id = action.payload.id;
      const todoToUpdate = state.find((todo) => todo.id === id);
      const updateTodo = {
        ...todoToUpdate,
        title: action.payload.title,
      };
      const updatedStateTodos = state.map((todo) =>
        todo.id !== id ? todo : updateTodo
      );
      saveTodosToLocalStorage(updatedStateTodos);
      return updatedStateTodos;
    }
    default:
      return state;
  }
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const completedOrNote = [true, false];
const generateId = () => Math.floor(Math.random() * 1000000) + 1;

export const addTodoActionCreator = (todo) => {
  return {
    type: "ADD_TODO",
    payload: {
      title: todo,
      completed: completedOrNote[Math.random() < 0.5 ? 0 : 1],
      id: generateId(),
    },
  };
};

export const updateToDoActionCreator = (id, todo) => {
  return {
    type: "UPDATE_TODO",
    payload: {
      title: todo,
      id,
    },
  };
};

export const deleteToDoActionCreator = (id) => {
  return {
    type: "DELETE_TODO",
    payload: {
      id,
    },
  };
};

export const completeTodoActionContainer = (id) => {
  return {
    type: "COMPLETE_TODO",
    payload: {
      id,
    },
  };
};

export default todoReducer;
