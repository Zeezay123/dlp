import React, { useEffect, useState } from "react";
import imagetwo from '../assets/images/nbunetvc.png'
import { Card } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import SecondHero from '../components/SecondHero.jsx'

const AboutUs = () => {
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


const title = data?.title || ''




return(
  <section className="flex flex-col">

<SecondHero title={title} content={data?.subtitle || 'loading'} />


   <div className="flex p-5 md:p-20 items-center justify-center mt-30">
   <p className=" max-w-5xl text-wrap text-lg/9 text-justify">
    {data?.intro}  </p>
   </div>

   <div className="flex flex-col-reverse md:flex-row p-5 md:p-30 md:relative">

    <div className="flex flex-col item justify-between p-5 md:p-20 bg-blue-700"> <p className="max-w-[700px] text-white text-justify text-lg font-normal font-sans">
  {data?.vcMessage || 'loading'}  </p>
      <p className="text-white text-justify text-lg font-normal font-sans my-2">Thank you</p>
       <h1 className=" text-white text-justify text-xl font-bold font-sans">Prof. Samuel Ogheneovo Asagba.  </h1>
      <p className="text-white text-justify text-sm font-normal font-sans "> VC Delta State Unversity</p>
       
       </div>




   <div className="md:absolute max-w-[500px] max-h-[800px] md:w-[500px] md:h-[800px] top-10 right-20 flex"><img className="w-full h-full object-contain" src={data?.vcimage || ''} alt="" /></div>
   </div>

<div className="flex flex-col-reverse md:flex-row p-5 md:p-30 md:relative">

    <div className="flex flex-col item justify-between p-5 md:p-20 bg-slate-100"> <p className="max-w-[700px] text-blue-950 text-justify text-lg font-normal font-sans">
   {data?.directorMessage || 'loading'} </p>
      <p className="text-blue-900 text-justify text-lg font-normal font-sans my-2">Thank you</p>
       <h1 className=" text-blue-900 text-justify text-xl font-bold font-sans"> 

Prof O. Odedede  </h1>
      <p className="text-blue-900 text-justify text-sm font-normal font-sans ">Director, CODEL </p>

</div>
   <div className="md:absolute max-w-[500px] max-h-[800px] md:w-[500px] md:h-[800px] top-10 right-20 flex"><img className="w-full h-full object-contain" src={data?.directorimage || ""} alt="" /></div>
   </div>

   <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:p-20 p-5 ">
    <Card className="min-w-[400px] min-h-[250px] ."> <h1 className="text-2xl font-bold text-black
    font-sans">Our Mission</h1>
    <p className="text-sm">
    {data?.mission || 'loading'}  </p>
    </Card>
 
   <Card className="min-w-[400px] min-h-[250px]"> <h1 className="text-2xl font-bold text-black
    font-sans">Our Vision</h1>
   <p className="text-sm ">
      {data?.vision || 'Loading'}  </p>
    </Card>

      <Card className="min-w-[400px] min-h-[250px] "> <h1 className="text-2xl font-bold text-black
    font-sans">Our Philosophy</h1>
   <p className="text-sm">
    {data?.philosophy || 'Loading'}
   
    </p>
    </Card>
   </div>
  <CallToAction/>
  </section>
)


}
export default AboutUs;
