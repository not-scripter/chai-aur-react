import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

export default function Github() {

 const data = useLoaderData()

 //  const [data, setdata] = useState([])
 //
 //  useEffect(() => {
 //    fetch(`https://api.github.com/users/not-scripter`)
 //   .then(response => response.json())
 //   .then(data => {setdata(data)})
 //  }, [])
 return (
  <div className='flex items-center justify-center p-20 bg-fuchsia-50 text-4xl'>Username: {data.name}</div>
 )
}


export const githubInfoLoader = async () => {
 const response = await fetch('https://api.github.com/users/not-scripter')
 return response.json()
}
