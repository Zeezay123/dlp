import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react';
import axios from 'axios';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {useNavigate} from 'react-router-dom'




const CreatePost = () => {

  const [imageFile, setImageFile] = useState(null)
  const [previewImageFile, setPreviewImageFile] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [formData, setFormData] = useState({})
  const [uploadProgress, setUploadProgress] = useState('')
  const [publisherr, setPublishErr] = useState(null) 
 
  const navigate = useNavigate()

const handleChange = async (e)=>{
 const file = e.target.files[0]
 setImageFile(file)
 const preview = URL.createObjectURL(file)
}

//later i will change the image folder on cloudnary
const data = new FormData()
data.append('file', imageFile)
data.append('upload_preset', 'codelWebImagesPreset')

const uploadImage = async ()=>{

const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

try{
if(!imageFile){
 setErrMessage('Please select an image');
 return  
}

setErrMessage(null)
const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,data,
  {
    onUploadProgress: (progressEvent)=>{
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      setUploadProgress(percent)
    }
  }
)




const url = res.data.secure_url

setFormData({...formData, image:url})
setErrMessage(null)
setUploadProgress(null)
}catch(error){
   setErrMessage('trouble uploading image')
   console.log(error)

}
} 

const handleSubmit = async (e)=>{
  e.preventDefault()
try{
  const res = await fetch('/api/post/create', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const data = await res.json()

  if(!res.ok){
    setPublishErr(data.message)
    return
  }


  if(res.ok){
    setPublishErr(null)
    navigate(`/post/${data.slug}`)
  }
}catch(error){
setPublishErr('something went wrong')
}
}


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen '>
        <h1 className='text-center text-3xl my-7 font-semibold'>  CreatePost </h1>
       <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title'
            className='flex-1' onChange={(e)=>{setFormData({...formData, title:e.target.value})}} />
            <Select className='min-w-40' onChange={(e)=>{setFormData({...formData, category:e.target.value})}}>
                <option value='uncategories'> Select a category </option>
                <option value='journal'> Journal </option>
                <option value='nursing'> Nursing </option>
                <option value='news'> News </option>
                <option value='article'> Article </option>

            </Select>

        </div>
        <div className='flex gap-4 items-center justify-between border-4 
        border-blue-900 border-dotted p-3'>
            <FileInput className='w-64' type='file' accept='images/*' onChange={handleChange}/>
          
        
         
            <Button
             type='button'
             size='sm'
             outline
             onClick={uploadImage}
             disabled={uploadProgress  }
             >
              { uploadProgress ? <div className='w-16 h-16'> 

                <CircularProgressbar value={uploadProgress} text={`${uploadProgress || 0 }%`}/>

              </div>:
              'Upload image'
            }
              </Button>

             
        </div>
 { errMessage && <Alert color="failure" >{errMessage} </Alert>}
 {formData.image &&
 <img src={formData.image} alt="" className='w-full h-72 object-cover'  /> 
}

 <ReactQuill theme="snow" placeholder='Write something' className='h-72 mb-5' onChange={(value)=>{
  setFormData({...formData, content:value})
}} />

  <Button type='submit' className='mt-5' > Submit Post</Button>

  {
  publisherr && <Alert color='failure' className='mt-6'> {publisherr}</Alert>
}



       </form>
        
        </div>
  )
}

export default CreatePost