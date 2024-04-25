import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
 return (
  <div className='w-full'> 
  {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

  <Controller
  name={name || "content"}
  control={control}
  render={({field: {onChange}}) => (
   <Editor
   apiKey='zqz88v4oozdgb0dhiv1ng8s3q9f1us9o9nnssc51hlivttj8'
   initialValue={defaultValue}
   init={{
    initialValue: defaultValue,
     height: 700,
     menubar: true,
     plugins: [
      "image",
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
      "anchor",
     ],
     toolbar:
    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
     content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
   }}
   onEditorChange={onChange}
   />
  )}
  />

  </div>
 )
}

