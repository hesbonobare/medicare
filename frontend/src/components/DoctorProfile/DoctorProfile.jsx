import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Overview from './Overview';
import Appointments from './Appointments';
import Profile from './profile';


const DoctorProfile = () => {
const navigate=useNavigate();

const [activeButton, setActiveButton] = useState(null);

const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [visibleComponent, setVisibleComponent] = useState(null);

  const handleButtonClick = (component) => {
    setVisibleComponent(component);
  };

    function userLogout(){
        localStorage.removeItem('token');
        navigate('/')
      }
  return (
    <section>
    <div className='container'>
        <div className='flex justify-center gap-10 flex-col  md:flex-row'>
           <div className='bg-white rounded-lg w-[90%] justify-center sm:w-[30%] shadow-md p-6'>
            <div className='flex flex-col items-center mt-[0px] '>
                <span  className={`py-2 px-3  ${
                    activeButton === 1 ? 'bg-periwinkle text-purple-950 rounded-[5px] w-[100%] text-center' : 'text-black'
                  } border-primaryColor focus:outline-none rounded-[5px] `}
                  onClick={() =>{ handleButtonClick(<Overview />)
                                           handleClick(1)}
                }
                  >
                    Overview</span>
                <span  className={`py-2 px-3 mt-[1px]   ${
                      activeButton === 2 ? 'bg-periwinkle text-purple-950 rounded-[5px] w-[100%] text-center' : 'text-black'
                    } border-primaryColor  focus:outline-none rounded-[5px]`}
                    onClick={() =>{ handleButtonClick(<Appointments />)
                                           handleClick(2)}}
                    >
                    Appointments</span>
                <span  className={`py-2 px-3 mt-[1px]  ${
                      activeButton === 3 ? 'bg-periwinkle text-purple-950 rounded-[5px] w-[100%] text-center' : 'text-black'
                    } border-primaryColor  focus:outline-none rounded-[5px]`}
                    onClick={() =>{ handleButtonClick(<Profile />)
                                           handleClick(3)}}
                    >
                    Profile</span>
            </div>
            <div className='flex flex-col mt-[60px]'>
            <button onClick={userLogout} className='bg-black py-2 px-3 mb-3 w-[100%] text-white font-[400] md:font-[600] border border-black rounded-[5px]'>Logout</button>
           {/*<button className='bg-customRed py-2 px-3 w-[100%] text-white font-[600] border border-customRed rounded-[5px]'>Delete Account</button>*/}
            </div>
           </div>

           
            
            <div className='mt-5'>
                {visibleComponent}
            </div>
           </div>
        </div>
        
    
    </section>
   
  )
}

export default DoctorProfile;