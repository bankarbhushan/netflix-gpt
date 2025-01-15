import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { auth } from "../Utils/FireBase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidData } from "../Utils/Validation.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignINForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInFrom = () => {
    setSignInForm(!isSignINForm);
  };

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);
    // console.log(userName);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    // if the message is present then no need to go to next line return the contro flow from here only .
    if (message) return;

    if (!isSignINForm) {
      // !SignINForm mean this is signIn form
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
        // userName
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // when user created then update the profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/128053266?v=4",
          })
            .then(() => {
              // Ensure the updated user data is fetched
              const updatedUser = auth.currentUser;
              const { uid, email, displayName, photoURL } = updatedUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  password: password.current.value, // Original password value
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " -" + errorMessage);
          setErrorMessage(error.message);
        });
    } else {
      // passsing the eamil and password for the authentication
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          setErrorMessage(errorMessage);
        });
    }
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
        <form
          className="absolute   bg-black p-16 w-4/12 my-36 mx-auto left-0 right-0 text-white rounded-md bg-opacity-85"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl font-bold my-4 ">
            {isSignINForm ? "Sign In" : "Sign Up"}
          </h1>
          {errorMessage && (
            <div className="bg-yellow-500 m-auto  rounded-md p-4 font-semibold text-black mb-10  ">
              {errorMessage}
            </div>
          )}
          {!isSignINForm && (
            <input
              ref={name}
              type="text"
              placeholder="User Name"
              className="p-4 my-2 w-full bg-slate-700 rounded-md bg-opacity-50  "
              autoComplete="Full Name"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder=" Email Adddress"
            className="p-4 my-2 w-full bg-slate-700 rounded-md bg-opacity-50  "
            autoComplete="email"
          />
          <input
            ref={password}
            type="password"
            placeholder=" Password"
            className="p-4 my-2 w-full bg-slate-700 bg-opacity-50 rounded-md"
            autoComplete="password"
          />
          <button
            className="my-4 p-2 w-full bg-red-700 font-semibold rounded-md"
            onClick={handleButtonClick}
          >
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
