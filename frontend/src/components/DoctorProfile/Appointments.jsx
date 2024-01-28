
import { useEffect ,useState} from 'react';
import useFetch from '../../hooks/fetch.hook';
import axios from 'axios';
import { getUsername } from '../../helper/helper';
import AppointmentCard from './AppointmentCard';
import Loading from '../Loading/Loading';

const Appointments = () => {

  
 // const [{ isLoading, apiData, serverError }] = useFetch(`doctor/appointments`);
 // console.log(apiData)
 const[loading,setLoading]=useState(true)
const [appointments,setAppointments]=useState([]);


  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const {username}= await getUsername();
        console.log(username)
        const{data}=  await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/doctor/appointments/${username}`)
        setAppointments(data)
        setLoading(false)
       // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[])
 // console.log(appointments)
  
  return (
 <div className='overflow-x-auto min-w-[400] h-[100%]'>
   <div className='flex sm:bg-darkblack justify-between p-2 px-5 rounded-sm gap-7 sm:gap-8 '>
  <span className='pr-[10px] sm:pr-[170px]'>NAME</span>
  <span className=''>GENDER</span>
  <span className='hidden sm:block'>PAYMENT</span>
  <span>PRICE</span>
  <span>BOOKED ON</span>
  </div>
  { loading ?<Loading/>: appointments.map((appointment)=> <AppointmentCard key={appointment._id} appointment={appointment}/>)}
  
 
 </div>
 
  )
}

export default Appointments;