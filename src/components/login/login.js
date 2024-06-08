import React, { useState } from "react";
import ReactDom from "react-dom";
// import { Auth } from "../config/auth.js"
import { auth, googleProvider } from "../../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import "../../styles/loginStyle.css";
import { SignInByGoogle } from "./SignInByGoogle.js";
import { SignIn } from  "./SignIn.js";
import { ResetLogIn } from "./ResetLogIn.js";
import { CreateAccount } from "./CreateAccount.js";
import { LogOut } from "./LogOut.js";

export const LogIn = () => {
    
// if ready sign in go to Main page
// if not use SignIn
// if not CreateAccount or remainder/ reset password


    return (        
        <div className="login">
           {/* <SignIn/> */}
           {/* <CreateAccount/> */}
           <button>Reset the Password</button>
           {/* <SignInByGoogle/> */}
           {/* <LogOut/> */}
        </div>
    )
}