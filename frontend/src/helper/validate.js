import toast from 'react-hot-toast';
import {authenticate} from "./helper.js";


/*validate login page username*/
export async function usernameValidate(values){
    const errors=usernameVerify({},values);

    if(values.username){
        //check if user exists or not
        const{status}=await authenticate(values.username);
        if(status !==200){
            errors.exist=toast.error('User does not exist')
        }
    }
    return errors;
}

{/*validate password*/}
export async function passwordValidate(values){
    const errors=passwordVerify({},values);
    return errors;
}



{/*validate reset password */}
export async function resetPasswordValidation(values){
    
    const errors=passwordVerify({},values);

    if(values.password !== values.confirm_pwd){
        errors.exist=toast.error("Password does not match..!")
    }
    return errors;
}

{/**validate register form */}
export async function registerValidation(values){

    const errors=usernameVerify({},values);
    passwordVerify(errors,values);
   
    emailVerify(errors,values);
    

    return errors;
}

{/**validate profilepage */}
export async function profileValidation(values){
    const errors=emailVerify({},values)
    return errors;
}


{/****** */}

function passwordVerify(errors={},values){


const specialChars= /^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/g;

    if(!values.password){
        errors.password=toast.error("Password Required...!")
    }else if(values.password.includes(" ")){
        errors.password=toast.error("Wrong Password...!")
    }else if(values.password.length < 4){
        errors.password=toast.error("Password must be more than 4 charcters long")
    }else if(!specialChars.test(values.password)){
        errors.password=toast.error("Password must have special characters")
    }

    return errors;
}


{/*validate username*/}
function usernameVerify(errors={}, values){
    if(!values.username){
        errors.username=toast.error('Username Required..!')
    }else if(values.username.includes(" ")){
        errors.username=toast.error('Invalid Username...!')
    }

    return errors;
}

{/**validate email */}
function emailVerify(error={}, values){
    if(!values.email){
        error.email=toast.error("Email required..!")
    }else if(values.email.includes(' ')){
        error.email=toast.error("Wrong email..!")
    }
    return error;
}