import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({
  children,
  auth = true,
}) {
  const navigate = useNavigate()
  const [loading, setloading] = useState(true)
  const authStatus = useSelector(state = state.auth.status)

  useEffect(() => {
    if ( auth && authStatus !== auth ) {
      navigate("/login")
    } else if (!auth && authStatus !== auth) {
      navigate("/")
    }
    setloading(false)
  }, [authStatus, navigate, auth])

  return loading ? <div
    className='w-screen h-dvh bg-black text-white'
  >
    Loading....
  </div> : <>{children}</>
}
