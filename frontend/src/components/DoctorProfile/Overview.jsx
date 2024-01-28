import React,{useEffect,useState} from 'react';
import { getUsername } from '../../helper/helper';
import starIcon from '../../assets/images/Star.png';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useNavigate  } from 'react-router-dom';


const Overview = () => {
  const navigate = useNavigate();
  
  const[apiData,setApiData]=useState();
  const[loading,setLoading]=useState(true);

 useEffect(()=>{
  const fetchData=async()=>{
    try {
      const {username}= await getUsername();
     // console.log(username)
      const{data}=  await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/doctor/${username}`)
     setApiData(data)
      setLoading(false)
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData();
},[])
 
// const[{isLoading,apiData,serverError}]=useFetch(`doctor/iphone09`);
//console.log(apiData)

const [qualifications, setQualifications] = useState();
useEffect(()=>{
  setQualifications(apiData?.qualifications)
 // console.log(qualifications)
},[])

const getYearFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
}
if (!apiData) {
  navigate('/docprofile');
  return null;
}
  return (
    <>
{loading ? <Loading/>:(
   <div className=''>
     <h1 className='font-bold'>Profile Information</h1> 
       <div className='flex gap-4'>
       <div>
        
        
  <img src={apiData?.photo.url} className='w-[20px] h-[20px]' alt='' />

        </div>
        <div className='flex flex-col'>
          <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4
            lg:text-[16px] lg:leading-7 font-semibold rounded'>
                {apiData?.specialization}
            </span>
          <span className=' mt-2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-semibold text-headingColor'>{apiData?.name}</span>
          <div className='flex items-center gap-[6px]'>
                <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-semibold text-headingColor'>
                    <img src={starIcon} alt=''/> {apiData?.averageRating}
                </span>
                <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-textColor'>({apiData?.totalRating})</span>
            </div>
            <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-textColor'>{apiData?.bio}</span>
        </div>
       </div>

       <p className='mt-4'>About of  <span className='  text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-semibold text-irisBlueColor'>{apiData?.name}</span></p>
      <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-textColor'>{apiData?.about}</span>
      <div className='mt-6'>
        <h1 className='font-[600]'>Education</h1>
        
          <div className='ml-3 mt-3'>
          <span className=' text-irisBlueColor text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{getYearFromDate(apiData?.qualifications?.qualificationStartingDate||'')}</span>-
          <span className=' text-irisBlueColor text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{getYearFromDate(apiData?.qualifications.qualificationEndingDate||'')}</span>
          <div className='flex '>
          <p className='w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-textColor'>{apiData?.qualifications.degree}</p>
          <p className='w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-textColor'>{apiData?.qualifications.university}</p>
          </div>
          </div>

          <div className='ml-3 mt-3'>
          <span className=' text-irisBlueColor text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{getYearFromDate(apiData?.qualifications?.qualificationStartingDate2)}</span>-
          <span className=' text-irisBlueColor text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{getYearFromDate(apiData?.qualifications?.qualificationEndingDate2)}</span>
          <div className='flex '>
          <p className='w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-textColor'>{apiData?.qualifications.degree2}</p>
          <p className='w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-textColor'>{apiData?.qualifications.university2}</p>
          </div>
          </div>
      </div>



      <div className='mt-11'>
        <h1 className='font-[600]'>Experience</h1>
        <div className='flex gap-6'>
          <div className='ml-3 mt-6 w-1/2 bg-lightyellow py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4
            lg:text-[16px] lg:leading-7 font-semibold rounded '>
          <span className=' text-yellow text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{getYearFromDate(apiData?.experiences.selectedStartingDate)}</span>
          <span className=' text-yellow text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{-getYearFromDate(apiData?.experiences.selectedEndingDate)}</span>
          <div>
          <p className='w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-headingColor'>{apiData?.experiences.position}</p>
          <p className='w-1/2 text-[12px] leading-5 lg:text-[14px] lg:leading-6
                font-[300] text-textColor'>{apiData?.experiences.hospital}</p>
          </div>
          </div>

          <div className='mt-6 w-1/2 bg-lightyellow py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4
            lg:text-[16px] lg:leading-7 font-semibold rounded'>
          <span className=' text-yellow text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{getYearFromDate(apiData?.experiences.selectedStartingDate2)}</span>
          <span className=' text-yellow text-[12px] leading-4
            lg:text-[16px] lg:leading-7'>{-getYearFromDate(apiData?.experiences.selectedEndingDate2)}</span>
          <div >
          <p className='w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[400] text-headingColor'>{apiData?.experiences.position2}</p>
          <p className='w-1/2 text-[12px] leading-5 lg:text-[14px] lg:leading-6
                font-[300] text-textColor'>{apiData?.experiences.hospital2}</p>
          </div>
          </div>
          </div>
      </div>   
      </div>)}
      </>
  )
}

export default Overview;