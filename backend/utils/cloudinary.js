import cloudinaryModule from "cloudinary"
import ENV from "../config.js"
import {v2 as cloudinary} from 'cloudinary';

 //cloudinary=cloudinaryModule.v2

cloudinary.config({
    cloud_name:ENV.CLOUDINARY_NAME,
    api_key:ENV.CLOUDINARY_API_KEY,
    api_secret:ENV.CLOUDINARY_API_SECRET
})

//module.exports=cloudinary;
export default cloudinary;


          