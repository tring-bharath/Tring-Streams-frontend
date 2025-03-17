import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Signup() {
  const url = import.meta.env.VITE_API_URL;
    const [toggleEye,setToggleEye]=useState(false);
    const [confirmToggleEye,setConfirmToggleEye]=useState(false);
    const [passwordType,setPasswordType]=useState("password");
    const [confirmPasswordType,setConfirmPasswordType]=useState("password");
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
    confirmPassword: yup.string().min(8).required()
  });

  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try{
      const user=await axios.post(`${url}/user/registerUser`,data);
      console.log(user);
      nav('/Registration')
    }
    catch (error) 
    {
      console.log(error);
      
      toast.error("Email already Exists")
    }
  };

  const setEye=()=>
    {
      setToggleEye(!toggleEye);
      setPasswordType(passwordType=="password"?"text":"password");
    }
    const confirmSetEye=()=>
      {
        setConfirmToggleEye(!confirmToggleEye);
        setConfirmPasswordType(confirmPasswordType=="password"?"text":"password");
      }

  return (
    <>
      <Toaster />
      <form
        className="form-container d-flex flex-column container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center">Sign-Up</h3>
        <label className="mt-2">First Name*</label>
        <input
          {...register("firstName")}
          className="form-control"
          placeholder="First Name"
        />
        <p className="text-danger">{errors.firstName?.message}</p>
        <label className="mt-2">Last Name:</label>
        <input
          {...register("lastName")}
          className="form-control"
          placeholder="Last Name"
        />
        <p className="text-danger">{errors.lastName?.message}</p>
        <label className="mt-2">Email*</label>
        <input
          {...register("email")}
          className="form-control"
          placeholder="Email"
        />
        <p className="text-danger">{errors.email?.message}</p>
        <label className="mt-2">Password*</label>
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
        <label className="mt-2">Confirm Password*</label>
        <div className="password d-flex align-items-center">
          <input
            className="form-control border-success"
            type={confirmPasswordType}
            {...register("confirmPassword")}
          />
          <span className="eyeButton" onClick={() => confirmSetEye()}>
            {confirmToggleEye ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <p className="text-danger">{errors.confirmPassword?.message}</p>
        <div className="mt-2 d-flex align-items-center">
          <input
            id="terms"
            type="checkbox"
            {...register("terms")}
            className="me-2"
          />
          <label htmlFor="terms" className="d-flex align-self-center">
            I agree to the &nbsp;
            <a href="https://tringapps.com/" target="blank">terms and conditions</a>
          </label>
        </div>
        <p className="text-danger">{errors.terms?.message}</p>

        <button
          type="submit"
          className="px-4 py-2 bg-primary mt-2 text-white rounded-1 align-self-center"
        >
          Register
        </button>
      </form>
    </>
  );
}
