import React from 'react'

export default function Loading() {
  return (
   <div 
   className='absolute z-50 top-0 w-screen h-[100dvh] bg-black flex items-center justify-center'>
   <div
   className='w-10 h-10 animate-spin rounded-full border-l-2 border-t-orange-500'> 
   </div>
   </div>
  )
}
