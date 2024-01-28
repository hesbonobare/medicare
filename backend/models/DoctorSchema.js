import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  name:{type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String,  },
  username: { type: String, required: true},
  phone: { type: Number },
  photo: { type: Object },
  ticketPrice: { type: Number },
  gender: { type: String, enum: ["male", "female", "other"] },
  role: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    
  },

  experiences: {
    
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: {  },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
 // appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
 appointments: [{
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  gender: String,
  photo: String,
  paymentStatus: String,
  appointmentDate: Date,
  price: Number,
}],
});

export default mongoose.model("Doctor", DoctorSchema);
