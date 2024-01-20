import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocalTodos } from './features/TodoSlice'
import TodoForm from './components/TodoForm'
import TodoItems from './components/TodoItems'

export default function App() {

 const dispatch = useDispatch()
 const todos = useSelector((state) => state.todos )

 useEffect(() => {
  const data = JSON.parse(localStorage.getItem("todos"))
   dispatch(setLocalTodos(data))
 }, [])

 useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos) )
 }, [todos])

 return (
  <>
  <h1 className='font-bold text-2xl text-center pt-4'>ReduxTodoLocal</h1>
  <TodoForm />
  <TodoItems />
  </>
 )
}
