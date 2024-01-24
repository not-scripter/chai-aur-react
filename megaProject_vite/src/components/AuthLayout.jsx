import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {

 const navigate = useNavigate()
 const [loader, setloader] = useState(true)
 const authStatus = useSelector(state => state.auth.status)

 useEffect(() => {
  //TODO make id easier
  if (authentication && authStatus !== authentication) {
   navigate("/login")
  } else if (!authentication && authStatus !== authentication) {
   navigate("/")
  }
  setloader(false)
 }, [authStatus, navigate, authentication])

  return loader ? <h1>...loading</h1> : <>{children}</> ;
}
