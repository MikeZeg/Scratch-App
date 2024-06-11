import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Routes, Router, useNavigate, Route, Link } from "react-router-dom";
import "../../styles/loginStyle.css"

import { SignInByGoogle } from "./SignInByGoogle";
import { ResetLogIn } from "./ResetLogIn";
import LandingPage from "../LandingPage";


export const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

// check user 
    // console.log(auth?.currentUser?.email)

    const signIn = async () => {

    }

    return (
        <div className="container">
            <div>
                <h1>Log In</h1>
                <button className="btn btn__main">
                    <Link to="/" className="btn btn__link">Press To go back</Link>
                </button>
                    {/* <Routes>
                        <Route path='/' element={<LandingPage/>} />
                    </Routes> */}
            </div>
            <div className="signin">
                <label>Email...</label>
                <input 
                    placeholder="Email..." 
                    onChange={(e)=> setEmail(e.target.value)} 
                />

                <label type="string">Password...</label>
                <input 
                    type="password" 
                    placeholder="Password..." 
                    onChange={(e)=> setPassword(e.target.value)}     
                />

                <button className="signin__btn" onClick={signIn}>Log In</button>
            </div>
            
            <div className="middle__btn">
                <SignInByGoogle/>
                
                <button className="btn btn__link"><Link to="/reset">Reset Password</Link></button>
                <Routes>
                    <Route path='reset' element={<ResetLogIn/>} />
                </Routes>
            </div>
        </div>
    )
}