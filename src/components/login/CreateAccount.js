import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/createAccountStyle.css";

import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { SignInByGoogle } from "./SignInByGoogle";


export const CreateAccount = () => {

    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState("")

    const [checkPassword, setCheckPassword] = useState("");
    const [password, setPassword] = useState("");

    const mainNav = useNavigate();

// check user 
    console.log(auth?.currentUser?.email)
    console.log(auth)

    const register = async () => {

        const inputEmail = document.querySelectorAll(".input-email");
        const inputPassword = document.querySelectorAll(".input-password"); 
        
        email === checkEmail ?  
                        inputEmail.forEach((email)=> {email.classList.remove('error'); console.log("Correct")}) : 
                        inputEmail.forEach((email)=> {email.classList.add('error'); console.log(email)})

        password === checkPassword ?
                        inputPassword.forEach((pass)=> {pass.classList.remove('error'); console.log("Correct")}) : 
                        inputPassword.forEach((pass)=> {pass.classList.add('error'); console.log(email)})


        if(email === checkEmail && password === checkPassword ){
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                mainNav("/nav")
                
            }catch (err){

                console.error(err)
                alert(err)
            }
        }
    }

    return (
        <div className="account__container">
            <h1 className="txt-center">Create Account</h1>
            <div className="account__create">
                <div className="account__create__email">
                    <label>Email</label>
                    <input
                        className="input-email"
                        placeholder="Email..."
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <label>Repete Email</label>
                    <input
                        className="input-email"
                        placeholder="Email..."
                        onChange={(e) => {setCheckEmail(e.target.value)}}
                    />
                </div>

                <div className="account__create__password">
                    <label>Password</label>
                    <input
                        className="input-password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {setCheckPassword(e.target.value)}}
                    />
                    <label>Repete Password</label>
                    <input
                        className="input-password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </div>
                <button className="btn btn__register" onClick={register}>Register</button>
            </div>

            <div className="middle__btn">
                <SignInByGoogle />
                <button className="btn btn__link">
                        <Link to="/" className="btn btn__link">Back To Main</Link>
                </button>
            </div>
        </div>
    );
}