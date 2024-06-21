import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";

import { auth } from "../../config/firebase";
import { Database } from "firebase/database";
import { sendPasswordResetEmail } from "firebase/auth";

import "../../styles/resetloginStyle.css"

export const ResetLogIn = () => {

    const [reset, setReset] = useState("none")
    const inputEmail = document.querySelector("#resetEmailInput")
    const navigateTo = useNavigate();
    // check user 
        // console.log(auth?.currentUser?.email)


    const resetPassword = async() => {
        // e.preventDefault();
        // if statment
            // inputEmail.style.backgroundColor = "red";

            sendPasswordResetEmail(auth, reset).then((data)=>{
                alert("Check your email")
                navigateTo("/signIn")
            }).catch(err => {
                console.error(err)
                inputEmail.style.backgroundColor = "red";
            })

        
        console.log(reset);
    }
    
        return (
            <div className="reset__container">
                <h1 className="txt-center">Reset Your Login</h1>
                
                <button className="btn btn__link btn__main">
                    <Link to="/" className="btn btn__link">Press To go Main</Link>
                </button>
                <div className="middle">
                    <label>Enter Your email</label>
                    <input
                        id="resetEmailInput"
                        placeholder="email..."
                        onChange={(e)=> setReset(e.target.value)} 
                    />
                        <button className="btn btn__conf" onClick={()=>{resetPassword()}}>Send</button>

                    <div className="middle__btn">
                        <button className="btn btn__link">
                            <Link to="/signIn" className="btn btn__link">Back Log In</Link>
                        </button>
                        <button className="btn btn__link">
                            <Link to="/createAccount" className="btn btn__link">Create Account</Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }