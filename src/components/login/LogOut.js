import React, { useState } from "react";
import ReactDom from "react-dom";
import { auth } from "../../config/firebase.js";
import { signOut } from 'firebase/auth'
import "../../styles/loginStyle.css";




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
                <button onClick={signOut}>Log Out</button>
                
            </div>
        )
    }