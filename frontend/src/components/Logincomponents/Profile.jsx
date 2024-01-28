import React,{useState} from 'react';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import avator from '../../assets/images/profile.png';
import toast,{Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import { profileValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook.js';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../helper/helper';
import Loading from '../Loading/Loading';

import extend from '../../styles/Profile.module.css';

const Profile= () => {

  const [selectedOption, setSelectedOption] = useState('');

  const options = ["male", "female", "other"];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const navigate=useNavigate();
  const [file,setFile]=useState();
  
  const[{isLoading,apiData,serverError}]=useFetch()
  console.log(apiData)
  const formik=useFormik({
    initialValues:{
      username:apiData?.username||'',
      email:apiData?.email||'',
      mobile:apiData?.mobile||'',
      bloodType:apiData?.bloodType||'',
    },
    enableReinitialize:true,
    validate:profileValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      values= await Object.assign(values,{profile:file || apiData?.profile|| ''},{gender:selectedOption})
      
      let updatePromise=updateUser(values)
      toast.promise(updatePromise,{
        loading:'Updating...',
        success:<b>Update Successifully</b>,
        error:<b>Could not update!</b>
      })
      console.log(values)
    }
    
  })

  const onUpload = async e =>{
    const base64= await convertToBase64(e.target.files[0]);
    setFile(base64)
  }

    
   

  if(isLoading) return <h1 className='text-2xl font-bold'><Loading/></h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    
<div className=' '>
        <Toaster position='top-center' reverseOrder={false}>

        </Toaster>

            <h4 className=' title text-xl font-semibold mt-6'>Profile Settings</h4>
            
          <form className='py-1' onSubmit={formik.handleSubmit}>
          <div className=' flex flex-col items-left py-4'>
              
              
              <input {...formik.getFieldProps('username')} type='text' className='textbox2' placeholder='Username*'/>
              <input {...formik.getFieldProps('email')} type='email' className='textbox2' placeholder='Email*'/>
              <input {...formik.getFieldProps('mobile')} type='mobile' className='textbox2' placeholder='Mobile No*'/>
              <input {...formik.getFieldProps('bloodType')} type='address' className='textbox2' placeholder='Blood Group*'/>
              
              <div className='flex '>
              <h1 className='flex justify-start text-l p-2 font-[400] mb-4'>Gender:</h1>
              <select   className=' outline-none h-[40px] ' value={selectedOption} onChange={handleSelectChange}>
                
                {options.map((option, index) => (
                  <option   key={index} value={option}>
                    {option}
                    
                  </option>
                ))}
                
              </select>
              </div>

              <div className='flex items-center'>
              <label htmlFor="profile">
              <img src={apiData?.profile || file || avator}  className='profile_img' alt=''/>
              </label>

              <input onChange={onUpload} type="file" className='inputFile'id='profile' name='profile'/>
              <span className='bg-card p-2 ml-2 rounded-[4px]'>Upload Photo</span>
              
              </div>
               
              <button type='submit' className='w-[100%] mt-4 bg-primaryColor  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
              '>
                Update Profile
              </button>
              </div>

          </form>
        </div>
    
    
  )
}

export default Profile;