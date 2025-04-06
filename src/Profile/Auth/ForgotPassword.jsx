import axios from "axios";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { checkOtpMutation, sendOtpMutation } from "../../graphql/mutation";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [otpSend, setOtpSend] = useState(false);
  const location = useLocation();
  const email = location.state || "";
  const [inputEmail, setInputEmail] = useState(email);
  const [otp, setOtp] = useState();
  const [handleSendOtp]=useMutation(sendOtpMutation);
  const [handleCheckOtp]=useMutation(checkOtpMutation);
  const sendOtp = async (e) => {
    console.log(location.state);
    e.preventDefault();
    try {
      const res=await handleSendOtp({
        variables:
        {
          email:inputEmail
        }
      })
      console.log(res);
      toast.success("OTP Sent");
      setOtpSend(true);
    } catch (error) {
      console.log(error);
      toast.error("Email not found");
    }
  };
  const checkOtp = async (e) => {
    const email = inputEmail;
    try {
      const res=await handleCheckOtp({
        variables:
        {
          email,
          otp:parseInt(otp)
        }
      });
      console.log(res.data.checkOtp);
      if (res.data.checkOtp === "OTP Verified") {
        toast.success("OTP verified");
        navigate("/resetpassword", { state: { email: inputEmail } });
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer />
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        {otpSend ? (
          <div className="text-center">
            <h2 className="mb-3">OTP Sent</h2>
            <p>Check your email and enter the OTP below.</p>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  required
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={checkOtp}>
                Submit OTP
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="mb-3">Send OTP</h2>
            <form onSubmit={sendOtp}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={location.state}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send OTP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
