import React, { useState } from "react";
import axios from "axios";
import { adduser } from "../utils/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setpassword] = useState("Cherish21@");
  const [emailid, setemailid] = useState("cherish@gmail.com");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogin = async () => {
    try {
      const logindata = await axios.post(
        "http://localhost:3000/login",
        { emailid, password },
        { withCredentials: true }
      );
      console.log(logindata.data);
      dispatch(adduser(logindata.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-full flex items-center justify-center py-30">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        {/* <legend className="fieldset-legend font-bold text-3xl items-center px-15">
          Login Page
        </legend> */}
        <h1 className="text-3xl font-bold m-auto">Login Page</h1>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailid}
          onChange={(e) => {
            setemailid(e.target.value);
          }}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <button className="btn btn-neutral mt-4" onClick={handlelogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
