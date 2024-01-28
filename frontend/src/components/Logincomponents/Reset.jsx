import React from 'react';
import logo from '../../assets/images/logo.png';
import { useNavigate,Navigate} from 'react-router-dom';
import avator from '../../assets/images/profile.png';
import toast,{Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import { resetPasswordValidation } from '../../helper/validate';
import { resetPassword } from '../../helper/helper.js';
import { useAuthStore } from '../../store/store';
import useFetch from '../../hooks/fetch.hook';

const Reset= () => {


  const [{isLoading,apiData,status,serverError}]=useFetch('createResetSession')
  const navigate=useNavigate();
  const {username}=useAuthStore(state=>state.auth);
console.log(username)
  const formik=useFormik({
    initialValues:{
      Password:'',
      confirm_pwd:''
    },
    validate:resetPasswordValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      const resetPromise=  resetPassword({username,password:values.password})
console.log(values.password)
      toast.promise(resetPromise,{
        loading:'Reseting...',
        success:<b>Reset Successful..!</b>,
        error:<b>Could not reset</b>
      })

      resetPromise.then(function(){navigate('/password')})
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>LOADING</h1>
if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
if(status && status !==201) return <Navigate to={'/password'} replace={true}></Navigate>
  return (
    <div className='container mx-auto hero__section'>

      <Toaster position='top-center' reverseOrder={false}>

      </Toaster>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='glass w-1/2'>

          <div className='title flex flex-col items-center'>
            <img src={logo} className='logoo' alt=''/>
            <h4 className='text-xl font-semibold'>Reset</h4>
            <span className='py-4 text-l w-2/3 text-center text-gray-500'>
              Enter new password
            </span>
          </div>

          <form className='py-10' onSubmit={formik.handleSubmit}>
            

            <div className=' flex flex-col items-center py-4'>
              <input {...formik.getFieldProps('password')} type='password' className='textbox' placeholder='New Password'/>
              <input {...formik.getFieldProps('confirm_pwd')} type='password' className='textbox' placeholder='Repeat Password'/>
             
              <button type='submit' className=' bg-primaryColor w-3/4  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
              '>
                Reset
              </button>
            </div>

          
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default Reset;