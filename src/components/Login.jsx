import React from "react";

const Login = () => {
  return (
    <div className="h-full flex items-center justify-center py-30">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        {/* <legend className="fieldset-legend font-bold text-3xl items-center px-15">
          Login Page
        </legend> */}
        <h1 className="text-3xl font-bold m-auto">Login Page</h1>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
