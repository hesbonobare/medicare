
import React, { useState, useEffect } from 'react';
import Doctor from './DoctorsDetails';
import { getDoctors } from '../../helper/helper';
import Loading from '../../components/Loading/Loading';



const DoctorList = () => {

//  const[{isLoading,apiData,serverError}]=useFetch(`doctors`)
  //console.log(apiData)
  
  const [doctors, setDoctors] = useState([]);
  const [records,setRecords] = useState([])
  const [loading,setLoading] = useState(true)
  

  useEffect(()=>{
    getDoctors()
    .then(data => {
      console.log(data)
       setDoctors(data)
       setRecords(data)
       setLoading(false)
    })
    .catch(error => console.error('Error fetching data:', error));

}
, []);

const Filter=(event)=>{
  setRecords(doctors.filter((user)=> 
  {return user && user.name && user.name.toLowerCase().includes(event.target.value)}))
}   

  return (

  
  <>
   <section className='bg-lightyellow'>
     
     <div className='flex flex-col justify-center'>
       <label htmlFor='name' className='heading text-center'>Find a Doctor</label>
       <div className='flex items-center mx-auto mt-6'>
       <input
         type='text'
         name='name'
         id='name'
        // value={input}
         onChange={Filter}
         placeholder='Search by doctor name'
         className=' w-full sm:w-[400px] border-none border-transparent p-2 outline-none rounded-sm'
       />
       <span className=' bg-primaryColor py-2 px-3 rounded-tr-sm rounded-br-sm text-white'>Search</span>

       </div>
     </div>
 
 </section>

 {loading ? (
       < Loading/>
      ) : (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
    {records.map((doctor)=> <Doctor key={doctor._id} doctor={doctor}/>)}
      </div>
      )}
      </>

  )
  }
export default DoctorList;
