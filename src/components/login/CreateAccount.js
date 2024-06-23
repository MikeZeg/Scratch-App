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


//information for user - add comunicatio ??
    const infoForUser = (info) => {
        const inputEmail = document.querySelectorAll(".input-email")
        alert(info)
        inputEmail.forEach((email)=>{
            email.style.backgroundColor = "red";
            email.style.color = "white";
        })
    }
    const clearColorEmail = () => {
        const inputEmail = document.querySelectorAll(".input-email")
        
        inputEmail.forEach((email)=>{
            email.style.backgroundColor = "white";
            email.style.color = "black";
        })
    }
    const infoUserPassword = (info) => {
        const inputPassword = document.querySelectorAll(".input-password");
        alert(info)
        inputPassword.forEach((pass)=>{
            pass.style.backgroundColor = "red";
            pass.style.color = "white";
        })
    }
    const clearColorPassword = () => {
        const inputPassword = document.querySelectorAll(".input-password")
        
        inputPassword.forEach((pass)=>{
            pass.style.backgroundColor = "white";
            pass.style.color = "black";
        })
    }

//checking input data
    const register = async () => {

        const inputEmail = document.querySelectorAll(".input-email");
        const inputPassword = document.querySelectorAll(".input-password");


        const checkRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const easyMailFormat = /^\S+@\S+\.\S+$/;

        if(!email.match(easyMailFormat)){
            return infoForUser("Please check Email format")
        }

        if(email !== checkEmail){
            return infoForUser("Please check email - Not same")
        }
        if(password !== checkPassword){
            console.group('password issue')
            return infoUserPassword("Please check password - Not same")
        }
        
        // email === checkEmail ?  
        //                 inputEmail.forEach((email)=> {email.classList.remove('error'); console.log("Correct email")}) 
        //                 : inputEmail.forEach((email)=> { alert('Email is not same')})

        // password === checkPassword ?
        //                 inputPassword.forEach((pass)=> {pass.classList.remove('error'); console.log("Correct password")})
        //                 : inputPassword.forEach((pass)=> {pass.classList.add('error'); alert('Not same') })

        if(email === checkEmail && password === checkPassword ){
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                mainNav("/nav")
                
            }catch (err){
                infoForUser(err);
                console.log("Catch error")
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
                        onChange={(e) => {
                            setEmail(e.target.value)
                            clearColorEmail()
                        }}
                    />
                    <label>Repete Email</label>
                    <input
                        className="input-email"
                        placeholder="Email..."
                        onChange={(e) => {
                            setCheckEmail(e.target.value)
                            clearColorEmail()
                        }}
                    />
                </div>

                <div className="account__create__password">
                    <label>Password</label>
                    <input
                        className="input-password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {
                            setCheckPassword(e.target.value)
                            clearColorPassword()
                        }}
                    />
                    <label>Repete Password</label>
                    <input
                        className="input-password"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                            clearColorPassword()
                        }}
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