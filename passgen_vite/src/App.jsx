import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

 const [length, setlength] = useState(8)
 const [numallowed, setnumallowed] = useState(false)
 const [charallowed, setcharallowed] = useState(false)
 const [password, setpassword] = useState("")

 const lengthplus = () => {
  if (length < 20) setlength(length +2)
 }
 const lengthminus = () => {
  if (length > 6) setlength(length - 2)
 }

 const isNumAllowed = () => setnumallowed((prev) => !prev)
 const isCharAllowed = () => setcharallowed((prev) => !prev)

 const passgen = useCallback(
   () => {   
  let pass = ""
  let str = "ABCDEFGHOJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
  if (numallowed) str += "1234567890"
  if (charallowed) str += "@#₹&!?€¥$¢%π§"

    for (let index = 1; index <= length; index++) {
     let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    }
    setpassword(pass)
   },
   [length, numallowed, charallowed, setpassword],
 )

 useEffect(() => {
  passgen()
 }, [length, numallowed, charallowed])

 const passref = useRef()

 const copyToClip = () => {
  passref.current?.select()
  window.navigator.clipboard.writeText(password)
 }

 return (
  <>
  <form className="bg-black text-white flex justify-center items-center h-screen">
  <div className="flex flex-col bg-gray-800 w-11/12 rounded-xl p-4 gap-2">
  <div className="bg-gray-200 text-gray-800 w-full relative flex rounded-full overflow-hidden">
  <input type="text"
  readonly
  placeholder='Password'
  value={password}
  ref={passref}
  className="w-full p-2 bg-transparent pointer-events-none outline-none"
  />
  <div className="absolute right-0 gap-2 px-2 bg-pink-600 rounded-full">
  <button type="button"
  onClick={passgen}
  className="bg-pink-600 p-2 rounded-full"
  ><h1 className="font-bold scale-150">↻</h1></button>
  </div>
  </div>

  <div className="flex flex-col gap-2">
  <div className="w-full flex justify-evenly bg-gray-900 gap-2 p-2 rounded-full ">
  <button 
  onClick={lengthminus}
  type="button">➖</button>
  <input 
  type="range"
  min={6}
  max={20}
  step={2}
  value={length}
  onChange={(e) => setlength(e.target.valueAsNumber)}
  className="bg-red-300 text-white"
  />
  <button 
  onClick={lengthplus}
  type="button">➕</button>
  </div> 

  <div className="w-full flex justify-evenly bg-gray-900 gap-2 p-2 rounded-full ">
  <label for="numbers">Num</label>
  <input 
  type="checkbox" id='numbers'
  onChange={isNumAllowed}
  />
  <label for="characters">Char</label>
  <input type="checkbox" id='characters'
  onChange={isCharAllowed}
  />
  </div> 
  </div>

  <div>
  <button type="button"
  onClick={copyToClip}
  className="bg-pink-600 p-2 rounded-full w-full text-center"
  >Copy</button>
  </div>

  </div>
  </form>
  </>
 )
}

export default App
