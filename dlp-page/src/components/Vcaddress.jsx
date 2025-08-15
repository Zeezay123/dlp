import React, { useState,useEffect } from 'react';
import image from '../assets/images/nbunetvc.png';
import imagetwo from '../assets/images/media.mtu.png';
import Button from './Button.jsx';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Vcaddress = () => {
  const [vcToggle, setVcToggle] = useState(true);
   const [data, setData] = useState(null);
  useEffect(() => {
    
  const fetchdata = async ()=>{
    try {
       
       const res = await fetch('/api/settings/about')
       const data = await res.json()
       if(res.ok){
   
        setData(data)
        console.log(data)
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
    <section className="m-4 sm:m-8 md:m-12 lg:m-20 bg-slate-200 shadow rounded-xl flex flex-col lg:flex-row p-4 
    sm:p-8 md:p-10 items-center justify-between min-h-[40rem]">
      <div className="flex flex-col gap-5 w-full lg:w-1/2">
        <div className="flex gap-2 justify-center w-fit items-center">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 rounded-full bg-blue-300 opacity-20 blur-2xl animate-ping z-0"></div>
            <div className="relative z-10 w-full h-full bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          </div>
          <p className="text-[0.625rem] font-medium font-[inter] text-blue-400">Why Delsu Codel</p>
        </div>

        <div className="w-full sm:w-[30rem] md:w-[38rem] lg:w-[45rem] mb-6 sm:mb-10">
          <h1 className="font-[inter] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[48px]/14">
            Vice Chancellor's and Director's Address
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          <div
            className={`border-l-2 pl-3 h-fit w-full flex flex-col cursor-pointer ${
              vcToggle ? 'opacity-100 border-blue-700 ' : 'opacity-25 border-gray-800 '
            }`}
            onClick={() => setVcToggle(true)}
          >
            <h1 className="font-[inter] font-semibold text-base sm:text-lg md:text-[18px]/6">
              Prof. Samuel Ogheneovo Asagba. (Vice Chancellor)
            </h1>
            <p
              className={`w-full sm:w-[22rem] md:w-[28rem] lg:w-[30rem] font-[inter] text-xs sm:text-sm md:text-[14px]/5
                 font-normal text-slate-700 text-justify ${
                vcToggle ? 'line-clamp-5 mt-2' : 'hidden'
              }`}
            >
             {data?.vcMessage || 'loading'}            </p>
          </div>

          <div
            className={`border-l-2 pl-3 h-fit w-full flex flex-col cursor-pointer ${
              !vcToggle ? 'opacity-100 border-blue-700 ' : 'opacity-25 border-gray-800 '
            }`}
            onClick={() => setVcToggle(false)}
          >
            <h1 className="font-[inter] font-semibold text-base sm:text-lg md:text-[18px]/6">
              Prof O. Odedede (Director)
            </h1>
            <p
              className={`w-full sm:w-[22rem] md:w-[28rem] lg:w-[30rem] font-[inter] text-xs sm:text-sm md:text-[14px]/5 font-normal text-slate-700 text-justify ${
                !vcToggle ? 'line-clamp-5 mt-2' : 'hidden'
              }`}
            >
           {data?.directorMessage  || 'loading'}  
             </p>
          </div>
        </div>

        <div className="w-fit font-bold mt-5">
       <Link to={'/about'}> <Button text="Read More" icon={<FaArrowRight className="text-blue-600" />} />
       </Link>   </div>
      </div>

      <div className="w-full mt-8 lg:mt-0  lg:w-[35%] flex-shrink-0 shadow rounded-3xl flex items-center justify-center">
        {vcToggle ? (
          <img className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover rounded-3xl" src={data?.vcimage || ''} alt="" />
        ) : (
          <img className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover rounded-3xl" src={data?.directorimage || ''} alt="" />
        )}
      </div>
    </section>
  );
};

export default Vcaddress;