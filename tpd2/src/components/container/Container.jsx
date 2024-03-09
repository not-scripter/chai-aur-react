import React from 'react'

export default function Container({children}) {
  return (
    <div className='w-screen h-dvh bg-black text-white'>{children}</div>
  )
}
