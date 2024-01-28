
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import LoadingButton from '../Loading/LoadingButto';



const BookingButton = ({doctorData}) => {

    console.log(doctorData)

    const [userId, setUserId] = useState(null);
    const [loading, setLoading]=useState();

    useEffect(() => {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      if (token) {
        const decoded = jwt_decode(token);
        setUserId(decoded.userId);
      }
    }, []);

    console.log(userId)
  
    function handleBookings(){
         axios.post('http://localhost:8080/api/create-checkout-session',{
          userId:userId,
         doctorData
         
        }).then((res)=>{
          
            if(res.data.url){
                window.location.href=res.data.url
            }
        })
        .catch((err)=>console.log(err.message))
      
    }
  return (
    <>
    <button onClick={()=>{handleBookings()
    setLoading(true)
  }}
    className="w-[100%] mt-4 bg-primaryColor  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
     ">{loading?<LoadingButton/>:'Book Appointment'}</button>
    </>
    
  )
}

export default  BookingButton;