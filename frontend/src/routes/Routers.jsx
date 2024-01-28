import React from 'react';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorsDetails from '../pages/Doctors/DoctorsDetails';
import UserProfile from '../components/UserProfile/UserProfile';


//auth middleware
import {AuthorizeUser,ProtectRoute,ProtectRoutee} from "../../middleware/auth.jsx";

import Username from '../components/Logincomponents/Username';
import Password from '../components/Logincomponents/Password';
import Register from '../components/Logincomponents/Register';
import Profile from '../components/Logincomponents/Profile';
import Recovery from '../components/Logincomponents/Recovery';
import Reset from '../components/Logincomponents/Reset';
import PageNotFound from '../components/Logincomponents/PageNotFound';



import {Routes,Route} from 'react-router-dom';
import DoctorProfile from '../components/DoctorProfile/DoctorProfile';
import Profilee from '../components/DoctorProfile/Profile';
import DoctorDetails from '../components/DoctorDetails/DoctorDetails';
import BookingSuccess from '../components/BookingResult/BookingSuccess';

function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/docprofile' element={<Profilee/>}/>
        <Route path='/doctors/:id' element={<ProtectRoutee ><DoctorsDetails/></ProtectRoutee>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/Services' element={<Services/>}/>
        <Route path='/userprofile' element={<AuthorizeUser><UserProfile/> </AuthorizeUser>}/>
        <Route path='/doctorprofile' element={<AuthorizeUser><DoctorProfile/></AuthorizeUser>}/>
        <Route path='/doctor/:username' element={<ProtectRoutee ><DoctorDetails /></ProtectRoutee>} />
        <Route path='/checkout-success' element={<BookingSuccess/>}/>
        
        

        <Route path='/username' element={< Username/>}/>
        <Route path='/password' element={<ProtectRoute>< Password/></ProtectRoute>}/>
        <Route path='/profile' element={< Profile/>}/>
        <Route path='/password/recovery' element={< Recovery/>}/>
        <Route path='/reset' element={< Reset/>}/>
        <Route path='*' element={< PageNotFound/>}/>
        <Route path='username/register' element={<Register/>}/>
        
        

    </Routes>
  )
}

export default Routers