import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/TodoSlice'

export default function AddTodo() {

 const todos = useSelector(state => state.todos)
 const dispatch = useDispatch()

 const [noTodo, setnoTodo] = useState(true)

 useEffect(() => {
  if (todos.length > 0) {
   setnoTodo(false)
  } else {
   setnoTodo(true)
  } 
 }, [todos])

 return (
  <>
  <h1 className='w-full text-white text-2xl font-semibold text-center'>Todos</h1>
  <ul className='grid p-4 gap-2'>
  {
   noTodo ? 
   <li
   className='flex items-center justify-center h-full p-4 text-white bg-gray-900 rounded-lg'>
   No Todo Found
   </li>
   :
   todos.map((todo) => ( 
    <li key={todo.id}
    className='flex items-center justify-between p-4 text-white bg-fuchsia-800 rounded-lg'>
    {todo.text}
    <button type="button" onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
    </li>
   ))
  }
  </ul>
  </>
 )
}
