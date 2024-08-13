import React, { useState } from "react";
import ReactDom from "react-dom";
import "../../styles/loginStyle.css";

import { BrowserRouter as Router, Route, Routes, Link, Outlet, BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

import { SignInByGoogle } from "./SignInByGoogle.js";
import { SignIn } from  "./SignIn.js";
import { ResetLogIn } from "./ResetLogIn.js";
import { CreateAccount } from "./CreateAccount.js";
import { LogOut } from "./LogOut.js";

export const LogIn = () => {

    return (

        <div className="login">
        {/* //     <Router>
        //         <Link to="/">Home</Link>
        //         <Link to="logIn">Sign In</Link>
        //         <Link to="/createAccount">Create Account</Link>
        //         <Link to="/signInByGoogle">Sign In By Google</Link>
        //         <Link to="/logOut">Log Out</Link>
        //     </Router>

        //     <Outlet/>

        //     <Router>
        //         <Routes>
        //             <Route path="logIn" element={<SignIn/>} />
        //             <Route path="createAccount" element={<CreateAccount/>} />
        //             <Route path="signInByGoogle" element={<SignInByGoogle/>} />
        //             <Route path="logOut" element={<LogOut/>} />
        //         </Routes>
        //     </Router> */}

        </div>
    )
}