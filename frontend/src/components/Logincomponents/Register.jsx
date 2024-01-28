import React,{useState} from 'react';
import logo from '../../assets/images/logo.png';
import { Link,useNavigate } from 'react-router-dom';
import avator from '../../assets/images/profile.png';
import toast,{Toaster} from "react-hot-toast";
import {useFormik} from "formik";
import { registerValidation } from '../../helper/validate';
import convertToBase64 from '../../helper/convert';
import {registerUser} from '../../helper/helper.js';
import LoadingButton from '../Loading/LoadingButto';

const Register= () => {
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const [file,setFile]=useState();

  const [selectedOption, setSelectedOption] = useState('');

  const options = ['select','doctor', 'patient']; 

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' }, { role: selectedOption });
  
        let registerPromise = registerUser(values);
  
        registerPromise
          .then(function () {
            toast.success(<b>Register Successfully</b>);
            navigate('/username');
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.status === 400) {
                toast.error(<b>{error.response.data}</b>);
              } else if (error.response.status === 500) {
                toast.error(<b>Internal Server Error. Please try again later.</b>);
              } else {
                toast.error(<b>An error occurred. Please try again later.</b>);
              }
            } else {
              toast.error(<b>Network Error. Please check your internet connection.</b>);
            }
          }) .finally(() => {
            setLoading(false); // Set loading to false after displaying any toast
          });
  
        console.log(values);
    }
  });
  

  const onUpload = async e =>{
    const base64= await convertToBase64(e.target.files[0]);
    setFile(base64)
  }


  return (
    <div className="container mx-auto hero__section">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="glass w-full sm:w-[60%] mt-[77px] mb-11">
          <div className="title flex flex-col items-center">
            <h4 className="text-xl font-semibold ">Register</h4>
            
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={file || avator} className="profile_img" alt="" />
              </label>

              <input
                onChange={onUpload}
                type="file"
                className="inputFile"
                id="profile"
                name="profile"
              />
            </div>

            <div className=" flex flex-col items-center py-4">
              <input
                {...formik.getFieldProps("email")}
                type="email"
                className="textbox"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                type="username"
                className="textbox"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps("password")}
                type="password"
                className="textbox"
                placeholder="Password*"
              />

<div className='flex justify-start items-left rounded mb-3'>
              <h1 className='flex justify-center text-l p-2 font-[400] mb-4'>Are you a:</h1>
              <select   className=' outline-none h-[40px] bg-background' value={selectedOption} onChange={handleSelectChange}>
                
                {options.map((option, index) => (
                 
                  <option   key={index} value={option}>
                    {option}
                    
                  </option>
                ))}
                
              </select>
              </div>
              
              

              <button
              onClick={()=>setLoading(true)}
                type="submit"
                className=" bg-primaryColor w-3/4  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
              "
              >
              {loading?<LoadingButton/>:'Register'}
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Registered?{" "}
                <Link to="/username" className="text-red-500">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;