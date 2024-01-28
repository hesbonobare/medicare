import React,{useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import toast from "react-hot-toast";


const Experience = () => {

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
    
    setSelectedEndingDate(date)
  };

  const handleEndingDateChange2 = (date) => {
    
    setSelectedEndingDate2(date)
  };

  
  const formik=useFormik({
  
    initialValues:{
      experiences:[{position:'',hospital:'',selectedStartingDate:'',selectedEndingDate:""},
      {position2:'',hospital2:'',selectedStartingDate2:'',selectedEndingDate2:""}
    ]
  
  
    },
    enableReinitialize:true,
    validate:profileValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async values =>{
      values= await Object.assign(values)
      
      let updatePromise= updateDoctor(values)
      toast.promise(updatePromise,{
        loading:'Updating...',
        success:<b>Update Successifully</b>,
        error:<b>Could not update!</b>
      })
      console.log(values)
    }
    
  })


  return (
    
<div>
  <h1 className='mt-3'>Experience*</h1>
      <div className='flex w-[100%] mt-2'>
      <div className='w-1/2'>
      <h1 className='mb-1'>Starting Date*</h1>
      <DatePicker
        selected={selectedStartingDate}
        onChange={handleStartingDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
      />
    
    </div>

    <div className='w-1/2'>
      <h1 className='mb-1'>Ending Date*</h1>
      <DatePicker
        selected={selectedEndingDate}
        onChange={handleEndingDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
      />
    
    </div>
    </div>

    <div className='flex mt-3 w-full gap-5'>
      
     <div className='flex flex-col w-1/2'>
        <span  className='mb-1'>Position*</span>
        <input {...formik.getFieldProps('position')} placeholder='Position' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>

      <div className='flex flex-col w-1/2'>
        <span className='mb-1'>Hospital*</span>
        <input {...formik.getFieldProps('hospital')}  placeholder='Hospital' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>
    </div>

    <div className='flex w-[100%] mt-[50px]'>
      <div className='w-1/2'>
      <h1 className='mb-1'>Starting Date*</h1>
      <DatePicker
        selected={selectedStartingDate2}
        onChange={handleStartingDateChange2}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
      />
    
    </div>

    <div className='w-1/2'>
      <h1 className='mb-1'>Ending Date*</h1>
      <DatePicker
        selected={selectedEndingDate2}
        onChange={handleEndingDateChange2}
        dateFormat="MM/dd/yyyy"
        placeholderText="mm/dd/yyyy"
        className='border border-periwinkle p-2 outline-none rounded-sm'
      />
    
    </div>
    </div>

    <div className='flex mt-3 w-full gap-5'>
      
     <div className='flex flex-col w-1/2'>
        <span  className='mb-1'>Position*</span>
        <input {...formik.getFieldProps('position2')} placeholder='Position' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>

      <div className='flex flex-col w-1/2'>
        <span className='mb-1'>Hospital*</span>
        <input {...formik.getFieldProps('hospital2')} placeholder='Hospital' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>
    </div>
    </div>
    
    
  )
}

export default Experience;