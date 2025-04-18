import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearTodos,
  toggleTheme
} from './redux/actions'

function App() {
  const { todos, theme } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState('')

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

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen p-4`}>
      <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-inherit">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todo App</h1>
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:opacity-80"
          >
           Mode {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a new todo"
            className="flex-grow border border-gray-300 dark:border-gray-600 p-2 rounded bg-inherit"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2 mb-4">
  {todos.map((todo) => (
    <li
      key={todo.id}
      className="flex justify-between items-center p-2 border border-gray-300 dark:border-gray-600 rounded"
    >
      <span
        onClick={() => handleToggleComplete(todo.id)}
        className={`flex-1 cursor-pointer ${todo.completed ? '✅' : ''}`}
      >
        {todo.completed ? '✅ ' : ''}{todo.text}
      </span>
      <button
        onClick={() => handleDelete(todo.id)}
        className="text-red-500 hover:text-red-700 font-bold ml-2"
      >
        Delete
      </button>
    </li>
  ))}
</ul>


        {todos.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Clear All Todos
          </button>
        )}
      </div>
    </div>
  )
}

export default App
