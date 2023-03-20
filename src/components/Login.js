import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  let navigate = useNavigate();
  let [PhonNumber, setPhonNumber] = useState({
    phonNumber:""
  });

  let handleChange=(e)=>{
    let {name,value}=e.target;
    setPhonNumber({...PhonNumber,[name]:value});
}

  let sendOtp = async () => {
    let {phonNumber}=PhonNumber;
    if(!phonNumber) {
      toast.error("Enter your PhonNumber !");
    }else{
       console.log("on click ", phonNumber);
      try {
      
      let sendingOtp = await axios.post(
        "http://localhost:5000/api/otpgenerator",
        PhonNumber
      );
      if(sendingOtp.status === 200)
     {
      console.log("status ",phonNumber)
      navigate("/otp",{state:phonNumber});
        
        
      }else{
        toast.error("OTP is not send !");
      }
       
      
      console.log("otp ",sendingOtp);
    } catch (e) {
      console.log("Error from Api", e);
    }
  }
  
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2 style={{ textAlign: "center" }}>Welcome Back, Log In</h2>
            <div className="card px-5 py-5" id="form1">
              <div className="form-data">
                <div className="forms-inputs mb-4">
                  {" "}
                  <span>PhonNumber</span>
                  <input
                    autoComplete="off"
                    onChange={handleChange}
                    name="phonNumber"
                    type="text"
                  />
                </div>
                {/* <div class="forms-inputs mb-4"> <span>Password</span> 
                    <input autocomplete="off" type="password" v-model="password" />
                        
                    </div> */}
                <div className="mb-3">
                  {" "}
                  <button className="btn btn-dark w-100" onClick={sendOtp}>
                    Login
                  </button>{" "}
                </div>
                <p style={{ textAlign: "center" }}>
                  Don't have and Account{" "}
                  <NavLink to="/register">Sing up</NavLink>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
