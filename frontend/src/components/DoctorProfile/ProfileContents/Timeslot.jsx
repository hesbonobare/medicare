import React, { useState } from 'react';

const Timeslot = () => {
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

  return (
    <div>
    <div className='flex mt-3 gap-7 '>
      
      <div className='flex flex-col w-1/3'>
        <label>Day* </label>
        <select value={selectedDay} onChange={handleDayChange} className='border border-periwinkle p-2 outline-none rounded-sm'>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div className='flex flex-col w-1/3'>
        <label>Starting Time* </label>
        <input type="time" value={startTime} onChange={handleStartTimeChange} className='border border-periwinkle p-2 outline-none rounded-sm'/>
      </div>
      <div className='flex flex-col w-1/3'>
        <label>Ending Time*</label>
        <input type="time" value={endTime} onChange={handleEndTimeChange} className='border border-periwinkle p-2 outline-none rounded-sm' />
      </div>
      
    </div>

<div className='flex mt-3 gap-7 '>
      
<div className='flex flex-col w-1/3'>
  <label>Day* </label>
  <select value={selectedDay2} onChange={handleDayChange2} className='border border-periwinkle p-2 outline-none rounded-sm'>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
  </select>
</div>
<div className='flex flex-col w-1/3'>
  <label>Starting Time* </label>
  <input type="time" value={startTime2} onChange={handleStartTimeChange2} className='border border-periwinkle p-2 outline-none rounded-sm'/>
</div>
<div className='flex flex-col w-1/3'>
  <label>Ending Time*</label>
  <input type="time" value={endTime2} onChange={handleEndTimeChange2} className='border border-periwinkle p-2 outline-none rounded-sm' />
</div>

</div>


</div>  
  );
};

export default Timeslot;
