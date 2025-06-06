// redux/reducer.js

const initialState = {
    todos: [],
    theme: 'light', // default theme
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
  
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload),
        };
  
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload
              ? {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? new Date().toLocaleString() : null,
                }
              : todo
          ),
        };
  
      case 'CLEAR_TODOS':
        return {
          ...state,
          todos: [],
        };
  
      case 'TOGGLE_THEME':
        return {
          ...state,
          theme: state.theme === 'light' ? 'dark' : 'light',
        };
  
      case 'EDIT_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, text: action.payload.newText }
              : todo
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default todoReducer;
  
