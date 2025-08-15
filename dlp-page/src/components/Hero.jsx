import React, { useEffect,useState } from 'react'
import Button from './Button.jsx'
import { FaArrowRight } from "react-icons/fa6"; 
import imageone from '../assets/images/imageone.jpg'
import imagetwo from '../assets/images/imagetwo.jpg'
import imagesix from '../assets/images/imagesix.png'
import imagefour from '../assets/images/imagefour.jpg'
import imagefive from '../assets/images/imagefive.jpg'
import imagethree from '../assets/images/imagethree.png'
import { Link } from 'react-router-dom';

const Hero = () => {
const [data, setData] = useState(null);

useEffect(() => {
  
const fetchdata = async ()=>{
  try {
     
     const res = await fetch('/api/settings/homepage')
     const data = await res.json()
     if(res.ok){
 
      setData(data)
      return
     }

     if(!res.ok){
      console.log('cant get response')
     }

  } catch (error) {
    console.log(error.message)
  }
}

fetchdata()
     
}, [])





  return (
    <div className='relative flex flex-col lg:flex-row h-auto lg:h-[46rem] overflow-hidden mb-5'>

      {/* LEFT TEXT CONTENT */}
      <div className='flex flex-col p-6 md:p-12 lg:p-20 justify-center gap-4 z-10 lg:w-[60%]'>
        <div className='flex gap-2 items-center w-fit'>
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 rounded-full bg-blue-300 opacity-20 blur-2xl animate-ping z-0"></div>
            <div className="relative z-10 w-full h-full bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          </div>
          <p className='text-[0.625rem] font-medium font-[inter]'>July 2025 Registration Session</p>
        </div>

        <h1 className='font-[inter] font-medium text-4xl md:text-5xl lg:text-[64px]/18 leading-tight'>
        {data?.title || 'loading'}<br />
          <span className='text-blue-500 font-bold'>{data?.subtitle || 'loading'}</span>
        </h1>

        <p className='font-[inter] text-base md:text-lg text-slate-700 max-w-xl'>
         {data?.intro || 'loading'}
         </p>

        <div  className='w-fit'>
       <Link to={'/programmes'}>   <Button text='Browse Our Courses' icon={<FaArrowRight className='text-blue-600' />} /></Link>
        </div>

        <div className='border border-gray-200 text-slate-500 text-xs rounded px-3 py-[3px] w-fit font-[inter]'>
          over 2000+ students enrolled
        </div>
      </div>

      {/* RIGHT IMAGE GRID */}
      <div className='relative w-full lg:w-[40%] h-[30rem] lg:h-full mt-10 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:flex hidden'>
        {/* top fade */}
        <div className='absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/100 to-transparent z-10'></div>
        {/* bottom fade */}
        <div className='absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/100 to-transparent z-10'></div>

        <div className='flex w-full gap-3 px-4 lg:px-0'>
          {/* Left column */}
          <div className='flex flex-col w-1/2 gap-2'>
            <div className='h-[40%] rounded-2xl overflow-hidden'>
              <img src={imageone} className='w-full h-full object-cover rounded-lg' alt="" />
            </div>
            <div className='h-[30%] rounded-2xl overflow-hidden'>
              <img src={imagetwo} className='w-full h-full object-cover rounded-lg' alt="" />
            </div>
            <div className='h-[40%] rounded-2xl overflow-hidden'>
              <img src={imagefour} className='w-full h-full object-cover rounded-lg' alt="" />
            </div>
          </div>

          {/* Right column */}
          <div className='flex flex-col w-1/2 gap-2'>
            <div className='h-[60%] rounded-2xl overflow-hidden'>
              <img src={imagefive} className='w-full h-full object-cover rounded-lg' alt="" />
            </div>
            <div className='h-[40%] rounded-2xl overflow-hidden'>
              <img src={imagesix} className='w-full h-full object-cover rounded-lg' alt="" />
            </div>
            <div className='h-[30%] rounded-2xl overflow-hidden'>
              <img src={imagethree} className='w-full h-full object-cover rounded-lg' alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero
