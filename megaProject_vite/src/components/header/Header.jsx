import React from 'react'
import {Container, Logo, LogoutBtn} from "../index.js"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Header() {

 const navigate = useNavigate()
 const authStatus = useSelector(state => state.auth.status)

 const navItems = [
  {
   name: "Home",
   slug: "/",
   active: true
  },
  {
   name: "Login",
   slug: "/Login",
   active: !authStatus
  },
  {
   name: "Signup",
   slug: "Signup",
   active: !authStatus
  },
  {
   name: "AllPost",
   slug: "/All-Post",
   active: authStatus
  },
  {
   name: "AddPost",
   slug: "/Add-Post",
   active: authStatus
  },
 ]

  return (
   <header className='py-3 shadow bg-gray-500'>
   <Container>
   <nav className='flex'>
    <div className='mr-4'>
   <Link to="/">
   <Logo width="70px"/>
   </Link>
    </div>
   <ul className='flex ml-auto'>
   {navItems.map(item => item.active ? (
    <li key={item.slug}>
    <button onClick={() => navigate(item.slug)}
    className='inline-block px-6 py-2 rounded-full duration-200 hover:bg-blue-400'>
    {item.name}
    </button>
    </li>
   ) : null )} 
   {authStatus && (
    <li>
    <LogoutBtn />
    </li>
   )}
   </ul>
   </nav>
   </Container>
   </header>
  )
}
