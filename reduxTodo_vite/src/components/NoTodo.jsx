
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

export default function NoTodo() {
 const todos = useSelector(state => state.todos)
 const dispatch = useDispatch()
  return (
<li className='flex items-center justify-between p-4 text-white bg-fuchsia-800 rounded-lg'><h3>No Todo Found</h3></li>
  )
}
