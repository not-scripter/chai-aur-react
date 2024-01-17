import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/TodoSlice'

export default function AddTodo() {

 const todos = useSelector(state => state.todos)
 const dispatch = useDispatch()

 const noTodos = `<li className='flex items-center justify-between p-4 text-white bg-fuchsia-800 rounded-lg'><h3>No Todo Found</h3></li>`;

 return (
  <>
  <h1 className='w-full text-white text-2xl font-semibold text-center'>Todos</h1>
  <ul className='grid p-4 gap-2'>
  {
   todos.map((todo) => ( 
    <li key={todo.id}
    className='flex items-center justify-between p-4 text-white bg-fuchsia-800 rounded-lg'>
    <h3>{todo.text}</h3>
    <button type="button" onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
    </li>
   ))
  }
  </ul>
  </>
 )
}
