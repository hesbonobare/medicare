import React,{useEffect} from 'react';
import logo from '../../assets/images/logo.png';
import { Link,useNavigate } from 'react-router-dom';
import avator from '../../assets/images/profile.png';
import {Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import { usernameValidate } from '../../helper/validate';
import {useAuthStore} from '../../store/store.js';

const Username = () => {
 const navigate=useNavigate()

  const setUsername=useAuthStore(state=>state.setUsername);
 const username=useAuthStore(state=>state.auth.username);

  useEffect(()=>{
    console.log(username)
  })

  const formik=useFormik({
    initialValues:{
      username:''
    },
    validate:usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
     // console.log(values)
      setUsername(values.username)

     navigate('/password')
    }
  })


  return (
    <div className='container mx-auto hero__section'>

      <Toaster position='top-center' reverseOrder={false}>

      </Toaster>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='glass'>

          <div className='title flex flex-col items-center'>
            <p className='mt-5 py-4 text-l w-2/3 text-center text-gray-500'>Already a member? <span className="text-[13px] leading-[22px] lg:text-[22px] lg:leading-7 text-headingColor font-[600]
            mt-5 lg:mt-8"
            >LOGIN NOW</span></p>
            <span className='py-4 text-l w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avator}  className='profile_img'alt=''/>
            </div>

            <div className=' flex flex-col items-center py-4'>
              <input {...formik.getFieldProps('username')} type='text' className='textbox' placeholder='Username'/>
              <button type='submit' className=' bg-primaryColor w-3/4  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
              '>
                Lets Go
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>Not a member? <Link to='register'
              className='text-red-500'>
              Register Now
              </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Username;