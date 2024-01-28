import React,{useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import MyBookingCard from './MyBookingCard';
import Loading from '../Loading/Loading';
import { getUsername } from '../../helper/helper';
import { useAuthStore } from '../../store/store.js';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook';


const MyBookings = () => {
 
 ///const [userId, setUserId] = useState();
  const [bookings, setBookings] = useState([]);
  const [userId,setUserId]=useState()
  const [loading, setLoading] = useState(false);

  //const {username}=useAuthStore(state=>state.auth);
 // const {userId,username}=useAuthStore(state=>state.auth);
 
  useEffect(() => {
    /*const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
      const decoded = jwt_decode(token);
      setUserId(decoded.userId);
    }*/
    const fetchData=async()=>{
      try {
        const {userId}= await getUsername();
        console.log(userId)
        const{data}=  await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/bookings/${userId}`)
        setBookings(data)
        console.log(data)
        setLoading(false)
       // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();

  }, []);
 // console.log(userId)
 // const[{isLoading,apiData,serverError}]=useFetch(`bookings/${userId}`)
  //console.log(apiData);

 /*const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
  if (token) {
    const decoded = jwt_decode(token);
    setUserId(decoded.userId);
  }*/
/*  const h=useParams();
  const fetchData = async () => {
    try {
      const {username} = await getUsername()
      const Id = response.userId
      console.log(username)
      setUserId(Id)
    
      console.log(h)
     // setUserId(usernameData.userId);
    } catch (error) {
      console.error(error);
    }}

  
  
  useEffect(() => {
  console.log(username)
   /* fetch(`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBookings(data);
        setLoading(false);
      })
      64f1b696e7b3f5984fc116ef
      .catch((error) => console.error('Error:', error));
      
      
      
    

    
     // console.log(usernameData.username);
     if(userId){axios.get(`http://localhost:8080/api/bookings/${userId}`).then((res)=>{
      console.log(res.data)
       setBookings(res.data)
       setLoading(false)
       fetchData()
       

   }).catch((err)=>console.log(err.message))
  }
      
  }, []);*/

 


  return (
    <div className='flex flex-col max-w-3xl'>
      <h1 className="text-[12px] leading-[20px] lg:text-[19px] lg:leading-7 text-headingColor font-[700]
            mt-5 lg:mt-8">My Bookings</h1>
      
      {loading ? (
       <Loading/>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-[19px]'>
          {bookings.map((booking)=> <MyBookingCard key={booking._id} booking={booking}/>)}
        </div>
      )}
      {!bookings && (
        <h2>No Bookings to display</h2>
      )}
    </div>
  );

}

export default MyBookings