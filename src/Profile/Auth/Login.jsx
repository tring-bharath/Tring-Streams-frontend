import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ProfileName } from "../../routes/AppRoutes";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../../index.css'

const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const [toggleEye, setToggleEye] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const { setUsername } = useContext(ProfileName);
  const [email, setEmail] = useState();

  const nav = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (user) => {
    try {
      setEmail(user.email);
      console.log(user);

      const userLogin = await axios.post(`${url}/user/loginUser`, user);

      const username = userLogin.data.firstName;
      const userId = userLogin.data._id;
      const email = userLogin.data.email;
      if (userLogin?.data == "WrongPassword") {
        toast.error("Invalid Credentials");
        return;
      }
      localStorage.setItem("user", JSON.stringify(username));
      localStorage.setItem("id", JSON.stringify(userId));
      localStorage.setItem("email", JSON.stringify(email));
      setUsername(username);

      nav("/");
    } catch (error) {
      toast.error("Email Address not Registered");
    }
  };

  const setEye = () => {
    setToggleEye(!toggleEye);
    setPasswordType(passwordType == "password" ? "text" : "password");
  };

  return (
    <div>
      <ToastContainer />
      <form
        className="form-container d-flex flex-column container justify-content-center"
        onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-center">Login</h3>
        <div className="email">
          <label className="mt-3">Email*</label>
          <input
            className="form-control border-success"
            type="email"
            {...register("email")}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <p className="text-danger">{errors.email?.message}</p>

        <label>Password*</label>
        <div className="password d-flex align-items-center">
          <input
            className="form-control border-success"
            type={passwordType}
            {...register("password")}
          />
          <span className="eyeButton" onClick={() => setEye()}>
            {toggleEye ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <p className="text-danger">{errors.password?.message}</p>
        <div className="forgotPassword align-self-end">
          <Link to="/forgotpassword" state={email} className="link">
            Forgot Password?
          </Link>
        </div>
        <button
          className="px-4 py-2 bg-primary mt-4 text-white rounded-1 align-self-center"
          type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
