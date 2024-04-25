"use client"
import React, { useState } from 'react';

const page = () => {

 let [counter, setCounter] = useState(0)

 const addValue = () => {
  if (counter < 20) {
  setCounter(counter + 1)
  }
 }
 const removeValue = () => {
  if (counter > 0) {
  setCounter(counter - 1)
  }
 }

  return (
   <>
   <div className='bg-red-50 w-screen h-screen flex flex-col justify-center items-center gap-2'> 

   <h1 className='font-bold text-3xl'>Counter Value : {counter}</h1>

   <button
   onClick={addValue}
   className='w-1/2 h-10 border-fuchsia-400 border-2 bg-fuchsia-200 rounded-full px-4'>
   Add
   </button>
   <button
   onClick={removeValue}
   className='w-1/2 h-10 border-fuchsia-400 border-2 bg-fuchsia-200 rounded-full px-4'>
   Remove
   </button>
   </div>
   </>
  )
}

export default page

