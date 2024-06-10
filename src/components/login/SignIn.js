import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

import { SignInByGoogle } from "./SignInByGoogle";
import { ResetLogIn } from "./ResetLogIn";
import { Routes, Router, useNavigate, Route, Link } from "react-router-dom";
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
                <button>
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
            
            <div className="signin_extra">
                <SignInByGoogle/>
                
                <button className="btn btn__link"><Link to="/reset">Reset</Link></button>
                <Routes>
                    <Route path='reset' element={<ResetLogIn/>} />
                </Routes>
            </div>
        </div>
    )
}