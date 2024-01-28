import React,{useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Qualifications = () => {

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


  return (
    
<div>
  <h1 className='mt-3'>Qualifications*</h1>
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
        <span  className='mb-1'>Degree*</span>
        <input placeholder='Degree' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>

      <div className='flex flex-col w-1/2'>
        <span className='mb-1'>University*</span>
        <input placeholder='University' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>
    </div>

    <div className='flex  mt-[50px]'>
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
        <span  className='mb-1'>Degree*</span>
        <input placeholder='Degree' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>

      <div className='flex flex-col w-1/2'>
        <span className='mb-1'>University*</span>
        <input placeholder='University' className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>
    </div>
    </div>
    
    
  )
}

export default Qualifications;