import React, { useState } from "react";
import ReactDom from "react-dom";
// import { Auth } from "../config/auth.js"
import { auth, googleProvider } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import "../styles/loginStyle.css";


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
// Re-set password
export const ResetLogIn = () => {


// check user 
    // console.log(auth?.currentUser?.email)

    return (
        <div>
            <h1>Password Reset</h1>
        </div>
    )
}


// Create Account Email + password
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

// Login by Google
export const SignInByGoogle = () => {

// check user 
    // console.log(auth?.currentUser?.email)


    const signInByGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider )
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            
            <button className="btn" onClick={signInByGoogle}>Sign In by Google</button>
        </div>

    )
}

export const LogOut = () => {

// check user 
    // console.log(auth?.currentUser?.email)

    const signOut = async () => {

        try {
            await signOut(auth);
        }catch(err) {
            console.error(err)
        }
    }
    
    
    return(
        <div>
            <button>Log Out</button>
        </div>
    )
}

export const LogIn = () => {
    
// if ready sign in go to Main page
// if not use SignIn
// if not CreateAccount or remainder/ reset password


    return (        
        <div className="login">
           <SignIn/>
           <SignInByGoogle/>
           <LogOut/>

        </div>
    )
}