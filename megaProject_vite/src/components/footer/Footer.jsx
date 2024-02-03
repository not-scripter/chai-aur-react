import React, {useState} from 'react'
import { Button, Container, Logo, LogoutBtn } from "../index"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Footer() {

 const navigate = useNavigate();

 const authStatus = useSelector(state => state.auth.status);
 const navItems = useSelector(state => state.nav.navItems)
 const authItems = useSelector(state => state.nav.authItems)

 return (
  <footer 
  className={`relative grid bg-zinc-200 text-black w-full shadow`}>
  <Container>
  
  <div 
  className='w-full flex items-center justify-center py-6'>
  <Link to="/">
  <Logo width="100px"/>
  </Link>
  </div>

  <nav 
  className={`grid w-full`}>
  <ul 
  className='w-full px-2 py-4 grid items-center justify-center gap-2'>
  {
   authStatus ? 
   navItems.map(item => (
    <li key={item.slug}>
    <Button onClick={() => navigate(item.slug)}
    className='w-full'>
    {item.name}
    </Button>
    </li>
   )) : null 
  } 
  </ul>

  <ul 
  dir='ltr'
  className='w-full px-2 py-4 grid items-center justify-center gap-2'>
  {
   !authStatus ? (
    authItems.map(item => 
     <li key={item.slug}>
     <Button 
     onClick={() => navigate(item.slug)}
     className='w-full'>
     {item.name}
     </Button>
     </li>
    )
   ) : (
    <li>
    <LogoutBtn className=''/>
    </li>
   )
  }
  </ul>
  </nav>
  
  </Container>
  </footer>
 )
}
