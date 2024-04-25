import React from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

export default function App() {
  return (
   <>
   <h1 className='w-full text-white text-3xl font-bold text-center py-4'>ReduxTodo</h1>
   <AddTodo />
   <Todos />
   </>
  )
}
