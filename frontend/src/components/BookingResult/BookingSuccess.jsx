import React from 'react';
import Icon from '../../assets/images/check-yes-ok-icon-10.png';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {

  
  return (
    <section>
      <div className="container flex flex-col justify-center items-center">
        <img src={Icon} alt='' className='w-[50px] h-[50px]'/>
        <h2 className="text-[18px] leading-[20px] lg:text-[19px] lg:leading-7 text-headingColor font-[700]
            mt-3 lg:mt-6">Payment Done!</h2>
        <p className='text-[15px] leading-6 lg:text-[18px] lg:leading-7
          font-[400] text-textColor'>Thank you for completing your secure online payment</p>
        <span className='text-[18px] leading-6 lg:text-[16px] lg:leading-7
                    font-[300] text-headingColor'>Have a great day!</span>
                    <Link to='/'>
        <button  className=' mt-4 bg-primaryColor  px-4 lg:px-5 py-2 rounded-lg text-gray-50 text-l shadow-sm
              '>Go Back Home</button></Link>
      </div>
    </section>
  )
}

export default BookingSuccess