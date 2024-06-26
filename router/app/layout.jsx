"use client"

import './globals.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import About from './components/About/About'
import Layout from './page'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import User from './components/User/User'
import Github, { githubInfoLoader } from './components/Github/Github'

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

const router = createBrowserRouter(
 createRoutesFromElements(
  <Route path='/' element={<Layout />}>

  <Route path='' element={<Home />} />
  <Route path='about' element={<About />} />
  <Route path='contact' element={<Contact />} />
  <Route path='user/:userid' element={<User />} />
  <Route path='github' element={<Github />} loader={githubInfoLoader} />

  </Route>
 )
)

export default function RootLayout() {
 return (
  <html lang="en">
  <body>
  <RouterProvider router={router}/>
  </body>
  </html>
 )
}
