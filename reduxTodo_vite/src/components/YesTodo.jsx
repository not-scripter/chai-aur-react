
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

export default function YesTodo() {
 const todos = useSelector(state => state.todos)
 const dispatch = useDispatch()
 return (
  <li key={todo.id}
  className='flex items-center justify-between p-4 text-white bg-fuchsia-800 rounded-lg'>
  <h3>{todo.text}</h3>
  <button type="button" onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
  </li>
 )
}
