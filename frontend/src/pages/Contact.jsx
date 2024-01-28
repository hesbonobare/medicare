import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Contact = () => {
  const form = useRef();
  const serviceId=import.meta.env.VITE_YOUR_SERVICE_ID
 // console.log(serviceId)
  const templateId=import.meta.env.VITE_YOUR_TEMPLATE_ID
 // console.log(templateId)
  const publicKey=import.meta.env.VITE_YOUR_PUBLIC_KEY
 // console.log(publicKey)

  const sendEmail = (e) => {
    e.preventDefault();

emailjs.sendForm(serviceId,templateId, form.current, publicKey)
      .then((result) => {
        e.target.reset();
         // console.log(result.text);
         // console.log('message sent')

          toast.success('Message sent successfully!', {
            position: toast.POSITION.TOP_CENTER
            
          });
      }, (error) => {
          console.log(error.text);
           // Show error toast
        toast.error('Error sending message. Please try again later.', {
          position: toast.POSITION.TOP_CENTER
        });
       
      });
  };

 
  return (
    <section>
      <div className="container">
        <div className='flex flex-col justify-center items-center'>
      <h1 className="text-[18px] leading-[30px] lg:text-[29px] lg:leading-9 text-headingColor font-[700]
            mt-5 lg:mt-8">Contact Us</h1>
      <p className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 mt-3 font-[400] text-textColor'>Got a technical issue?Want to send feedback about a better feature? Let us know</p>
       
       <form ref={form} onSubmit={sendEmail} className='w-full md:w-[60%] mt-10 '>

       <div className='flex flex-col'>
      <label>Your email</label>
      <input type="email" name="from_name" className='textbox3' placeholder='example@gmailcom' />
      </div>

      <div className='flex flex-col'>
      <label>Your message</label>
      <textarea rows="4" cols="50" className='textbox3' placeholder='Leave a comment' name='message'>
      
      </textarea>
      </div> 

      

      <button type="submit" value='Send' className='w-[170px] mt-4 bg-primaryColor  px-2 lg:px-4 py-3 rounded-lg text-gray-50 text-l shadow-sm
      '>Send Message</button>
    </form>
        </div>
      </div>
    </section>
  )
}

export default Contact;