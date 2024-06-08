import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";


export const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

// check user 
    // console.log(auth?.currentUser?.email)

    const signIn = async () => {

    }

    return (
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
    )
}