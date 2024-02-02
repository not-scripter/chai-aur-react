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
   className={`px-6 py-1 rounded-full font-semibold ${textColor} ${bgColor} ${className}`}>
   {children}
   </button>
  )
}
