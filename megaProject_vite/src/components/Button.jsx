import React from 'react'

export default function Button({
 children,
 type = "button",
 textColor = "text-black",
 bgColor = "bg-orange-600",
 className = "",
 ...props
}) {
  return (
   <button 
   type={type}
   {...props}
   className={`px-4 py-2 rounded-3xl ${textColor} ${bgColor} ${className}`}>
   {children}
   </button>
  )
}
