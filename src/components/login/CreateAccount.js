import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
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
        <div>
            <h1>Create Account</h1>
            <div>
                <div className="email">
                    <label>Email</label>
                    <input 
                        placeholder="Email..."
                    />
                    <label>Repete Email</label>
                    <input 
                        placeholder="Email..."
                    />
                </div>
                <div className="password">
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
                <button className="btn" onClick={register}>Register</button>
            </div>
        </div>
    );
}