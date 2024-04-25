import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useCallback } from "react";

const initialState = {
 todos: [
  // {
  //  id: 1,
  //  text: "Namaste",
  //  completed: false,
  //  readOnly: true
  // },
 ]
}

// const initialState = useEffect(() => {
//   JSON.parse(localStorage.getItem("todos"))
// }, [])
//
// useEffect(() => {
//  JSON.stringify(localStorage.setItem("todos", initialState))
// }, [initialState])

export const todoSlice = createSlice({
 name: "todos",
 initialState,
 reducers: {

  setLocalTodos: (state, action) => {
   state.todos = action.payload
  },

  addTodo: (state, action) => {
   const todo = {
    id: nanoid(),
    text: action.payload,
    completed: false,
    readOnly: true
   }
   state.todos.unshift(todo)
  },

  removeTodo: (state, action) => {
   state.todos = state.todos.filter(todo => todo.id !== action.payload)
  },

  updateTodo: (state, action) => {
   state.todos = state.todos.map(todo => todo.id === action.payload.id ? {...todo, text: action.payload.text} : todo )
  },

  toggleComplete: (state, action) => {
   state.todos = state.todos.map(todo => todo.id === action.payload ? {...todo, completed: !todo.completed, readOnly: true} : todo)
  },

  toggleReadOnly: (state, action) => {
   state.todos = state.todos.map(todo => todo.id === action.payload ? {...todo, readOnly: !todo.readOnly} : todo)
  },

 }
})

export const { setLocalTodos, addTodo, removeTodo, updateTodo, toggleComplete, toggleReadOnly } = todoSlice.actions

export const todoReducer = todoSlice.reducer
