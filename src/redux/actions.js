export const addTodo = (text) => {
    return {
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        text
      }
    };
  };
  
  export const deleteTodo = (id) => {
    return {
      type: 'DELETE_TODO',
      payload: id
    };
  };

  // ✅ New Action: Toggle Completed
export const toggleTodo = (id) => {
    return {
      type: 'TOGGLE_TODO',
      payload: id,
    };
  };
  
  // ✅ New Action: Clear All Todos
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
  