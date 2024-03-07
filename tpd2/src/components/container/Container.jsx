import React from 'react'

export default function Container({children}) {
  return (
    <div className='w-screen h-dvh px-2 bg-black text-white'>{children}</div>
  )
}
