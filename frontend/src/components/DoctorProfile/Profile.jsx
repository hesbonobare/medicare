import React, { useState } from "react";
import useFetch from "../../hooks/fetch.hook";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../helper/validate";
import { updateDoctor } from "../../helper/helper";
import convertToBase64 from "../../helper/convert";
import avator from "../../assets/images/profile.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Profile = () => {
  
    const [sliderValue, setSliderValue] = useState(50);
  
    const handleSliderChange = (e) => {
      setSliderValue(e.target.value);
    };


  //timeslots

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDay2, setSelectedDay2] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startTime2, setStartTime2] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endTime2, setEndTime2] = useState('');

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleDayChange2 = (event) => {
    setSelectedDay2(event.target.value);
  };


  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleStartTimeChange2 = (event) => {
    setStartTime2(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleEndTimeChange2 = (event) => {
    setEndTime2(event.target.value);
  };

//qualifications
const [qualificationStartingDate, setQualificationStartingDate] = useState(null);
const [qualificationStartingDate2, setQualificationStartingDate2] = useState(null);
const [qualificationEndingDate, setQualificationEndingDate] = useState(null);
const [qualificationEndingDate2, setQualificationEndingDate2] = useState(null);

const handleStartingDate = (date) => {
  setQualificationStartingDate(date);
  
};

const handleStartingDate2 = (date) => {
  setQualificationStartingDate2(date);
  
};

const handleEndingDate = (date) => {
  
  setQualificationEndingDate(date)
};

const handleEndingDate2 = (date) => {
  
  setQualificationEndingDate2(date)
};



  //experience
  const [selectedStartingDate, setSelectedStartingDate] = useState(null);
  const [selectedStartingDate2, setSelectedStartingDate2] = useState(null);
  const [selectedEndingDate, setSelectedEndingDate] = useState(null);
  const [selectedEndingDate2, setSelectedEndingDate2] = useState(null);

  const handleStartingDateChange = (date) => {
    setSelectedStartingDate(date);
  };

  const handleStartingDateChange2 = (date) => {
    setSelectedStartingDate2(date);
  };

  const handleEndingDateChange = (date) => {
    setSelectedEndingDate(date);
  };

  const handleEndingDateChange2 = (date) => {
    setSelectedEndingDate2(date);
  };

  const [showQualifications, setShowQualifications] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showTimeslots, setShowTimeslots] = useState(false);

  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };

  const [file, setFile] = useState();

  const [{ isLoading, apiData, serverError }] = useFetch();

  const [experienceData, setExperienceData] = useState([]);
  const [qualificationsData, setQualificationsData] = useState([]);
  const [timeslotsData, setTimeslotsData] = useState({});


  const formik = useFormik({
    initialValues: {
      name: apiData?.name || "",
      email: apiData?.email || "",
      phone: apiData?.phone || "",
      bio: apiData?.bio || "",
      ticketPrice: apiData?.ticketPrice || "",
      about: apiData?.about || ""
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
        
      values = {
        ...values,
        photo: file /*|| apiData?.photo || ""*/,
        gender: selectedGender,
        specialization: selectedSpecialization,
        experiences: experienceData,
        qualifications: qualificationsData,
        timeSlots: timeslotsData
      }

      let updatePromise = updateDoctor(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successifully</b>,
        error: <b>Could not update!</b>,
      });
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  //if(isLoading) return <h1 className='text-2xl font-bold'>LOADING</h1>
  //if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <span className='bg-ivory leading-10 p-2 text-justify rounded-[3px]'>To get approval please complete your profile.We'll review manually and approve within 3 days</span>
      <h1 className="font-bold mt-5">Profile Information</h1>
      <form className="py-1" onSubmit={formik.handleSubmit}>
        <div className=" flex flex-col items-left py-4">
          <div className="flex flex-col">
            <span>Name*</span>
            <input
              {...formik.getFieldProps("name")}
              type="text"
              className="textbox3"
              placeholder="Name*"
            />
          </div>

          <div className="flex flex-col">
            <span>Email*</span>
            <input
              {...formik.getFieldProps("email")}
              type="email"
              className="textbox3"
              placeholder="Email*"
            />
          </div>

          <div className="flex flex-col">
            <span>Phone*</span>
            <input
              {...formik.getFieldProps("phone")}
              type="number"
              className="textbox3"
              placeholder="Phone*"
            />
          </div>

          <div className="flex flex-col">
            <span>Bio*</span>
            <input
              {...formik.getFieldProps("bio")}
              type="text"
              className="textbox3"
              placeholder="Bio*"
            />
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-5">
            <div className="w-[80%] sm:w-1/3">
              <label htmlFor="gender" className="block mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={selectedGender}
                onChange={handleGenderChange}
                className="border border-periwinkle rounded p-2  w-full outline-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="w-[80%] sm:w-1/3">
              <label htmlFor="specialization" className="block mb-1">
                Specialization*
              </label>
              <select
                id="specialization"
                value={selectedSpecialization}
                onChange={handleSpecializationChange}
                className="border border-periwinkle rounded p-2 w-full outline-none"
              >
                <option value="">Select</option>
                <option value="surgeon">surgeon</option>
                <option value="neurologist">neurologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="dermatologist">Cardiologist</option>
                {/* Add more specialization options here */}
              </select>
            </div>

            <div className="w-[80%] sm:w-1/3">
              <span className="mb-1">Ticket Price</span>
              <input
                {...formik.getFieldProps("ticketPrice")}
                type="text"
                className="textbox3 mt-1 w-full"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <button
              type="button"
              onClick={() => setShowQualifications(!showQualifications)}
              className="flex align-left bg-black text-white w-[145px] p-1 pl-2 rounded-sm"
            >
              Add Qualification
            </button>
            {showQualifications && (
              <div >
                
                <div className="flex w-[100%] flex-col md:flex-row md:justify-between gap-5">
                  <div className="w-1/2">
                    <h1 className="mb-1 mt-7">Starting Date*</h1>
                    {/*<DatePicker
        selected={selectedStartingDate}
        onChange={handleStartingDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
          />*/}

                    <DatePicker
                      selected={qualificationStartingDate}
                      onChange={(date) => {
                        handleStartingDate(date); // Call your existing date change handler
                        setQualificationsData((prevData) => ({
                          ...prevData,
                          qualificationStartingDate: date, // Store the selected date in the formData object
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>

                  <div className="w-1/2">
                    <h1 className="mb-1">Ending Date*</h1>
                    {/* <DatePicker
        selected={selectedEndingDate}
        onChange={handleEndingDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
/>*/}

                    <DatePicker
                      selected={qualificationEndingDate}
                      onChange={(date) => {
                        handleEndingDate(date); // Call your existing date change handler
                        setQualificationsData((prevData) => ({
                          ...prevData,
                          qualificationEndingDate: date, // Store the selected date in the formData object
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="flex mt-3 w-full gap-5">
                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">Degree*</span>
                    {/* <input placeholder='Degree' 
        {...formik.getFieldProps('degree')}
         value={formik.values.degree}
         onChange={(e) => {
           formik.handleChange(e); // Call the formik change handler
           setQualificationsData((prevData) => ({
             ...prevData,
             degree: e.target.value, // Store the input value in the formData array
           }));
         }}
        className='border border-periwinkle p-2 outline-none rounded-sm'/>*/}

                    <input
                      {...formik.getFieldProps("degree")}
                      value={formik.values.degree}
                      onChange={(e) => {
                        formik.handleChange(e); // Call the formik change handler
                        setQualificationsData((prevData) => ({
                          ...prevData,
                          degree: e.target.value, // Store the input value in the formData array
                        }));
                      }}
                      placeholder="degree"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">University*</span>
                    {/*<input placeholder='University' className='border border-periwinkle p-2 outline-none rounded-sm'/>*/}

                    <input
                      {...formik.getFieldProps("university")}
                      value={formik.values.university}
                      onChange={(e) => {
                        formik.handleChange(e); // Call the formik change handler
                        setQualificationsData((prevData) => ({
                          ...prevData,
                          university: e.target.value, // Store the input value in the formData array
                        }));
                      }}
                      placeholder="University"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="flex  mt-[50px] flex-col md:flex-row md:justify-between gap-5">
                  <div className="w-1/2">
                    <h1 className="mb-1">Starting Date*</h1>
                    {/*<DatePicker
                      selected={selectedStartingDate2}
                      onChange={handleStartingDateChange2}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />*/}
                    <DatePicker
                      selected={qualificationStartingDate2}
                      onChange={(date) => {
                        handleStartingDate2(date); // Call your existing date change handler
                        setQualificationsData((prevData) => ({
                          ...prevData,
                          qualificationStartingDate2: date, // Store the selected date in the formData object
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>

                  <div className="w-1/2">
                    <h1 className="mb-1">Ending Date*</h1>
                    {/*<DatePicker
                      selected={selectedEndingDate2}
                      onChange={handleEndingDateChange2}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />*/}

                     <DatePicker
                      selected={qualificationEndingDate2}
                      onChange={(date) => {
                        handleEndingDate2(date); // Call your existing date change handler
                        setQualificationsData((prevData) => ({
                          ...prevData,
                          qualificationEndingDate2: date, // Store the selected date in the formData object
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />

                  </div>
                </div>

                <div className="flex mt-3 w-full gap-5">
                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">Degree*</span>
                    {/*<input
                      placeholder="Degree"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />*/}

<input
  {...formik.getFieldProps('degree2')}
  value={formik.values.degree2}
  onChange={(e) => {
    formik.handleChange(e); // Call the formik change handler
    setQualificationsData((prevData) => ({
      ...prevData,
      degree2: e.target.value, // Store the input value in the formData array
    }));
  }}
  placeholder='Degree'
  className='border border-periwinkle p-2 outline-none rounded-sm'
/>

                  </div>

                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">University*</span>
                   {/* <input
                      placeholder="University"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                   />*/}

<input
  {...formik.getFieldProps('university2')}
  value={formik.values.university2}
  onChange={(e) => {
    formik.handleChange(e); // Call the formik change handler
    setQualificationsData((prevData) => ({
      ...prevData,
      university2: e.target.value, // Store the input value in the formData array
    }));
  }}
  placeholder='University'
  className='border border-periwinkle p-2 outline-none rounded-sm'
/>

                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col mb-3">
            <button
              onClick={() => setShowExperience(!showExperience)}
              type="button"
              className="flex align-left bg-black text-white w-[135px] p-1 pl-2 rounded-sm"
            >
              Add Experience
            </button>
            {showExperience && (
              <div>
                <h1 className="mt-3">Experience*</h1>
                <div className="flex w-[100%] mt-2 flex-col md:flex-row md:justify-between gap-5">
                  <div className="w-1/2">
                    <h1 className="mb-1 w-full">Starting Date*</h1>
                    {/*<DatePicker
        selected={selectedStartingDate}
        onChange={handleStartingDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
      />*/}

                    <DatePicker
                      selected={selectedStartingDate}
                      onChange={(date) => {
                        handleStartingDateChange(date); // Call your existing date change handler if needed
                        setExperienceData((prevData) => ({
                          ...prevData,
                          selectedStartingDate: date, // Store the selected date in the formData array
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>

                  <div className="w-1/2">
                    <h1 className="mb-1">Ending Date*</h1>
                    {/*<DatePicker
        selected={selectedEndingDate}
        onChange={handleEndingDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
/>*/}

                    <DatePicker
                      selected={selectedEndingDate}
                      onChange={(date) => {
                        handleEndingDateChange(date); // Call your existing date change handler if needed
                        setExperienceData((prevData) => ({
                          ...prevData,
                          selectedEndingDate: date, // Store the selected date in the formData array
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="flex mt-3 w-full gap-5">
                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">Position*</span>
                    <input
                      {...formik.getFieldProps("position")}
                      value={formik.values.position}
                      onChange={(e) => {
                        formik.handleChange(e); // Call the formik change handler
                        setExperienceData((prevData) => ({
                          ...prevData,
                          position: e.target.value, // Store the input value in the formData array
                        }));
                      }}
                      placeholder="Position"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">Hospital*</span>
                    <input
                      {...formik.getFieldProps("hospital")}
                      value={formik.values.hospital}
                      onChange={(e) => {
                        formik.handleChange(e); // Call the formik change handler
                        setExperienceData((prevData) => ({
                          ...prevData,
                          hospital: e.target.value, // Store the input value in the formData array
                        }));
                      }}
                      placeholder="Hospital"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="flex w-[100%] mt-[50px] flex-col md:flex-row md:justify-between gap-5">
                  <div className="w-1/2">
                    <h1 className="mb-1">Starting Date*</h1>
                    {/* <DatePicker
        selected={selectedStartingDate2}
        onChange={handleStartingDateChange2}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
        />*/}

                    <DatePicker
                      selected={selectedStartingDate2}
                      onChange={(date) => {
                        handleStartingDateChange2(date); // Call your existing date change handler if needed
                        setExperienceData((prevData) => ({
                          ...prevData,
                          selectedStartingDate2: date, // Store the selected date in the formData array
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>

                  <div className="w-1/2">
                    <h1 className="mb-1">Ending Date*</h1>
                    {/*<DatePicker
        selected={selectedEndingDate2}
        onChange={handleEndingDateChange2}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
/>*/}

                    <DatePicker
                      selected={selectedEndingDate2}
                      onChange={(date) => {
                        handleEndingDateChange2(date); // Call your existing date change handler if needed
                        setExperienceData((prevData) => ({
                          ...prevData,
                          selectedEndingDate2: date, // Store the selected date in the formData array
                        }));
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>
                </div>

                <div className="flex mt-3 w-full gap-5">
                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">Position*</span>
                    <input
                      {...formik.getFieldProps("position2")}
                      value={formik.values.position2}
                      onChange={(e) => {
                        formik.handleChange(e); // Call the formik change handler
                        setExperienceData((prevData) => ({
                          ...prevData,
                          position2: e.target.value, // Store the input value in the formData array
                        }));
                      }}
                      placeholder="Position"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <span className="mb-1">Hospital*</span>
                    <input
                      {...formik.getFieldProps("hospital2")}
                      value={formik.values.hospital2}
                      onChange={(e) => {
                        formik.handleChange(e); // Call the formik change handler
                        setExperienceData((prevData) => ({
                          ...prevData,
                          hospital2: e.target.value, // Store the input value in the formData array
                        }));
                      }}
                      placeholder="Hospital"
                      className="border border-periwinkle p-2 outline-none rounded-sm"
                    />
                  </div>
                </div>
              </div>


//
            )}
          </div>

          <div className="flex flex-col mb-3">
            <button
              onClick={() => setShowTimeslots(!showTimeslots)}
              type="button"
              className="flex align-left bg-black text-white w-[110px] p-1 rounded-sm"
            >
              Add Timeslot
            </button>
            {showTimeslots && (
              <div className=" overflow-x-auto min-w-[450] h-[100%]">
              <div className='flex mt-3 gap-5'>
                
                <div className='flex flex-col'>
                  <label>Day* </label>
                 {/* <select value={selectedDay} onChange={handleDayChange} className='border border-periwinkle p-2 outline-none rounded-sm'>
                    <option value="Monday">Monday</option>
                    overflow-x-auto min-w-[450] h-[100%]
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
            </select>*/}

                  <select
  value={selectedDay}
  onChange={(e) => {
    const selectedDay = e.target.value;
    setTimeslotsData((prevData) => ({
      ...prevData,
      selectedDay: selectedDay, // Store the selected day in the formData object
    }));
    // Update the selectedDay state if needed
    setSelectedDay(selectedDay);
  }}
  className='border border-periwinkle p-2 outline-none rounded-sm'
>
  <option value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
  <option value="Saturday">Saturday</option>
  <option value="Sunday">Sunday</option>
</select>

                </div>
                <div className='flex flex-col'>
                  <label>Starting Time* </label>
                 {/*<input type="time" value={startTime} onChange={handleStartTimeChange} className='border border-periwinkle p-2 outline-none rounded-sm'/>*/} 
                
                 <input
  type="time"
 
  {...formik.getFieldProps("startTime")}
  value={formik.values.startTime}
  onChange={(e) => {
    formik.handleChange(e); // Call the formik change handler
    setTimeslotsData((prevData) => ({
      ...prevData,
      startTime: e.target.value, // Store the input value in the formData array
    }));
  }}
  className='border border-periwinkle p-2 outline-none rounded-sm'
/>

                </div>
                <div className='flex flex-col '>
                  <label>Ending Time*</label>
                  {/*<input type="time" value={endTime} onChange={handleEndTimeChange} className='border border-periwinkle p-2 outline-none rounded-sm' />
                */}
                  <input
  type="time"
  
  {...formik.getFieldProps("endTime")}
  value={formik.values.endTime}
  onChange={(e) => {
    formik.handleChange(e); // Call the formik change handler
    setTimeslotsData((prevData) => ({
      ...prevData,
      endTime: e.target.value, // Store the input value in the formData array
    }));
  }}
  className='border border-periwinkle p-2 outline-none rounded-sm'
/>

                </div>
                
              </div>
          
          <div className='flex mt-3 gap-5 '>
                
          <div className='flex flex-col '>
            <label>Day* </label>
           {/* <select value={selectedDay2} onChange={handleDayChange2} className='border border-periwinkle p-2 outline-none rounded-sm'>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
</select>*/}

<select
  value={selectedDay2}
  onChange={(e) => {
    const selectedDay2 = e.target.value;
    setTimeslotsData((prevData) => ({
      ...prevData,
      selectedDay2: selectedDay2, // Store the selected day in the formData object
    }));
    // Update the selectedDay state if needed
    setSelectedDay2(selectedDay2);
  }}
  className='border border-periwinkle p-2 outline-none rounded-sm'
>
  <option value="Monday">Monday</option>
  <option value="Tuesday">Tuesday</option>
  <option value="Wednesday">Wednesday</option>
  <option value="Thursday">Thursday</option>
  <option value="Friday">Friday</option>
  <option value="Saturday">Saturday</option>
  <option value="Sunday">Sunday</option>
</select>

          </div>
          <div className='flex flex-col'>
            <label>Starting Time* </label>
            {/*<input type="time" value={startTime2} onChange={handleStartTimeChange2} className='border border-periwinkle p-2 outline-none rounded-sm'/>
            */}<input
  type="time"
 
  {...formik.getFieldProps("startTime2")}
  value={formik.values.startTime2}
  onChange={(e) => {
    formik.handleChange(e); // Call the formik change handler
    setTimeslotsData((prevData) => ({
      ...prevData,
      startTime2: e.target.value, // Store the input value in the formData array
    }));
  }}
  className='border border-periwinkle p-2 outline-none rounded-sm'
/>

          </div>
          <div className='flex flex-col '>
            <label>Ending Time*</label>
           {/*} <input type="time" value={endTime2} onChange={handleEndTimeChange2} className='border border-periwinkle p-2 outline-none rounded-sm' />
            */}
            <input
  type="time"
  
  {...formik.getFieldProps("endTime2")}
  value={formik.values.endTime2}
  onChange={(e) => {
    formik.handleChange(e); // Call the formik change handler
    setTimeslotsData((prevData) => ({
      ...prevData,
      endTime2: e.target.value, // Store the input value in the formData array
    }));
  }}
  className='border border-periwinkle p-2 outline-none rounded-sm'
/>

          </div>
          
          </div>
          
          
          </div>  
            )}
          </div>

          <div className="flex flex-col relative">
            <span>About*</span>
           
            <textarea 
            rows="4" cols="50"
             className=" border border-periwinkle h-[110px] rounded-sm p-2 " 
             placeholder='Write about you' 
             {...formik.getFieldProps("about")}
             >
    
      </textarea>
          </div>

          <div className="flex items-center mt-3">
            <label htmlFor="photo">
              <img
                src={apiData?.photo || file || avator}
                className="profile_img"
                alt=""
              />
            </label>

            <input
              onChange={onUpload}
              type="file"
              className="inputFile"
              id="photo"
              name="photo"
            />
            <span className="bg-card p-2 ml-2 rounded-[4px]">Upload Photo</span>
          </div>

          <button
            type="submit"
            className="w-[100%] mt-4 bg-primaryColor  px-1 py-3 rounded-lg text-gray-50 text-l shadow-sm
              "
          >
            Update Profile
          </button>
        </div>
       
      </form>
     
    </div>
  );
};

export default Profile;
