import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Routes, Router, useNavigate, Route, Link } from "react-router-dom";
import "../../styles/loginStyle.css";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { SignInByGoogle } from "./SignInByGoogle";
import { ResetLogIn } from "./ResetLogIn";
import LandingPage from "../LandingPage";


export const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mainPage = useNavigate();
// check user 
    console.log(auth?.currentUser?.email)
// do user collection
    // console.log(auth?.)

    const signIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((data)=> {
                console.log(data, "authdata")
                mainPage("/Main")
            }).catch((err)=> {
                console.error(err)
            })
    }

    return (
        <div className="signin__container">
            <div>
                <h1 className="txt-center">Log In</h1>
                <button className="btn btn__main">
                    <Link to="/" className="btn btn__link">Press To go back</Link>
                </button>
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