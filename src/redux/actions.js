// ✅ Add Todo
export const addTodo = (text) => {
    return {
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        text,
        completed: false,
        completedAt: null, // initially not completed
      },
    };
  };
  
  // ✅ Delete Todo
  export const deleteTodo = (id) => {
    return {
      type: 'DELETE_TODO',
      payload: id,
    };
  };
  
  // ✅ Toggle Completed
  export const toggleTodo = (id) => {
    return {
      type: 'TOGGLE_TODO',
      payload: id,
    };
  };
  
  // ✅ Clear All Todos
  export const clearTodos = () => {
    return {
      type: 'CLEAR_TODOS',
    };
  };
  
  // 🌙 Toggle Dark/Light Mode
  export const toggleTheme = () => {
    return {
      type: 'TOGGLE_THEME',
    };
  };
  
  // ✏️ Edit Todo
  export const editTodo = (id, newText) => {
    return {
      type: 'EDIT_TODO',
      payload: {
        id,
        newText,
      },
    };
  };
  
