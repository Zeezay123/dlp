import React, { useEffect } from 'react'
import SecondHero from '../components/SecondHero'
import {useState} from 'react'
import { FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import CallToAction from '../components/CallToAction'
import HowToApply from '../components/HowToApply'
import { Link } from 'react-router-dom'



const Programmes = () => {
const [toggleCourse, setToggleCurse] = useState(false)
const [courses, setCourses] = useState([])
const [noindex, setNoIndex] = useState(null)
const [faculty, setFaculty] = useState({})
const [progData, setProgData] = useState(null)


const handleToggle = (id)=>{

  setToggleCurse(toggleCourse === id ? false : id)

}


useEffect(()=>{
  const fetchAllData = async()=> {
    try{
     

    const [res, pro] = await Promise.all([
      fetch('/api/departments/getdepart'),
      fetch('/api/settings/programmes')
    ])
  



      if(res.ok || pro.ok){

    const [data, proData] =  await Promise.all([
       res.json(),
       pro.json()
     ]) 


      setProgData(proData)
      console.log(progData)

         const facultyData = data.reduce((acc, dept) => {
  const facultyName = dept.faculty?.name || 'No Faculty'
  if(!acc[facultyName]){
    acc[facultyName]= []
  }

  acc[facultyName].push([dept.name, dept._id])
  return acc
},{})

setFaculty(facultyData)
console.log(facultyData)
      }
      if(!res.ok){
        console.log(error.message)
      }
     
    }catch(error){
      console.log(error.message)
    }

  }


  fetchAllData() 
  
  
},[])
  




  return (
    <main>
          <SecondHero
        title={progData?.title || 'Loading'}
        content={progData?.subtitle || 'Loading'}
      />

  
      <section className="flex flex-col gap-6 text-center p-5 md:p-20 items-center justify-center mt-30">
        <h1 className="font-bold font-sans text-3xl text-center">
          {progData?.introTitle || 'Loading'}
        </h1>
        <p className="max-w-5xl text-lg leading-relaxed text-gray-700">
        {progData?.introSubtitle || 'Loading'}
        </p>
      </section>

    <section className='w-full flex flex-col gap-7 p-5 md:p-20 items-center'>
   <div className='flex justify-center items-center bg-blue-800 w-full rounded-lg shadow-lg'><h1 className='text-lg md:text-3xl text-white font-bold font-sans py-3'>Undergraduate Programmes</h1></div>
    
    <div onMouseLeave={()=>setToggleCurse(false)} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>

       {
       Object.entries(faculty).map(([faculty, department],index) =>
       (
        <div className='border rounded-lg shadow-sm bg-white overflow-hidden'>
         <div key={faculty} onClick={()=>{handleToggle(faculty)} }  className={`flex items-center justify-between w-full px-4 py-3 font-semibold transition-all duration-300 
              ${toggleCourse === faculty ? 'bg-blue-800 text-white' : 'bg-gray-100 hover:bg-blue-700 hover:text-white'}`}>
          {faculty} { toggleCourse === faculty ? <FaChevronUp /> : <FaChevronDown />}
         </div>
     <ul  className={`flex flex-col gap-2 text-left p-4   rounded-b-lg bg-slate-100 ${toggleCourse === faculty ? 'flex absolute md:w-[21%] w-[92%] ' : 'hidden'}`}>
          
          
          
         {department.map(([deptName, deptId],index) =>  {  
          
     return (  <Link key={index} to={`/programmes/${deptId}`}> <li  className="px-2 py-1 rounded hover:bg-blue-100 cursor-pointer" key={index} >{deptName}</li> </Link>
      )}
      
      )}
         </ul>
        </div>
       ))
       
       
       }
     


    </div>
    
    </section>



<HowToApply />
      <CallToAction />


    </main>
  )
}

export default Programmes



  