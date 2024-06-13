import React, { useState } from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.js";
import { signOut } from 'firebase/auth'
import "../../styles/loginStyle.css";


export const LogOut = () => {
    // check user 
        console.log(auth?.currentUser?.email)

        const moveHome = useNavigate()

        const logOff = async () => {
    
            try {
                await signOut(auth)
                            .then(moveHome("/LandingPage"))
            }catch(err) {
                console.error(err)
            }
        }
        
        return(
            <div>
                <button onClick={logOff}>Log Out</button>
            </div>
        )
    }