import React from 'react';
import icon from '../../assets/images/check-yes-ok-icon-10.png';

const AppointmentCard = ({appointment}) => {
   const{photo,name,email,gender,paymentStatus,appointmentDate,price}=appointment;
   //const{name,school}=appointment;
//console.log(name,school)
//const genderr='female'

const realPrice=price/100

const dateString = appointmentDate;
const dateObject = new Date(dateString);

const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
const formattedDate = dateObject.toLocaleDateString('en-US', options);

//console.log(formattedDate);


  return (
    
    <div className='flex justify-between gap-3 mt-5 sm:border-b-2 border-solid border-darkblack '>
      <img src={photo}  className="w-[50px] h-[50px] rounded-full shadow-lg cursor-pointer hover:border-gray-200 hidden sm:block" alt=''/> 
     
      <div className='flex flex-col'>
      <span className='text-headingColor font-[700]'>{name}</span>
      <span className='text-[16px] leading-7 font-[400] text-textColor hidden sm:block'>{email}</span>
      </div>
      <span className='ml-7 text-[16px] leading-7 font-[400] text-textColor items-center'>{gender?gender:"null"}</span>
      <span className=' ml-6 items-center text-[16px] leading-7 font-[400] text-textColor mb-7 hidden sm:flex'>
        <label><img src={icon} className='w-[15px] h-[15px]' alt=''/></label> 
      <p className='p-1'>{paymentStatus}</p>
      </span>
      <span className=' text-[16px] leading-7 font-[400] text-textColor ml-6'>{realPrice}</span>
      <span className='text-[16px] leading-7 font-[400] text-textColor ml-5'>{formattedDate}</span>
      
    </div>
  
  )
}

export default AppointmentCard;