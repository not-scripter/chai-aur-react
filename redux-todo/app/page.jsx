"use client"

import AddTodo from "./componenrs/AddTodo"
import Todos from "./componenrs/Todos"

export default function Home() {
  return (
   <>
   <div className="bg-fuchsia-200 h-screen"> 
   <h1 className="text-3xl text-center font-bold pt-4">Redux Toolkit Todo</h1>
   <AddTodo />
   <Todos />
   </div>
   </>
  )
}
