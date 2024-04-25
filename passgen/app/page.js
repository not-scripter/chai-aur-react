"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const page = () => {

 const [password, setPassword] = useState("")
 const [length, setLength] = useState(6)
 const [numAllowed, setNumAllowed] = useState(false)
 const [charAllowed, setCharAllowed] = useState(false)

 const passRef = useRef(null)

 const passGen = useCallback(
   () => {
     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "1234567890"
    if (charAllowed) str += "@#₹&?!%π"

    for (let i = 0; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(char)
    }

    setPassword(pass)

   },
   [length, numAllowed, charAllowed, setPassword],
 )

 const copyPass = useCallback(
   () => {
     window.navigator.clipboard.writeText(password)
    passRef.current?.select()
//    passRef.current?.setSelectionRange(0, 2)
   },
   [password],
 )

 useEffect(() => {
  passGen()
 }, [length, numAllowed, charAllowed, passGen])

  return ( 
   <>
   <main className="w-screen h-screen bg-black flex justify-center items-center">
    <div className="w-5/6 bg-violet-300 flex flex-col justify-center items-center gap-4 p-4 rounded-xl">
     <h1 className="text-xl font-bold">Password Generator</h1>
   <div className="flex"> 
   <input 
   type="text"
   value={password}
   placeholder="password"
   readOnly
   ref={passRef}
   className="w-4/5 h-4/5 outline-none rounded-l-full p-2 pl-4"
   />
   <button 
   type="button"
   onClick={copyPass}
   className="bg-fuchsia-100 rounded-r-full px-4 shrink-0"
   >Copy</button>
   </div>

   <div className="flex flex-col justify-evenly items-center sm:flex-row gap-4">
   <label 
   for="range"
   >Length {length}</label>
   <input 
   type="range"
   id="range"
   value={length}
   min={6}
   max={16}
   onChange={(e) => {setLength(e.target.value)}}
   /> 
   <label 
   for="num"
   className="text-sm"
   >Number</label>
   <input 
   type="checkbox"
   id="num"
   defaultChecked={numAllowed}
   onChange={() => {
    setNumAllowed((prev) => !prev)
   }}
   />
   <label 
   for="char"
   className="text-sm"
   >Character</label>
   <input 
   type="checkbox"
   id="char"
   defaultChecked={charAllowed}
   onChange={() => {
    setCharAllowed((prev) => !prev)
   }}
   />
   </div>
    </div>
   </main>
   </>
  )
}

export default page
