import React,{useState} from 'react';
import avator from '../../assets/images/profile.png';
import useFetch from '../../hooks/fetch.hook';
import { useNavigate } from 'react-router-dom';
import MyBookings from '../MyBookings/MyBookings';
import Profile from '../Logincomponents/Profile';

const UserProfile = () => {

  const [activeButton, setActiveButton] = useState(null);

  
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [visibleComponent, setVisibleComponent] = useState(null);

  const handleButtonClick = (component) => {
    setVisibleComponent(component);
  };


const navigate=useNavigate();
    const[{isLoading,apiData,serverError}]=useFetch()
    function userLogout(){
      localStorage.removeItem('token');
      navigate('/')
    }


  return (
    <section>
        <div className="container">
            <div className='flex flex-col sm:flex-row  justify-center gap-10'>
                <div className='flex flex-col items-center'>
                <figure className=' rounded-full cursor-pointer mb-4'>
                <img src={apiData?.profile || avator} className='w-[70px] h-[70px]  rounded-full' alt=''/>
              </figure>
                <h3 className='font-semibold'>{apiData?.username ||"afakryda" }</h3>
                <h4>{apiData?.email ||"afakryda@gmail.com"}</h4>
                <h4>Blood Type: {apiData?.bloodType||"A-"}</h4>

                <div className='flex flex-col mt-9'>
                    <button onClick={userLogout} className='bg-black py-2 px-3 mb-3 w-[100%] text-white font-[600] border border-black rounded-[5px]'>Logout</button>
                    <button className='bg-customRed py-2 px-3 w-[100%] text-white font-[600] border border-customRed rounded-[5px]'>Delete Account</button>
                </div>
                </div>

                <div>
                    <div className='flex gap-2'>
                    <button onClick={() => {handleButtonClick(<MyBookings />);
                                             handleClick(1);}
                  } 
                  className={`py-2 px-3 border  ${
                    activeButton === 1 ? 'bg-primaryColor text-white rounded-[5px]' : 'text-black'
                  } border-primaryColor focus:outline-none rounded-[5px] `}
                    >My Bookings</button>
                    <button onClick={() =>{ handleButtonClick(<Profile />)
                                           handleClick(2)}
                  }
                     className={`py-2 px-3 border ${
                      activeButton === 2 ? 'bg-primaryColor text-white rounded-[5px]' : 'text-black'
                    } border-primaryColor  focus:outline-none rounded-[5px]`}
                  >Settings</button>
                    </div>
                    
                    <div>{visibleComponent}</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default UserProfile;