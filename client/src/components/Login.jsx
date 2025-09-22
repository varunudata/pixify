import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Login = () => {
    const[state, setState] = useState('Login')
    const {setShowLogin, backendUrl, setToken, setUser} = useContext(AppContext)
    const[name, setName] = useState('')
    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')

    const onSubmitHandler = async (e)=> {
        e.preventDefault()

        try {
            if(state === 'Login'){
                const {data} = await axios.post(backendUrl + "/api/user/login", {email, password})
                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
            } else{
                const {data} = await axios.post(backendUrl + "/api/user/register", {name, email, password})
                if(data.success){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                }else{
                    toast.error(data.message)
                }
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }



    useEffect(()=> {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    },[]) 
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-xs bg-black/30 flex justify-center items-center'>
        <form className='relative bg-white p-10 rounded-xl text-slate-500' onSubmit={onSubmitHandler}>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img className='w-8' src={assets.profile_icon} alt=""/>
                <input onChange={e => setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required/>
            </div>}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img className='w-8' src={assets.email_icon} alt=""/>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" className='outline-none text-sm' placeholder='Email Id' required/>
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img className='w-4' src={assets.lock_icon} alt=""/>
                <input onChange={e => setPassword(e.target.value)} value={password} type="text" className='outline-none text-sm' placeholder='Password' required/>
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer'>{state == 'Login'?"Login" : "Create Account"}</button>
            {state == 'Login' && <p className='mt-5 text-center'>Don't have an account?<span className='text-blue-600 cursor-pointer' onClick={()=> setState('Signup')}>Signup</span></p>}
            {state !== 'Login' && <p className='mt-5 text-center'>Already have an account?<span className='text-blue-600 cursor-pointer' onClick={()=> setState('Login')}>Signin</span></p>}
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>
        </form>
    </div>
  )
}

export default Login; 