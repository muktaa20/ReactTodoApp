import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearTodos,
  toggleTheme,
  editTodo,
} from './redux/actions'

function App() {
  const { todos, theme } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState('')
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editText, setEditText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    dispatch(addTodo(inputText))
    setInputText('')
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleToggleComplete = (id) => {
    dispatch(toggleTodo(id))
  }

  const handleClearAll = () => {
    dispatch(clearTodos())
  }

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  const handleEdit = (id, currentText) => {
    setEditingTodoId(id)
    setEditText(currentText)
  }

  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch(editTodo(id, editText))
    }
    setEditingTodoId(null)
    setEditText('')
  }

  const handleEditCancel = () => {
    setEditingTodoId(null)
    setEditText('')
  }

  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)

  if (isLoading) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen flex items-center justify-center`}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium">Loading your todos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} min-h-screen p-4 transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto mt-10 p-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 bg-inherit backdrop-blur-sm transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Todo App</h1>
          <button
            onClick={handleToggleTheme}
            className={`px-4 py-2 rounded-full flex items-center justify-center transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-md flex items-center"
          >
            <span>Add Todo </span>
          </button>
        </form>

        {todos.length > 0 ? (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Your Tasks</h2>
              <div className="text-sm">
                <span className={`mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {pendingTodos.length} pending
                </span>
                <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>
                  {completedTodos.length} completed
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {pendingTodos.length > 0 && (
                <div className="space-y-2">
                  {pendingTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      theme={theme}
                      editingTodoId={editingTodoId}
                      editText={editText}
                      setEditText={setEditText}
                      handleToggleComplete={handleToggleComplete}
                      handleEdit={handleEdit}
                      handleEditSave={handleEditSave}
                      handleEditCancel={handleEditCancel}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
              
              {completedTodos.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Completed</h3>
                  <div className="space-y-2 opacity-80">
                    {completedTodos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        theme={theme}
                        editingTodoId={editingTodoId}
                        editText={editText}
                        setEditText={setEditText}
                        handleToggleComplete={handleToggleComplete}
                        handleEdit={handleEdit}
                        handleEditSave={handleEditSave}
                        handleEditCancel={handleEditCancel}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-medium mb-2">All caught up!</h3>
            <p className="text-gray-500 dark:text-gray-400">Add a new task to get started</p>
          </div>
        )}

        {todos.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Clear All Todos
          </button>
        )}
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Made by Mukta Suryawanshi❤️ | {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

// Extract TodoItem component for better organization
function TodoItem({ 
  todo, 
  theme,
  editingTodoId, 
  editText, 
  setEditText, 
  handleToggleComplete, 
  handleEdit, 
  handleEditSave, 
  handleEditCancel, 
  handleDelete 
}) {
  return (
    <div 
      className={`
        group flex flex-col sm:flex-row sm:items-center p-4 rounded-lg gap-3
        ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}
        border ${todo.completed ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-700'}
        shadow-sm transition-all duration-200 transform hover:scale-[1.01]
      `}
    >
      <div className="flex items-center flex-1 min-w-0">
        {!editingTodoId === todo.id && (
          <button
            onClick={() => handleToggleComplete(todo.id)}
            className={`
              flex-shrink-0 w-6 h-6 rounded-full mr-3 border-2
              ${todo.completed 
                ? 'bg-green-500 border-green-600 flex items-center justify-center text-white' 
                : `border-gray-400 ${theme === 'dark' ? 'hover:border-blue-400' : 'hover:border-blue-500'}`
              }
            `}
          >
            {todo.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </button>
        )}
        
        {editingTodoId === todo.id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 border border-blue-300 dark:border-blue-600 p-2 rounded bg-inherit focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div
            onClick={() => handleToggleComplete(todo.id)}
            className={`flex-1 cursor-pointer truncate ${
              todo.completed ? ' text-gray-500 dark:text-gray-400' : ''
            }`}
          >
            {todo.text}
          </div>
        )}
      </div>

      {todo.completed ? (
  <span className="text-xs text-green-600 dark:text-green-400 sm:text-sm">
    
    Completed: {new Date(todo.completedAt).toLocaleDateString()}

  </span>
) : (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <span className="text-xs text-yellow-600 dark:text-yellow-400 sm:text-sm">
      Pending
    </span>
    <button
      onClick={() => handleToggleComplete(todo.id)}
      className="px-2 py-1 text-xs sm:text-sm bg-white-100 text-purple-900 rounded hover:bg-white-200 dark:bg-green-800 dark:text-green-300 dark:hover:bg-green-700 transition-colors"
    >
      🗸
    </button>
  </div>
)}


      <div className="flex gap-2 justify-end">
        {editingTodoId === todo.id ? (
          <>
            <button
              onClick={() => handleEditSave(todo.id)}
              className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleEditCancel}
              className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleEdit(todo.id, todo.text)}
              className={`
                px-3 py-1 text-sm rounded transition-colors
                ${theme === 'dark' 
                  ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }
              `}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className={`
                px-3 py-1 text-sm rounded transition-colors
                ${theme === 'dark' 
                  ? 'bg-gray-700 text-red-400 hover:bg-gray-600' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                }
              `}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
