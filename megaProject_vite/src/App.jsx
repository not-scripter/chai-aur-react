import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { authService } from './appwrite/auth';
import { login, logout } from './store/AuthSlice';
import { Outlet } from 'react-router-dom';
import { Loading, Header, Footer } from './components/index';

export default function App() {

 const [loading, setloading] = useState(true)

 const dispatch = useDispatch()

 useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
   if (userData) {
   dispatch(login({userData}))
   } else {
    dispatch(logout())
   }
  })
  .finally(() => setloading(false))
 }, [])

 return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-800'>
  <div className='w-full block'>
  <Header />
  <main>
  <Outlet />
  </main>
  <Footer />
  </div>
  </div>
 ) : (
  <Loading />
 );

}
