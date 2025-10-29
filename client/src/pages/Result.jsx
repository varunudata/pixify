import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Result = () => {
    const[image, setImage] = useState(assets.sample_img_1)
    const[isImageLoaded, setIsImageLoaded] = useState(false)
    const[loading, setLoading] = useState(false)
    const[input, setInput] = useState('')
    const {generateImage} = useContext(AppContext)
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(input){
            const image = await generateImage(input)
            if(image){
                setIsImageLoaded(true)
                setImage(image)
            }
        }
        setLoading(false)
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
        <div className='relative'>
            <img src={image} alt="" className='max-w-sm rounded'/>
            <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 duration-[5s] ${
                loading ? "w-full transition-all" : "w-0 transition-none"
            }`}
            />
            {loading && <p>Loading ...</p>}
        </div>
        {!isImageLoaded && <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
            <input value={input} onChange={e => setInput(e.target.value)} type="text" name="" id="" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'/>
            <button type='submit' className='bg-zinc-900 px-4 sm:px-16 py-3 rounded-full cursor-pointer'>generate</button>
        </div>}
        {isImageLoaded && <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full '>
            <p onClick={(()=> {setIsImageLoaded(!setImage)})} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
            <a className='download bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' href={image} download="generated-image.png">Download</a>
        </div>}
    </form>
  )
}

export default Result 
