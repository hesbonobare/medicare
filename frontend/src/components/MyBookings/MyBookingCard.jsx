
import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";

const MyBookingCard = ({ booking }) => {
   // const { username, name, avgRating, totalRating, photo, specialization, totalPatients, experiences } = doctor || {};

const{doctorData,photo,hospitall}  =booking  ||{}

  //  const {doctorData,hospitall}=booking

    return (
        <div className='p-3 lg:p-5 w-3/4 md:w-full'>
            <div>
                <img src={photo } className='w-full sm:w-[220px] h-[180px] rounded-sm' alt='' />
            </div>

            <h2 className="text-[12px] leading-[20px] lg:text-[16px] lg:leading-6 text-headingColor font-[700]
            mt-3 lg:mt-5">{ doctorData.name}</h2>

            <div className='mt-2 lg:mt-4 flex items-center justify-between'>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-1 lg:px-3 text-[12px] leading-4
                lg:text-[16px] lg:leading-7 font-[400] rounded-sm'>
                    { doctorData.specialization}
                </span>

                <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-semibold text-headingColor'>
                        <img src={starIcon} alt='' /> { doctorData.averageRating}
                    </span>
                    <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor'>({ doctorData.totalRating})</span>
                </div>
            </div>

            <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
                <div>
                    <p className='text-[14px] leading-6 font-[400] text-textColor'>At { hospitall}</p>
                </div>

               { /*<Link to={`/doctor/${doctorData.username}`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] 
           flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>*/}
            </div>
        </div>
    )
}

export default MyBookingCard;



