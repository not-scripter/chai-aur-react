import React from 'react'

export default function Icon({src, className, width="4"}) {
  const localWidth = `w-${width} h-${width}`
  return (
    <img src={src} className={`${localWidth} ${className}`}/>
  )
}
