import React,{useEffect,useRef,useState} from 'react';
import logo from '../assets/images/logo.png';
import { NavLink, Link,Navigate } from 'react-router-dom';
import userImg from '../assets/images/avatar-icon.png';
import {BiMenu} from 'react-icons/bi';
import useFetch from '../hooks/fetch.hook';
import avator from '../assets/images/profile.png';



const navLinks=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/doctors',
    display:'Find a Doctor'
  },
  {
    path:'/services',
    display:'Services'
  },
  {
    path:'/contact',
    display:'Contact'
  },
]


function Header(){


  const[{isLoading,apiData,serverError}]=useFetch()

  const[ userType,setUserType]=useState("");

  useEffect(() => {
    // Check if apiData is available and has the role property
    if (apiData && apiData.role) {
      if (apiData.role === 'doctor') {
        setUserType('doctor');
      } else if (apiData.role === 'patient') {
        setUserType('patient');
      }
    }
  }, [apiData]);


  
  const token = localStorage.getItem('token');

const headerRef=useRef(null);
const MenuRef=useRef(null);

const handleStickyHeader=()=>{
  window.addEventListener('scroll',()=>{
    if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
      headerRef.current.classList.add('sticky__header')
    }else{
      headerRef.current.classList.remove('sticky__header')
    }
  })
}

useEffect(
  ()=>{
    handleStickyHeader()

    return ()=> window.removeEventListener('scroll',handleStickyHeader)
  }
)

const toggleMenu=()=>MenuRef.current.classList.toggle('show__menu')



  return <header className='header flex items-center' ref={headerRef}>
    <div className='container'>
      <div className='flex items-center justify-between'>
        {/*logo*/}
        <div>
          <img src={logo} className='w-[110px] sm:w-full' alt=''/>
        </div>

        {/*menu */}
        <div className="navigation" ref={MenuRef} onClick={toggleMenu}>
          <ul className="menu flex md:items-center items-start gap-[1rem] pl-9 md:pl-0 md:gap-[2.7rem]">
            {navLinks.map((link,index)=><li key={index}>
              <NavLink to={link.path} className={navClass=>navClass.isActive
               ? 'text-primaryColor text-[16px] leading-7 font-[600]'
               : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
            
            }>
              {link.display}
              </NavLink>
            </li>)}
          </ul>
        </div>

        {/*nav right*/}
        <div className='flex items-center  justify-between  gap-4'>
          <div className='hidden '>
            <Link to='/'>
              <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                <img src={userImg} className='w-full rounded-full' alt=''/>
              </figure>
            </Link>
            </div>

    {token ? (
      userType === 'patient' ? (
        <Link to="/userprofile"> {/* Assuming user type is "patient" */}
          <img
            src={apiData?.profile || /*file||*/ avator}
            className="md:w-[50px] md:h-[50px] h-8 w-8 rounded-full shadow-lg cursor-pointer hover:border-gray-200"
            alt=""
          />
        </Link>
      ) : (
        <Link to="/doctorprofile"> {/* Assuming user type is "doctor" */}
          <img
            src={apiData?.profile || /*file||*/ avator}
            className="md:w-[50px] md:h-[50px] sm:h-7 sm:w-7 h-5 w-5 rounded-full shadow-lg cursor-pointer hover:border-gray-200"
            alt=""
          />
        </Link>
      )
    ) : (
      <Link to="/username">
        <button className="bg-primaryColor ml-5 text-[13px] sm:text-[16px] py-2 sm:px-6 px-2 text-white font-[400] sm:font-[600] sm:h-[44px] h-7 flex items-center justify-center rounded-[50px]">
          Login
        </button>
      </Link>
    )}
             <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer'/>
            </span>
          
        </div>
      </div>
    </div>
  </header>
   


}

export default Header