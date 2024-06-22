import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";

import { auth, db } from "../../config/firebase";
import { Database } from "firebase/database";
import { sendPasswordResetEmail } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";

import "../../styles/resetloginStyle.css"

export const ResetLogIn = () => {

    const [reset, setReset] = useState(" ")
    const navigateTo = useNavigate();

// Input background color back to white
    const inputReset = () => {
        document.querySelector("#resetEmailInput").style.backgroundColor = "white";
        document.querySelector("#resetEmailInput").style.color = "black";
    }


// Email Check - format, comunication with user
    const checkEmail = () => {
        const inputEmail = document.querySelector("#resetEmailInput")

        const checkRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const easyMailFormat = /^\S+@\S+\.\S+$/;

        if(reset.match(easyMailFormat)){
            console.log('work')
            resetPassword();
        }else{
            inputEmail.style.backgroundColor = 'red'
            inputEmail.style.color = 'white'
            console.log('Not working')
            alert('Please add correct email')
        }
    }

// Send request to Firebase
    const resetPassword = async () => {
        // e.preventDefault();

            sendPasswordResetEmail(auth, reset).then((data)=>{
                alert("Check your email")
                navigateTo("/signIn")
            }).catch(err => {
                console.error(err)
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
                        onChange={(e)=> {
                            inputReset()
                            setReset(e.target.value)
                        }}
                    />
                        <button className="btn btn__conf" onClick={()=>{
                            // resetPassword()
                            checkEmail();
                        }}>Send</button>

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