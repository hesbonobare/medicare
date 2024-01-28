import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";


//axios.defaults.baseURL = 'http://localhost:8080';

axios.defaults.baseURL=import.meta.env.VITE_SERVER_DOMAIN  
//console.log(import.meta.env.VITE_SERVER_DOMAIN)

/**Make API Requests */

/**To get username from token */
export async function getUsername(){
  const token=localStorage.getItem('token')
  if(!token) return Promise.reject("Cannot find token")
  let decode=jwt_decode(token)
  return decode;
}

/**Authenticate function */

export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist..!" };
  }
}

//get user details
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match" };
  }
}

//get doctors list
export async function getDoctors(){
  try {
    const response = await axios.get('/api/doctors');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching doctors: ${error.message}`);
  }
}
  
{/*try {
  const {data: { msg },status} = await axios.post("/api/register", values);
 
  let { username, email } = values;

  //send email
  if (status === 201) {
    await axios.post("/api/registerMail", {
      username,
      userEmail: email,
      text: msg
    });
  }
  return Promise.resolve(msg);
} catch (error) {
  return Promise.reject(error)
}*/}

//register user function
export async function registerUser(values) {
  try {
    const {data: { msg },status} = await axios.post("/api/register", values);
   
    let { username, email } = values;
  
    //send email
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject(error)
  }
  /*
  try {
    const response = await axios.post("/api/register", values);
    // Handle successful response
    console.log("register success")
    console.log(response)
    return Promise.resolve(response);
  } catch (error) {
      return Promise.reject(error);
  }*/
}


//login function
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match" });
  }
}

//update user profile function
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Could't Update Profile...!" });
  }
}

//update user profile function
export async function updateDoctor(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updatedoctor", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Could't Update DoctorProfile...!" });
  }
}

//generate OTP
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    //send mail with OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password recovery OTP",
      });
    }

    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

//verify OTP
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

//reset password
export async function resetPassword({ username, password} ) {
  try {
    console.log(username,password)
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({error} );
  }
}
