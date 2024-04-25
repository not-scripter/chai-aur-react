import React from 'react'
import { useId } from 'react';
import { forwardRef } from "react";

const Input = forwardRef( function Input({
 label,
 type = "text",
 className = "",
 ...props
}, ref){

 const id = useId()

 return (
  <div>
  {label && <label htmlFor={id}
   className='inline-block mb-1 pl-1'>
   {label}
   </label>}
  <input 
  type={type}
  className={`px-3 py-2 rounded-3xl bg-white text-black outline-none focus:bg-gray500 duration-200 border border-gray-200 w-full ${className}`}
  ref={ref}
  id={id}
  {...props}/>
  </div>
 )
})

export default Input
