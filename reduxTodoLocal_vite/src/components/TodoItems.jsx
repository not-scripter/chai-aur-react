import React, { useEffect, useState } from 'react'
import { removeTodo, toggleComplete, toggleReadOnly, updateTodo } from '../features/TodoSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function TodoItems() {

 const todos = useSelector(state => state.todos)
 const dispatch = useDispatch()

 const [noTodo, setnoTodo] = useState(true)

 useEffect(() => {
  todos.length < 1 ? setnoTodo(true) : setnoTodo(false)
 }, [todos])

 return (
  <>
  <ul className='w-full h-full grid gap-2 p-2'>
  {
   noTodo ? <li className='bg-gray-800 flex items-center justify-between p-4 rounded-2xl'>No Todos Found</li> :
   todos.map(todo => (
    <li key={todo.id}
    className={`relative flex items-center justify-between rounded-2xl 
     ${todo.completed ? "bg-green-800" : "bg-gray-800"}`}>
    <input type="text" value={todo.text} readOnly={todo.readOnly}
    className={`w-full h-full bg-transparent outline-none p-4 rounded-2xl
     ${todo.readOnly ? "" : "border-2 border-orange-500"}`}
    onChange={(e) => dispatch(updateTodo({id: todo.id, text: e.target.value}))} />
    <div className='absolute flex right-4 items-center justify-between'>
    <button
    className='px-2 rounded-full bg-orange-200'
    onClick={() => dispatch(toggleReadOnly(todo.id))}>
    {todo.completed ? "" : (todo.readOnly ? "📜" : "✔️")}
    </button>
    <button
    className='px-2 rounded-full bg-orange-300'
    onClick={() => dispatch(toggleComplete(todo.id))}>
    ✔️
    </button>
    <button
    className='px-2 rounded-full bg-orange-400'
    onClick={() => dispatch(removeTodo(todo.id))}>
    ❌
    </button>
    </div>
    </li>
   ))
  }
  </ul>
  </>
 )
}
