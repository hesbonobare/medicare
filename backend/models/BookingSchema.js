import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
   doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorData:{
      _id:{type:String},
      userId:{type:String},
      email:{type:String},
      username:{type:String},
      name:{type:String},
      phone:{type:Number},
      specialization:{type:String},
      ticketPrice:{type:Number},
      averageRating:{type:Number},
      totalRating:{type:Number}
    },
   /* userId:{type:String,require:true},
    doctorId:{type:String,require:true},*/
    paymentIntentId:{type:String},
    ticketPrice: { type: Number, required: true },
    photo:{},
    hospitall:{type:String},
    appointmentDate: {
      type: Date,
     // required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    payment_status:{
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
