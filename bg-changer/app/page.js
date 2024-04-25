"use client"

import { useState } from "react"

export default function Home() {

 const [bgColor, setBgColor] = useState("")

  return (
   <>
   <main className="w-screen h-screen flex justify-end items-center sm:justify-center sm:items-end"
   style={{backgroundColor: bgColor}}>

   <div className="w-12 h-4/5 bg-fuchsia-100 rounded-full m-4 flex flex-col justify-evenly items-center sm:w-4/5 sm:h-12 sm:flex-row">

   <button type="button" className="bg-white w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("white") }></button>
   <button type="button" className="bg-black w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("black") }></button>
   <button type="button" className="bg-red-600 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("red") }></button>
   <button type="button" className="bg-blue-700 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("blue") }></button>
   <button type="button" className="bg-green-700 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("green") }></button>
   <button type="button" className="bg-yellow-200 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("yellow") }></button>
   <button type="button" className="bg-fuchsia-500 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("fuchsia") }></button>
   <button type="button" className="bg-cyan-400 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("cyan") }></button>
   <button type="button" className="bg-orange-400 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("orange") }></button>
   <button type="button" className="bg-red-300 w-8 h-8 rounded-full border-zinc-400 border-2" onClick={ () => setBgColor("lightpink") }></button>
   </div>
   </main>
   </>
  )
}
