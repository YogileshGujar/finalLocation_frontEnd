import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  let Number=useLocation();
  console.log("test otp",Number.state)
  
  let navigate = useNavigate();

  let [OTP, setOTP] = useState({
    otp:""
  });

  let handleChange=(e)=>{
    let {name,value}=e.target;
    setOTP({...OTP,[name]:value});
}

  let otpChecking = async () =>{
  let {otp}=OTP;
   if(!otp){
    toast.error("Enter your 4 digit OTP !");
   }else if( !/[^a-zA-Z]/.test(otp)){
    toast.error("Enter your 4 (DIGIT) OTP !");
   }else if(otp.length !=4){
    toast.error("Enter your (4) digit OTP !");
   }else{
    let userdata={
      phonNumber:Number.state,
      otp:otp
    }
    // /api/otpverification
    try{
      let verifyOTP= await axios.post(
        "http://localhost:5000/api/otpverification",
        userdata);
        if(verifyOTP.status === 200){
          console.log(verifyOTP.data);
          toast.success("OTP is verifyed ");
          navigate('/getLocation',{state:userdata.phonNumber});
        }else{
          toast.error("OTP is NOT verifyed !");
        }
    }catch(e){
      console.log("Error from Api", e);
    }
   
    
    
   }

  }

  return (
    <>
    <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2 style={{ textAlign: "center" }}>Type OTP</h2>
            <div className="card px-5 py-5" id="form1">
              <div className="form-data">
                <div className="forms-inputs mb-4">
                  {" "}
                  <span>OTP</span>
                  <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="otp"
                    type="text"
                  />
                </div>
                {/* <div class="forms-inputs mb-4"> <span>Password</span> 
                    <input autocomplete="off" type="password" v-model="password" />
                        
                    </div> */}
                <div className="mb-3">
                  {" "}
                  <button className="btn btn-dark w-100" onClick={otpChecking}>
                  OTP verification
                  </button>{" "}
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
       <ToastContainer />
    </>
  );
}

export default Otp
