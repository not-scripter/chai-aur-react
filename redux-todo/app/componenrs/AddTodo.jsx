"use client"

import { addTodo } from "@/features/todo/TodoSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"

const AddTodo = () => {

 const [input, setinput] = useState("")
 const dispatch = useDispatch()

 const addTodoHandler = (e) => {
  e.preventDefault()
  dispatch(addTodo(input))
  setinput("")
 }

 return (
  <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
  <div
  className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
  >
  <input
  type="text"
  placeholder="Enter a Todo..."
  value={input}
  onChange={(e) => setinput(e.target.value)}
  className="focus:outline-none bg-transparent"
  />
  <button
  type="submit"
  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  >
  Add
  </button>
  </div>
  </form>
 )
}

export default AddTodo
