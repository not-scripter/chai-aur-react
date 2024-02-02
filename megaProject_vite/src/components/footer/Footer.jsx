import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

export default function Footer() {
 return (
  <footer 
  className="w-full h-fit overflow-hidden bg-orange-950 grid items-center justify-evenly px-2 py-4">

  <section
  className='grid left-0 w-screen h-full'>
  <ul>
   <li>Home</li>
  <li>About</li>
  </ul>
  </section>

  <section
  className='rtl:'>
  <ul>
   <li>Home</li>
  <li>About</li>
  </ul>
  </section>

  </footer>
 )
}
