import React, { useState } from "react";
import ReactDom from "react-dom";
// import { Auth } from "../config/auth.js"
import { auth, googleProvider } from "../../config/firebase.js";
import "../../styles/loginStyle.css";
import { signInWithPopup} from 'firebase/auth'

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