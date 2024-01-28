import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from '../config.js';


// https://ethereal.email/create
//let nodeConfig={
    /*host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'ENV.EMAIL',
      pass: 'ENV.PASSWORD'}*/

   //   host: 'smtp.ethereal.email',
  //  port: 587,
//    auth: {
   //     user: 'annie.moore24@ethereal.email',
     //   pass: 'ARFhEBF9ZMsZsJGZP2'}
    

  //   console.log(ENV.EMAIL)
let config={
    service:'gmail',
    auth:{
        user:ENV.EMAIL,
        pass:ENV.PASSWORD
    }
}

let transporter=nodemailer.createTransport(config)
//let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator=new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:"https://mailgen.js/"
    }
})

/**POST:http://localhost:8080/api/registerMail
 * @param :{
 * "username":"example123",
 * "userEmail":"admin123",
 * "text":"",
 * "subject":""
 * }
 */
export const registerMail=async(req,res)=>{
    const{username,userEmail,text,subject}=req.body;

    //body of the email
    var email ={
        body:{
            name:username,
            intro:text || 'Welcome!We are very excited to have you on board',
            outro:'Need help,or have questions?Just reply to this email,we would love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message={
        from:ENV.EMAIL,
        to:userEmail,
        subject:subject || "Signup Successful",
        html:emailBody
    }

    //send mail
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg:"You should receive an email from us"})
    })
    .catch(error=>res.status(500).send({error}))
}