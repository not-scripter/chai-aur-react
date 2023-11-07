"use client"

import { Link, useLoaderData } from "react-router-dom"

const Github = () => {

 const data = useLoaderData()

 return (
  <>
  <div className="text-2xl ">
  <div className="flex p-4 gap-4">
  <img className="h-16 rounded-full border-purple-400 border-2" src={data.avatar_url} />
  <div> 
  <h1 className="font-bold">{data.name}</h1>
  <h1>{data.login}</h1>
  </div>
  </div>

  <div className="p-4 pl-8">
  <Link to={data.html_url} >
  <h1>Github</h1>
  </Link>
  <Link to={data.blog} >
  <h1>Portfolio</h1>
  </Link>
  </div>

  </div>
  </>
 )
}

export default Github


export const githubInfoLoader = async () => {
 const response = await fetch("https://api.github.com/users/not-scripter")
 return response.json()
}
