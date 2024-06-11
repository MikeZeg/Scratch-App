import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes} from "react-router-dom";
import "../../styles/createAccountStyle.css"

import { SignInByGoogle } from "./SignInByGoogle"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";


export const CreateAccount = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

// check user 
    // console.log(auth?.currentUser?.email)

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        }catch (err){
            console.error(err)
        }
    }

    return (
        <div className="account__container">
            <h1 className="txt-center">Create Account</h1>
            <div className="account__create">
                <div className="account__create__email">
                    <label>Email</label>
                    <input 
                        placeholder="Email..."
                    />
                    <label>Repete Email</label>
                    <input 
                        placeholder="Email..."
                    />
                </div>

                <div className="account__create__password">
                    <label>Password</label>
                    <input 
                        placeholder="Password"
                        type="password"
                    />
                    <label>Repete Password</label>
                    <input 
                        placeholder="Password"
                        type="password"
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