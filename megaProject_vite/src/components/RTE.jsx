import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({name, control, label, defaultValue}) {
  return (
   <div className='w-full'>
  {label && <label htmlFor={id}
   className='inline-block mb-1 pl-1'>
   {label}
   </label>}

   <Controller 
   name={name || "content"}
   control={control}
   render={({field: {onChange}}) => (
   <Editor 
   initialValue={defaultValue}
   init={
    {
     branding: false,
     height: 500,
      menubar: true,
      plugins: ['list link image', 'code fullscreen'],
      toolbar: 'undo redo formatselect | bold etalic'
    }
   }/>
   )}
   onEditorChange={onChange}
   />

   </div>
  )
}
