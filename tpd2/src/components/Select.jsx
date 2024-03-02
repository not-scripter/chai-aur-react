import React, { useId } from 'react'

const Select = ({
  label,
  options = [],
  bg = "bg-zinc-800",
  fg = "text-zinc-200",
  className = "",
  placeholder = "Choose Options",
  ...props
}, ref) => {
  const id = useId()
  return (
    <div className='grid'>
      {label && <label htmlFor={id} className='translate-y-1/2 bg-zinc-200 ml-8 px-2 w-fit rounded-full'>{label}</label> } 
      <select
        id={id}
        {...props}
        className={`${className} ${bg} ${fg} rounded-full px-4 py-4 hover:outline-none focus:border-x-2 focus:border-zinc-200`}
        ref={ref}
      >
        <option value={placeholder}>{placeholder}</option>
        {
          options.map(items => <option value={items}>{items}</option>)
        }
      </select>
    </div>
  )
}
export default React.forwardRef(Select)
