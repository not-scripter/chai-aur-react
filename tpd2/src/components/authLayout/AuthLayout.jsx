import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

export default function AuthLayout({
  children,
  auth = true,
}) {
  const navigate = useNavigate()
  const [loading, setloading] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    if ( auth && authStatus !== auth ) {
      navigate("/login")
    } else if (!auth && authStatus !== auth) {
      // navigate("/")
    }
    setloading(false)
  }, [authStatus, navigate, auth])

  return !loading ? <>{children}</> : <Loader />
}
