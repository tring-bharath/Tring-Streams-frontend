import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { resetPasswordMutation } from "../../graphql/Mutation/userMutation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const location = useLocation();
  const [handleResetPassword] = useMutation(resetPasswordMutation);
  const resetPassword = async (e) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const email = location.state.email;
    console.log(email, password);
    try{

      const res = await handleResetPassword({
        variables: {
          email,
          password,
        },
      });
      console.log(res);
      navigate("/Registration");
    }
    catch(err)
    {
      console.log(err);
      
    }
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
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
            onClick={resetPassword}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
