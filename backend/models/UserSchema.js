import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  /*userID:{type:String,unique:true,required:true},
  isDoctor:Boolean,
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the Doctor model
},*/

  username :{
    type:String,
    required:[true,"Please provide unique Username"],
    unique:[true,"Username exists"]
  },
  password: { 
    type: String, 
    required:[true, "Please provide a password"],
    unique: false },
  email: { 
    type: String, 
    required: [true,"Please provide a unique email"],
    unique:true,
  },
  firstName: { type: String,  },
  lastName: { type: String,},
  mobile: { type: Number },
  address: { type: String, required: false},
  profile:{ type: String, required: false},
  photo: { type: String },
  isDoctor: {
    type: Boolean,
    default: false, // Set to true for doctors
  },
  role:{
    type: String,
    enum: ["patient", "doctor"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
