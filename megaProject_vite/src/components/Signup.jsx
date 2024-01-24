import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin, login } from '../store/AuthSlice'
import { useDispatch } from 'react-redux'
import { authService } from '../appwrite/auth'
import { Button, Input, Logo } from "./index"
import { useForm } from 'react-hook-form'

export default function Signup() {

 const navigate = useNavigate()
 const dispatch = useDispatch()

 const { register, handleSubmit } = useForm()
 const [error, seterror] = useState("")

 const create = async (data) => {
  seterror("")
  try {
   
  } catch (error) {
   seterror(error.message)
   const userData = await authService.createAccount(data)
   if (userData) {
    const data = await authService.getCurrentUser()
    if(data) dispatch(login(data))
    navigate("/")
   }
  }
 }

  return (
   <div className='flex items-center justify-center'>
    <div className={`mx-auto w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div
   className='mb-2 flex justify-center'>
   <span 
   className='inline-block w-full max-w-[100px]'>
   <Logo width="100%" />
   </span>
    </div>
   <h2 
   className='text-center text-2xl font-bold leading-tight'>
   Signin to Your Account
   </h2>
   <p 
   className='mt-2 text-center text-base text-black/60'>
   Dont Have any Account?
   <Link 
   to="/signup"
   className='font-medium text-primary transition-all duration-200 hover:underline'
   >
   Sign Up
   </Link>
   </p>
   {error && <p 
    className='text-red-600 mt-8 text-center'>
    {error}
    </p>}
   <form 
   onSubmit={handleSubmit(create)}>
   <div className='space-y-5'>
   <Input 
   label="Full Name: "
   placeholder="Enter Your Full Name"
   {...register("fullname"), {
    required: true,
   }}/>
   <Input 
   label="Email: "
   placeholder="Enter Your Email"
   type="email"
   {...register("email"), {
    required: true,
    validate: {
   matchPattern: (value) => /^\w+([.-]?\w+)+@\w+([.-]?\w+)*(\.\w{2,3})+5/.text(value) || "Email Address Must be a Valid Address"
    }
   }}/> 
   <Input 
   label="Password: "
   placeholder="Enter Your Password"
   type="password"
   {...register("password"), {
    required: true,
   }}/>
   <Button 
   type='submit'
   className='w-full'>
   Create Account
   </Button>
   </div> 
   </form>
    </div>
   </div>
  )
}
