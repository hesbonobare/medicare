import React from 'react';
import logo from '../../assets/images/logo.png';
import { Link,useNavigate } from 'react-router-dom';
import avator from '../../assets/images/profile.png';
import toast,{Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import { passwordValidate } from '../../helper/validate';
import useFetch from '../../hooks/fetch.hook.js';
import { useAuthStore } from '../../store/store.js';
import { verifyPassword } from '../../helper/helper';
import { getUsername } from '../../helper/helper';

const Password= () => {
const navigate=useNavigate();
const {username,userId}=useAuthStore(state=>state.auth);
console.log(username)
console.log(userId)
const[{isLoading,apiData,serverError}]=useFetch(`user/${username}`)

const setUserId=useAuthStore(state=>state.setUserId);
const fetchData = async () => {
  try {
    const response = await getUsername();
    const Id = response.userId;
    console.log(Id);
    setUserId(Id); // Store the userId in the Zustand store
  } catch (error) {
    console.error(error);
  }
}


  const formik=useFormik({
    initialValues:{
      Password:'example@123'
    },
    validate:passwordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      let loginPromise=verifyPassword({username,password:values.password})
      toast.promise(loginPromise,{
        loading:'Checking...',
        success:<b>Login Successifully...!</b>,
        error:<b>Password Not Match</b>
      });
      loginPromise.then(res=>{
        let{token}=res.data;
        localStorage.setItem('token',token)
        fetchData();
        navigate('/');
      })
      console.log(values)
    }
  })

//if(isLoading) return <h1 className='text-2xl font-bold'>LOADING</h1>
if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='container mx-auto hero__section'>

      <Toaster position='top-center' reverseOrder={false}>

      </Toaster>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='glass'>

          <div className='title flex flex-col items-center'>
            <h4 className='text-xl font-semibold pt-3'> Hello {apiData?.firstname ||apiData?.username}</h4>
            <span className='py-4 text-l w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={apiData?.profile || avator}  className='profile_img'alt=''/>
            </div>

            <div className=' flex flex-col items-center py-4'>
              <input {...formik.getFieldProps('password')} type='password' className='textbox' placeholder='example@123'/>
              <button type='submit' className=' bg-primaryColor w-3/4  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
              '>
                Sign In
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>Forgot password? <Link to='recovery'
              className='text-red-500'>
              Recover Now
              </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password;