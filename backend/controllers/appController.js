import UserModel from '../models/UserSchema.js';
import BookingModel from '../models/BookingSchema.js';
import DoctorModel from '../models/DoctorSchema.js';
import bcrypt from 'bcrypt';
import Jwt  from 'jsonwebtoken';
import ENV from "../config.js";
import otpGenerator from "otp-generator";
import Stripe from 'stripe';
import cloudinary from '../utils/cloudinary.js';
import nodemailer from 'nodemailer';


//console.log(ENV.JWT_SECRET)
/**middleware for verify user */
export async function verifyUser(req,res,next){
    try {
        const {username} =req.method == "GET" ? req.query : req.body;

        //check the user existence
        let exist=await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error:"Can't find user"});
        next();
    } catch (error) {
        return res.status(404).send({error:"Authentication Error"})
    }
}

/**POST: http://localhost:8080/api/register 
 * @param : {
 * "username":"example123",
 * "password":"admin123",
 * "email":"example@gmail.com",
 * "firstName":"bill",
 * "lastname":"wiliiam",
 * "mobile":4747447474,
 * "address":"Apt. 556, Kulas Light",
 * "profile":""
 * }
*/

/*export async function register(req,res){
    try {
        const {username,password,profile,email,role}=req.body;

        //confirm data
        if(!username || !password || !email || !role){
            return res.status(400).json({message:'All fields required'})
        }

        
        //check the existing user
        const existUsername=new Promise((resolve,reject)=>{
            UserModel.findOne({username}, function(err,user){
                if(err) reject(new Error(err))
                if(user) reject({error:"Please user a unique username"});

                resolve();
            })
        });

        //check for existing email
        const existEmail=new Promise((resolve,reject)=>{
            UserModel.findOne({email}, function(err,email){
                if(err) reject(new Error(err))
                if(email) reject({error:"Please user a unique email"});

                resolve();
            })
        });

        Promise.all([existUsername, existEmail])
        .then(()=>{
            if(password){
                bcrypt.hash(password,10)
                .then(
                    hashedPassword=>{
                        const user=new UserModel({
                            username,
                            password:hashedPassword,
                            profile:profile || '',
                            email,
                            role
                           
                        })
                        //return save result as a response
                        user.save()
                        .then(result=>res.status(201).send({msg:'User registered sucessifully'}))
                        .catch(error=>res.status(500).send({error}))
                    }
                ).catch(
                    error=>{
                        return res.status(500).send({
                            error:"Enable to hashed password"
                        })
                    }
                )
            }
                  
              }).catch(
            error=>{
                return res.status(500).send({error})
            })
    
    
    }catch (error) {
        return res.status(500).send(error);
    }
}*/

export async function register(req, res) {
  
    try {
        const { username, password, profile, email, role } = req.body;

        // Confirm data
        if (!username || !password || !email || !role ||!profile) {
            return res.status(400).json( 'All fields required');
        }

        // Check the existing user by username
        const existingUsername = await UserModel.findOne({ username }).exec();

        if (existingUsername) {

            return res.status(400).json( 'Please use a unique username');
        }

        // Check for existing email
        const existingEmail = await UserModel.findOne({ email }).exec();

        if (existingEmail) {
            return res.status(400).json( 'Please use a unique email' );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email,
            role
        });

        // Save the user to the "users" collection
        await newUser.save();

        // If the user specified their role as a doctor, create a doctor document in the "doctors" collection
        if (role === 'doctor') {

            const uploadRes=await cloudinary.uploader.upload(profile,{
                upload_preset:"medicare"
            })

            /*if(uploadRes){
               /* const newDoctor = new DoctorModel({
                    userId: newUser._id, // Reference to the user in the "users" collection
                    email,
                    username,
                    role ,
                    photo:uploadRes,
                    password: hashedPassword,// Add doctor-specific fields here
                });
    
                await newDoctor.save();*/
                 const newDoctor = new DoctorModel({
                userId: newUser._id, // Reference to the user in the "users" collection
                email,
                username,
                role ,
                name:username ||'',
                photo:uploadRes ||'',
                password: hashedPassword,// Add doctor-specific fields here
            });

            await newDoctor.save();
            }
        return res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Registration failed' });
    }
}

/*export async function register(req, res) {
    try {
        const { username, password, profile, email, role } = req.body;

        // Check existing username
        const existUsername = UserModel.findOne({ username }).exec();

        // Check existing email
        const existEmail = UserModel.findOne({ email }).exec();

        Promise.all([existUsername, existEmail])
            .then(([existingUsername, existingEmail]) => {
                if (existingUsername) {
                    return res.status(400).json({ error: "Please use a unique username" });
                }

                if (existingEmail) {
                    return res.status(400).json({ error: "Please use a unique email" });
                }

                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            if (role === "doctor") {
                                const newDoctor = new DoctorModel({
                                    username,
                                    password: hashedPassword,
                                    profile: profile || "",
                                    email,
                                    role
                                    // Add additional doctor-specific fields here
                                });

                                newDoctor.save()
                                    .then(doctorResult => {
                                        const newUser = new UserModel({
                                            username,
                                            password: hashedPassword,
                                            profile: profile || "",
                                            email,
                                            role,
                                            doctorId: doctorResult._id // Store the doctor's _id in the user document
                                        });

                                        newUser.save()
                                            .then(userResult => {
                                                res.status(201).send({ msg: 'User registered successfully' });
                                            })
                                            .catch(userError => {
                                                res.status(500).send({ error: userError });
                                            });
                                    })
                                    .catch(doctorError => {
                                        res.status(500).send({ error: doctorError });
                                    });
                            } else {
                                const newUser = new UserModel({
                                    username,
                                    password: hashedPassword,
                                    profile: profile || "",
                                    email,
                                    role
                                });

                                newUser.save()
                                    .then(result => {
                                        res.status(201).send({ msg: 'User registered successfully' });
                                    })
                                    .catch(error => {
                                        res.status(500).send({ error });
                                    });
                            }
                        })
                        .catch(error => {
                            return res.status(500).send({
                                error: "Unable to hash password"
                            });
                        });
                }
            })
            .catch(error => {
                return res.status(500).send({ error });
            });
    } catch (error) {
        return res.status(500).send(error);
    }
}*/

/*export async function register(req, res) {
    try {
        const { username, password, profile, email, role } = req.body;

        // Check existing username
        const existUsername = UserModel.findOne({ username }).exec();

        // Check existing email
        const existEmail = UserModel.findOne({ email }).exec();

        Promise.all([existUsername, existEmail])
            .then(([existingUsername, existingEmail]) => {
                if (existingUsername) {
                    return res.status(400).json({ error: "Please use a unique username" });
                }

                if (existingEmail) {
                    return res.status(400).json({ error: "Please use a unique email" });
                }

                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            if (role === "doctor") {
                                const newDoctor = new DoctorModel({
                                    username,
                                    password: hashedPassword,
                                    profile: profile || "",
                                    email,
                                    role
                                    // Add additional doctor-specific fields here
                                });

                                newDoctor.save()
                                    .then(doctorResult => {
                                        res.status(201).send({ msg: 'User registered successfully' });
                                    })
                                    .catch(doctorError => {
                                        res.status(500).send({ error: doctorError });
                                    });
                            } else {
                                const newUser = new UserModel({
                                    username,
                                    password: hashedPassword,
                                    profile: profile || "",
                                    email,
                                    role
                                });

                                newUser.save()
                                    .then(result => {
                                        res.status(201).send({ msg: 'User registered successfully' });
                                    })
                                    .catch(error => {
                                        res.status(500).send({ error });
                                    });
                            }
                        })
                        .catch(error => {
                            return res.status(500).send({
                                error: "Unable to hash password"
                            });
                        });
                }
            })
            .catch(error => {
                return res.status(500).send({ error });
            });
    } catch (error) {
        return res.status(500).send(error);
    }
}*/




/**POST:http://localhost:8080/api/login
 * @param :{
 * "username":"example123",
 * "password":"admin123"
 * }
 */
/*export async function login(req,res){
    const {username,password}=req.body;

    try {
        UserModel.findOne({username})
        .then(
            user=>{
                bcrypt.compare(password,user.password)
                .then(
                    passwordCheck=>{
                        if(!passwordCheck){
                            return res.status(400).send({error:"Don't have password"})
                        }
                        //create jwt token
                         const token=Jwt.sign({
                            userId:user._id,
                            username:user.username
                        },"ENV.JWT_SECRET",{expiresIn:"24h"})

                        return res.status(200).send({
                            msg:"Login Successfull..!",
                            username:user.username,
                            token
                        })
                    }
                )
                .catch(
                    error=>{
                        return res.status(400).send({error:"Password does not Match"})
                    }
                )
            }
        )
        .catch(error=>{
            return res.status(404).send({error:"Username not Found"})
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}*/

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        UserModel.findOne({ username })
            .then(user => {
                if (!user) {
                    return res.status(404).send({ error: "Username not found" });
                }

                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) {
                            return res.status(400).send({ error});
                        }

                        // Create a JWT token with the user's information
                        const token = Jwt.sign({
                            userId: user._id,
                            username: user.username,
                            role: user.role // Include the user's role in the token
                        }, "ENV.JWT_SECRET", { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login Successful",
                            username: user.username,
                            role: user.role, // Include the user's role in the response
                            token
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not match" });
                    });
            })
            .catch(error => {
                return res.status(500).send({ error });
            });
    } catch (error) {
        return res.status(500).send({ error });
    }
}




/**GET: http://localhost:8080/api/user/example123 */
export async function getUser(req,res){
    const {username} = req.params
    //console.log(req.query.type)
    console.log(req.url)

    try {
        if(!username) return res.status(501).send({error:"Invalid Username"})

        UserModel.findOne({username},function(err,user){
            if(err) return res.status(500).send({err})
            if(!user) return res.status(501).send({error:"Couldn't find the user"})

            //REMOVE PASSWORD FROM THE USER
            //MONGOOSE RETURN UNNECESSARY DATA WITH OBJECT SO CONVERT IT JSON
            const {password,...rest}=Object.assign({},user.toJSON());
            return res.status(201).send(rest)
        })
    } catch (error) {
        return res.status(404).send({error:"Cannot find user data"});
    }
}

/**GET: http://localhost:8080/api/doctor/example123 */
export async function getDoctor(req,res){
    const {username} = req.params

    try {
        if(!username) return res.status(501).send({error:"Invalid Username"})

        DoctorModel.findOne({username},function(err,doctor){
            if(err) return res.status(500).send({err})
            if(!doctor) return res.status(501).send({error:"Couldn't find the doctor"})

            //REMOVE PASSWORD FROM THE USER
            //MONGOOSE RETURN UNNECESSARY DATA WITH OBJECT SO CONVERT IT JSON
            const {password,...rest}=Object.assign({},doctor.toJSON());
            return res.status(201).send(rest)
        })
    } catch (error) {
        return res.status(404).send({error:"Cannot find doctor data"});
    }
}

/**PUT:  http://localhost:8080/api/updateuser
 * @param: {
 * "id":"<userid>"
 * }
 * body:{
 * firstName:'',
 * address:'',
 * profile:'',
 * }
 */
export async function updateUser(req,res){
    try {
        
        //const id=req.query.id;
        const{userId}=req.user;

        if(userId){
            const body=req.body;
            //update the data
            UserModel.updateOne({_id:userId},body,function(err,data){
                if(err) throw err;
                return res.status(201).send({msg:"Record Updated..!"})
            })
        }else{
            return res.status(401).send({error:"User not found..!"})
        }
    } catch (error) {
        return res.status(401).send({error});
    }
}
//update doctor
export async function updateDoctor(req,res){
    
    const {photo,...rest}=req.body
    //const id=req.query.id;
    const{userId}=req.user;
    console.log(req.body)
    console.log(rest)
    try {
        if(photo){
            const uploadRes=await cloudinary.uploader.upload(photo,{
                upload_preset:"medicare"
            })

            if(userId &&uploadRes){
                const body=req.body;
                //update the data
                DoctorModel.updateOne({userId:userId},{...rest,photo:uploadRes},function(err,data){
                    if(err) throw err;
                    return res.status(201).send({msg:"Record Updated..!"})
                })
            }

        }else{
            return res.status(401).send({error:"User not found..!"})
        }
    } catch (error) {
        return res.status(401).send({error});
    }
}

/**GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP=otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    res.status(201).send({code:req.app.locals.OTP})
}

/**GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const {code}=req.query;
    if(parseInt(req.app.locals.OTP)===parseInt(code)){
        req.app.locals.OTP=null;//reset OTP VALUE
        req.app.locals.resetSession=true;//START SESSION FOR RESET PASSWORD
        return res.status(201).send({msg:"Verify Successifully"})
    }
    return res.status(400).send({error:"Invalid OTP"})
}



//sucessifully redirect user when OTP IS VALID
/**GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
       //allow access to this route only once
        return res.status(201).send({flag: req.app.locals.resetSession})
    }
    return res.status(440).send({error:"Session expired!"})
}


//sucessifully redirect user when OTP IS VALID
/**PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error:"Session expired!"}) 
        const {username,password}=req.body
        try {
            UserModel.findOne({username})
            .then(user=>{
                bcrypt.hash(password,10)
                .then(hashedPassword=>{
                    UserModel.updateOne({username:user.username},{password:hashedPassword},function(err,data){
                        if(err) throw err;
                        req.app.locals.resetSession=false;
                        return res.status(201).send({msg:"Record Updated..!"})
                    })
                })
                .catch(e=>{
                    return res.status(500).send({error:"Unable to hash password"})
                })
            })
            .catch(error=>{
                return res.status(404).send({error:"Username not found"})
            })
        } catch (error) {
            return res.status(500).send({error})
        }
    } catch (error) {
        return res.status(401).send({error})
    }
}


//get doctors
export async function getDoctors(req, res) {
    try {
      const doctors = await DoctorModel.find({});
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // This is your test secret API key.
//const stripe = require('stripe')('sk_test_51NWD6hCN2JZPqomStFV9wbwGmS6NlJp6UlCxPazfLtqSQntSiEY4jGts9LNCZyVbmVo8ovkz6EKwKLLtx7hS6rTm00bojVkDQQ');
//import('dotenv').config();


const stripe = Stripe(ENV.STRIPE_KEY)
//console.log(stripe)


export async function implementStripe (req, res) {
  //  console.log(req.body)
    const doctor=req.body.doctorData
    const {photo,qualifications,experiences,reviews,timeSlots,bio,about,appointments, ...rest } = doctor
    const{hospital}=experiences;

   // console.log(hospital)
    console.log(rest)
   const id=req.body.userId

   // console.log(id)
   const customer=await stripe.customers.create({
    metadata:{
        userId:req.body.userId,
       data:JSON.stringify(rest),
      photo:doctor.photo.url,
      hospital:hospital
      
    }
   })
   
  const session = await stripe.checkout.sessions.create({
    customer:customer.id,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data:{
            currency:"kes",
            product_data:{
                name:doctor.name,
                description:doctor.specialization,
               images:[doctor.photo.url],
               metadata:{
                id:id
               }
            },
            unit_amount:doctor.ticketPrice*100
        },
        quantity: 1,
      },
      
    ],
    mode: 'payment',
    success_url: `${ENV.CLIENT_URL}/checkout-success`,
    cancel_url:  `${ENV.CLIENT_URL}/doctor/${req.body.doctorData.username}`,
  });

  res.send({url:session.url});
}

//Create Booking
const createBooking = async(customer,data)=>{
const items=JSON.parse(customer.metadata.data)

 const newBooking=new BookingModel({
    userId:customer.metadata.userId,
    photo:customer.metadata.photo,
    hospitall:customer.metadata.hospital,
    doctorId:items._id,
    doctorData:items,
    paymentIntentId:data.payment_intent,
    payment_status:data.payment_status,
    ticketPrice:data.amount_total
 })

 try {
     const savedBooking=await newBooking.save()  
   //  console.log("Processed Order:",savedBooking) 
 } catch (error) {
     console.log(error)
 }
}

//create appointment
const createAppointment = async (customer, data) => {
    try {
      // Assuming `customer.metadata.userId` is the user's ID
      const user = await UserModel.findById(customer.metadata.userId);

      const items=JSON.parse(customer.metadata.data)
      const doctorUsername=items.username
      console.log(items.username)
      console.log(doctorUsername)
      if (!user) {
        throw new Error('User not found');
      }
  
      const newAppointment ={
      //  userId: customer.metadata.userId,
        photo: user.profile, 
        name:user.username, 
        email:user.email,
        gender:user.gender,
        paymentStatus: data.payment_status,
        price: data.amount_total,
        appointmentDate: new Date(),
      };
  
      const doctor = await DoctorModel.findOne({ username: doctorUsername });

      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Step 4: Add the booking to the doctor's appointments
      doctor.appointments.push(newAppointment);
  
      // Step 5: Save the doctor (with the new booking) to the database
      await doctor.save();
   //   console.log("savedAppointment:",newAppointment) 
     // return res.status(201).json({ message: 'Appointment created successfully', newBooking });
    } catch (error) {
      console.error(error);
      //return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  
//webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret; 
//endpointSecret= "whsec_51459c08b74d462bd386c3dfffdb8e61e9919080ef899d0fcb37796af48405e6";

export async function stripeWebhook (request, response) {
  const sig = request.headers['stripe-signature'];

  let data;
  let eventType;

  if(endpointSecret){
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log('webhook verified')
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data=event.data.object;
    eventType=event.type
  
  }else{
    data=request.body.data.object;
    eventType=request.body.type
  }
 
  // Handle the event
  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then((customer)=>{
      //  console.log("customer:",customer)
      // console.log("data",data)
       createBooking(customer,data)
       createAppointment(customer,data)
    })
    .catch((err)=>console.log(err.message))
  }
 
  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
}

//retrieve bookings from the booking collection
export async function getBookings (req, res) {
    const userId=req.params.userId;
  // console.log(userId)
  //  console.log(req)
    try {
      const userBookings = await BookingModel.find({ userId: userId }) // Retrieve bookings for the logged-in user
   //  console.log(userBookings)
      res.json(userBookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

//
export async function getDoctorAppointments(req,res){
  // Assuming you have the logged-in doctor's username available
//const username = req.user.username // Example: Replace this with how you retrieve the doctor's username
const username=req.params.username;
console.log(username)
// Step 1: Find the doctor by their username
DoctorModel.findOne({ username }, (err, doctor) => {
  if (err) {
    // Handle error
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  if (!doctor) {
    // Doctor not found
    return res.status(404).json({ message: 'Doctor not found' });
  }

  // Step 2: Retrieve the doctor's appointments
  const appointments = doctor.appointments;

  return res.status(200).json( appointments );
});

}