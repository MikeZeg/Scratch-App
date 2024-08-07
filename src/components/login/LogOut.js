import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.js";
import { signOut } from 'firebase/auth'
import "../../styles/loginStyle.css";


export const LogOut = (props) => {

//CallBack functon    
    let callBack = props.myData

//Move to LandingPage
        const moveHome = useNavigate()

        const logOff = async () => {

            try {
                await signOut(auth)
                            .then(moveHome("/LandingPage"))
                            callBack(null)          
                console.log("Button LogOff pressed: " + props.myData)
            }catch(err) {
                console.error(err)
            }
        }
        
        return(
            <div>
                <button id="logOut" className="btn" onClick={()=>{
                    logOff()
                    }}>Log Out</button>
            </div>
        )
    }