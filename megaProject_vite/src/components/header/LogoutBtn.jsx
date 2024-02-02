import React from 'react'
import { useDispatch } from 'react-redux'
import { authService } from '../../appwrite/auth'
import { logout } from '../../store/AuthSlice'
import Button from '../Button'

export default function LogoutBtn({
 className = ""
}) {

 const dispatch = useDispatch()

 const logoutHandler = () => {
  authService.logout()
   .then(() => {
    dispatch(logout())
   })
 }

  return (
   <Button type="button"
   onClick={logoutHandler}
   className='inline-block px-6 py-2 duration-200 rounded-full bg-red-600 hover:bg-red-900'>
   Logout
   </Button>
  )
}
