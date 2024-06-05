import React from "react";
import ReactDom from "react-dom";
import {} from "../config/firebase.js";
import "../styles/loginStyle.css";


export const SignIn = () => {
    return (
        <div>
            <label>Email...</label>
            <input placeholder="Email..." />

            <label type="string">Password...</label>
            <input type="password" placeholder="Password..." />

            <button>Log In</button>
        </div>
    )
}
// Re-set password
export const ResetLogIn = () => {
    return (
        <div>
            <h1>Password Reset</h1>
        </div>
    )
}


// Create Account Email + password
export const CreateAccount = () => {
    return (
        <div>
            <h1>Create Account</h1>
        </div>
    );
}

// Login by Google
export const SignInByGoogle = () => {
    return (
        <div>
            <h1>Sigm In by Google</h1>
        </div>

    )
}

export const LogIn = () => {
    
// if ready sign in go to Main page
// if not use SignIn
// if not CreateAccount or remainder/ reset password



    return (        
        <div>
           <SignIn/>

        </div>
    )
}