import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Layout() {
  return (
  <>
 
  <Header/>
    <main>
    <ToastContainer />
        <Routers/>
    </main>
   <Footer/>
  
  </>
    
  )
}

export default Layout