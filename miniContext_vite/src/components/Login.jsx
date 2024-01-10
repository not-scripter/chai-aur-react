import { useContext, useState } from "react"
import UserContext from "../context/UserContext"

const Login = () => {

 const {setuser} = useContext(UserContext)

const [username, setusername] = useState("")
const [password, setpassword] = useState("")

 const submitHandler = (e) => {
 e.preventDefault()
 setuser({username, password})
 }

  return (
   <div className="flex flex-col w-full h-full bg-gray-800">
   <input type="text" placeholder="username" value={username} onChange={(e) => setusername(e.target.value)}/>
   <input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
   <button type="submit" onClick={submitHandler} className="bg-gray-400">Submit</button>
   </div>
  )
}

export default Login
