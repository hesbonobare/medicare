import {Router} from "express";
import express from "express";
const router = Router();
/**import all controllers */
import * as controller from '../controllers/appController.js';
import Auth,{localVariables} from '../middleware/auth.js';
import  {registerMail} from "../controllers/mailer.js";



/**POST METHODS */
router.route('/register').post(controller.register);//register user
router.route('/registerMail').post(registerMail);//send the mail
router.route('/authenticate').post(controller.verifyUser,(req,res)=>res.end());//authenticate user
router.route('/login').post(controller.verifyUser,controller.login);//login app
router.route('/create-checkout-session').post(controller.implementStripe)
router.route('/webhook').post( express.raw({type: 'application/json'}),controller.stripeWebhook)




/**GET METHODS */
router.route('/user/:username').get(controller.getUser)//user with username
router.route('/doctor/:username').get(controller.getDoctor)
router.route('/generateOTP').get(controller.verifyUser,localVariables,controller.generateOTP)//generate random OTP
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)//VERIFY generated OTP
router.route('/createResetSession').get(controller.createResetSession)//reset all the variables
router.route('/doctors').get(controller.getDoctors)
router.route('/bookings/:userId').get(controller.getBookings)
router.route('/doctor/appointments/:username').get(controller.getDoctorAppointments)


/**PUT METHODS */
router.route('/updateuser').put(Auth,controller.updateUser);//is use to update the user profile
router.route('/updatedoctor').put(Auth,controller.updateDoctor);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);//use to reset password


export default router;