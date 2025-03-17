import axios from 'axios';
import React, { useState } from 'react'
import {  ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const url=import.meta.env.VITE_API_URL;
    const location = useLocation();
    const resetPassword = async(e) => {
        if(password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const email = location.state.email;
        console.log(email, password);
        
        const res = await axios.put(`${url}/user/resetPassword`, { email, password });
        console.log(res);
        
        navigate("/Registration");
    }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <ToastContainer />
    <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Reset Password</h2>
        <form>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button 
                type="button" 
                className="btn btn-primary w-100" 
                onClick={resetPassword}
            >
                Reset Password
            </button>
        </form>
    </div>
</div>
  )
}

export default ResetPassword