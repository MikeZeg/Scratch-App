import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Routes, Router, useNavigate, Route, Link } from "react-router-dom";
import "../../styles/loginStyle.css";
import "../../styles/index.css";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { SignInByGoogle } from "./SignInByGoogle";
import { ResetLogIn } from "./ResetLogIn";
import LandingPage from "../LandingPage";


const issueFun = (info) => {
    const email = document.querySelector("#inputSignin");
    const pass = document.querySelector("#inputPass");

    email.style.backgroundColor = "red";
    email.style.color = "white";

    pass.style.backgroundColor = "red";
    pass.style.backgroundColor = "white";

    alert("Wrong Email or passowrd")
    // alert(info)
}


export const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const mainPage = useNavigate();
// check user 
    // console.log(auth?.currentUser?.email)
    
    

    const signIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((data)=> {
                console.log(data, "authdata")
                mainPage("/Main")
            }).catch((err)=> {
                console.error(err)
                issueFun(err)
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
                    id="inputSignin"
                    placeholder="Email..."
                    onChange={(e)=> setEmail(e.target.value)} 
                />

                <label type="string">Password...</label>
                <input
                    id="inputPass"
                    type="password" 
                    placeholder="Password..." 
                    onChange={(e)=> setPassword(e.target.value)}     
                />

                <button className="signin__btn" onClick={signIn}>Log In</button>
            </div>
            
            <div className="middle__btn">
                <SignInByGoogle/>
                
                <button className="btn btn__link"><Link className="btn btn__link" to="/reset">Reset Password</Link></button>
                <Routes>
                    <Route path='reset' element={<ResetLogIn/>} />
                </Routes>
            </div>
        </div>
    )
}