import React, {useState} from 'react'
import {Button, Container, Logo, LogoutBtn} from "../index.js"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Header() {

 const navigate = useNavigate()
 const authStatus = useSelector(state => state.auth.status)
 const [navToggle, setnavToggle] = useState(true);

 const navItems = [
  {
   name: "Home",
   slug: "/",
   active: true
  },
  {
   name: "AllPost",
   slug: "/all-posts",
   active: authStatus
  },
  {
   name: "AddPost",
   slug: "/add-post",
   active: authStatus
  },
 ]
 const authItems = [
  {
   name: "Login",
   slug: "/login",
   active: !authStatus
  },
  {
   name: "Signup",
   slug: "signup",
   active: !authStatus
  },
 ]


 return (
  <header 
  className={`relative grid bg-zinc-200 text-black w-full shadow 
   ${navToggle ? "h-[100dvh] fixed" : ""}
   `}>
  <Container>

  <div 
  className='flex items-center justify-between w-full h-fit px-2 py-1'>
  <Link to="/">
  <Logo width="100px"/>
  </Link>
  <Button 
  onClick={() => setnavToggle(prev => !prev)}
  className='bg-fuchsia-500 text-white'>
  {navToggle ? "Close" : "Menu"}
  </Button>
  </div>

  <nav 
  className={`w-full h-[85%] bottom-0 flex flex-col justify-between
  ${navToggle ? "visible" : "hidden"}
   `}>
  <ul 
  className='w-full grid px-2 py-4 gap-2'>
  {navItems.map(item => item.active ? (
   <li key={item.slug}>
   <button onClick={() => navigate(item.slug)}
   className='inline-block rounded-full hover:bg-zinc-800 hover:text-white w-full py-2 items-center justify-center'>
   {item.name}
   </button>
   </li>
  ) : null )} 
  </ul>

  <ul 
  className='w-full grid gap-2'>
  {
   !authStatus ? (
    authItems.map(item => 
     <li key={item.slug}>
     <Button 
     onClick={() => navigate(item.slug)}
     className='inline-block rounded-full bg-blue-700 text-white hover:bg-blue-950 hover:text-white w-full py-2 items-center justify-center'>
     {item.name}
     </Button>
     </li>
    )
   ) : (
    <li>
    <LogoutBtn />
    </li>
   )
  }
  </ul>
  </nav>

  </Container>
  </header>
 )
}
