import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const GenerateBtn = () => {
  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler = ()=> {
    if(user){
      navigate('/result')
    } else{
      setShowLogin(true)
    }
  }
  return (
    <div className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the Magic. Try now</h1>

        <button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full m-auto hover:scale-105 transition-all duration-500 cursor-pointer'>
            Generate Images
            <img className='h-6' src={assets.star_group} alt=""/>
        </button>
    </div>
  )
}

export default GenerateBtn 