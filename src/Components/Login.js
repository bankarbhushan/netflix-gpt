import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignINForm, setSignInForm] = useState(true);
  const toggleSignInFrom = () => {
    setSignInForm(!isSignINForm);
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_medium.jpg"
          alt="Login Background"
        />
        <form className="absolute   bg-black p-12 w-3/12 my-36 mx-auto left-0 right-0 text-white rounded-md bg-opacity-85">
          <h1 className="text-3xl font-bold my-4 ">
            {isSignINForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignINForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-2 w-full bg-slate-700 rounded-md bg-opacity-50  "
            />
          )}
          <input
            type="text"
            placeholder=" Email Adddress"
            className="p-4 my-2 w-full bg-slate-700 rounded-md bg-opacity-50  "
          />
          <input
            type="password"
            placeholder=" Password"
            className="p-4 my-2 w-full bg-slate-700 bg-opacity-50 rounded-md"
          />
          <button className="my-4 p-2 w-full bg-red-700 font-semibold rounded-md">
            {isSignINForm ? "Sign In" : "Sign Up"}
          </button>
          <p
            className="cursor-pointer "
            onClick={() => {
              toggleSignInFrom();
            }}
          >
            {isSignINForm
              ? "New to Netflix? Signin Up Now"
              : "Alredy registed? Sigin Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
