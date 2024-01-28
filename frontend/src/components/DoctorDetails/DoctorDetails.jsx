import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/fetch.hook";
import starIcon from "../../assets/images/Star.png";
import { useParams, Link,useNavigate } from "react-router-dom";
import BookingButton from "../Payment/Payment";

const DoctorDetails = () => {
  const navigate=useNavigate()
  const { username } = useParams();
  console.log(username)
  //console.log(import.meta.VITE_SERVER_DOMAIN)

  const [{ isLoading, apiData, serverError }] = useFetch(`doctor/${username}`);

 // console.log(apiData)

  const [qualifications, setQualifications] = useState();
  useEffect(() => {
    setQualifications(apiData?.qualifications);
    // console.log(qualifications)
  }, []);

  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <section>
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-10 md:mx-[150px]">
          <div className="">
          <div className="flex gap-3 sm:gap-8">
            <div>
              <img
                src={apiData?.photo.url}
                className="w-[120px] h-[130px] rounded-md"
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <span
                className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-2 text-[12px] leading-4
                lg:text-[16px] lg:leading-7 font-semibold rounded text-center"
              >
                {apiData?.specialization}
              </span>
              <span
                className=" mt-2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-semibold text-headingColor"
              >
                {apiData?.name}
              </span>
              <div className="flex items-center gap-[6px]">
                <span
                  className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-semibold text-headingColor"
                >
                  <img src={starIcon} alt="" /> {apiData?.averageRating}
                </span>
                <span
                  className="text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor"
                >
                  ({apiData?.totalRating})
                </span>
              </div>
              <span
                className="text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor"
              >
                {apiData?.bio}
              </span>
            </div>
          </div>

          <p className="mt-4">
            About of { }
            <span
              className="  text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-semibold text-irisBlueColor"
            >
              { apiData?.name}
            </span>
          </p>
          <span
            className="text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor"
          >
            {apiData?.about}
          </span>
          <div className="mt-6">
            <h1 className="font-[600]">Education</h1>

            <div className="ml-3 mt-3">
              <span
                className=" text-irisBlueColor text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
              >
                {getYearFromDate(
                  apiData?.qualifications.qualificationStartingDate
                )}
              </span>
              -
              <span
                className=" text-irisBlueColor text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
              >
                {getYearFromDate(
                  apiData?.qualifications.qualificationEndingDate
                )}
              </span>
              <div className="flex ">
                <p
                  className="w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor"
                >
                  {apiData?.qualifications.degree}
                </p>
                <p
                  className="w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor"
                >
                  {apiData?.qualifications.university}
                </p>
              </div>
            </div>

            <div className="ml-3 mt-3">
              <span
                className=" text-irisBlueColor text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
              >
                {getYearFromDate(
                  apiData?.qualifications.qualificationStartingDate2
                )}
              </span>
              -
              <span
                className=" text-irisBlueColor text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
              >
                {getYearFromDate(
                  apiData?.qualifications.qualificationEndingDate2
                )}
              </span>
              <div className="flex ">
                <p
                  className="w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor"
                >
                  {apiData?.qualifications.degree2}
                </p>
                <p
                  className="w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-textColor"
                >
                  {apiData?.qualifications.university2}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <h1 className="font-[600]">Experience</h1>
            <div className="flex gap-6">
              <div
                className="ml-3 mt-6 w-1/2 bg-lightyellow py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4
                lg:text-[16px] lg:leading-7 font-semibold rounded "
              >
                <span
                  className=" text-yellow text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
                >
                  {getYearFromDate(apiData?.experiences.selectedStartingDate)}
                </span>
                <span
                  className=" text-yellow text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
                >
                  {-getYearFromDate(apiData?.experiences.selectedEndingDate)}
                </span>
                <div>
                  <p
                    className="w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-headingColor"
                  >
                    {apiData?.experiences.position}
                  </p>
                  <p
                    className="w-1/2 text-[12px] leading-5 lg:text-[14px] lg:leading-6
                    font-[300] text-textColor"
                  >
                    {apiData?.experiences.hospital}
                  </p>
                </div>
              </div>

              <div
                className="mt-6 w-1/2 bg-lightyellow py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4
                lg:text-[16px] lg:leading-7 font-semibold rounded"
              >
                <span
                  className=" text-yellow text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
                >
                  {getYearFromDate(apiData?.experiences.selectedStartingDate2)}
                </span>
                <span
                  className=" text-yellow text-[12px] leading-4
                lg:text-[16px] lg:leading-7"
                >
                  {-getYearFromDate(apiData?.experiences.selectedEndingDate2)}
                </span>
                <div>
                  <p
                    className="w-1/2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                    font-[400] text-headingColor"
                  >
                    {apiData?.experiences.position2}
                  </p>
                  <p
                    className="w-1/2 text-[12px] leading-5 lg:text-[14px] lg:leading-6
                    font-[300] text-textColor"
                  >
                    {apiData?.experiences.hospital2}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="flex-none p-4 bg-white rounded-sm shadow-lg h-[230px] ">
            <span className="flex gap-10">
              <p className="text-[12px] leading-5 lg:text-[14px] lg:leading-6
                 text-textColor font-[500]">Ticket Price</p>
              <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[620] text-headingColor">{apiData?. ticketPrice} KSH</p>
            </span>
            <h3 className="mt-5 mb-2 text-[14px] leading-6 lg:text-[16px] lg:leading-7
                font-[401] text-headingColor">Available Time Slots:</h3>
            <div className="flex gap-10">
              <p className="text-[12px] leading-5 lg:text-[14px] lg:leading-6
                font-[300] text-textColor">{apiData?.timeSlots.selectedDay}:</p>
              <span className="text-[12px] leading-5 lg:text-[14px] lg:leading-6
                font-[300] text-textColor">{apiData?.timeSlots.startTime}-{apiData?.timeSlots.endTime}</span>
            </div>

            <div className="flex gap-10">
              <p className="text-[12px] leading-5 lg:text-[14px] lg:leading-6
                font-[300] text-textColor">{apiData?.timeSlots.selectedDay2}:</p>
              <span className="text-[12px] leading-5 lg:text-[14px] lg:leading-6
                font-[300] text-textColor">{apiData?.timeSlots.startTime2}-{apiData?.timeSlots.endTime2}</span>
            </div>

            <BookingButton doctorData={apiData}/>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
