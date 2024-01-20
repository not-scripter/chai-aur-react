import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/TodoSlice'

export default function TodoForm() {

 const dispatch = useDispatch()
 const [todoText, settodoText] = useState("")

 const addTodoHandler = (e) => {
  e.preventDefault()

  if (todoText.length < 1) return
  dispatch(addTodo(todoText))
  settodoText("")
 }

 return (
  <>
  <form 
  onSubmit={addTodoHandler}
  className='grid w-full gap-2 p-2'>
  <input type="text"
  value={todoText}
  onChange={(e) => settodoText(e.target.value)}
  placeholder='Enter Your Todo...'
  className='bg-gray-800 outline-none border-transparent py-2 px-4 rounded-full
  focus:border-orange-500 border-2'
  />
  <button type="submit"
  className='w-full p-2 rounded-full bg-orange-700 outline-none
  focus:bg-orange-900'>
  Add Todo
  </button>
  </form>
  </>
 )
}
