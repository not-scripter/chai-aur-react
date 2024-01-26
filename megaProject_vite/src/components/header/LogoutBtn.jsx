import React from 'react'
import { useDispatch } from 'react-redux'
import { authService } from '../../appwrite/auth'
import { logout } from '../../store/AuthSlice'

export default function LogoutBtn() {

 const dispatch = useDispatch()

 const logoutHandler = () => {
  authService.logout()
   .then(() => {
    dispatch(logout())
   })
 }

  return (
   <button type="button"
   onClick={logoutHandler}
   className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-400'>
   Logout
   </button>
  )
}
