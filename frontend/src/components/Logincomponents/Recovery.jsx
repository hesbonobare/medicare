import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import avator from '../../assets/images/profile.png';
import {Toaster, toast} from "react-hot-toast";
import {useFormik} from "formik";
import { passwordValidate } from '../../helper/validate';
import { useAuthStore } from '../../store/store';
import { useEffect } from 'react';
import { generateOTP, verifyOTP } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';


const Recovery= () => {
  const navigate=useNavigate();
  const {username}=useAuthStore(state=>state.auth);
  const [OTP,setOTP]=useState();

  useEffect(()=>{
    generateOTP(username).then((OTP)=>{
     // console.log(OTP)
      if(OTP) return toast.success('OTP has been sent to your email')
      return toast.error("Problem encountered while generating OTP!")
    })
  },[username])

  async function onSubmit(e){
    e.preventDefault();

    try {
      let{status}=await verifyOTP({username,code:OTP})
    if(status===201){
      toast.success('Verify Successfully')
      return navigate('/reset')}
    } catch (error) {
      return toast.error('Wrong OTP! check email again!')
    }
    
    }
   
  

//handler of resend OTP
function resendOTP(){
  let sendPromise=generateOTP(username);

  toast.promise(sendPromise,{
    loading:'Sending...',
    success:<b>OTP has been sent to your email</b>,
    error:<b>Could not send OTP</b>
  })

  sendPromise.then(OTP =>{
  // console.log(OTP)
  })
}

  return (
    <div className='container mx-auto hero__section'>

      <Toaster position='top-center' reverseOrder={false}>

      </Toaster>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='glass'>

          <div className='title flex flex-col items-center'>
            <img src={logo}  className='mt-4'alt=''/>
            <h4 className='text-2xl font-bold'>Recovery</h4>
            <span className='py-4 text-l w-2/3 text-center text-gray-500'>
              Enter OTP to recover password
            </span>
          </div>

          <form className='pt-10' onSubmit={onSubmit}>
           

            <div className=' flex flex-col items-center py-4'>
              
              <div className='input  text-center'>
              <span className='py-4 text-sm text-left text-gray-100'>
                Enter 6 digit OTP sent to your email address
              </span>

              <input onChange={(e)=>setOTP(e.target.value)}type='password' className='textbox' placeholder='OTP'/>
              </div>
              
             
              <button type='submit' className=' bg-primaryColor w-3/4  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
              '>
                RECOVER
              </button>
            </div>
          </form>

          <div className='text-center py-4'>
              <span className='text-gray-500'>Can`t get OTP? <button onClick={resendOTP}
              className='text-red-500'>
              Resend             
              </button>
              </span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery;