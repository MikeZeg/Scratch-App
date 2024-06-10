import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes} from "react-router-dom"

export const ResetLogIn = () => {

    const [reset, setReset] = useState("")

    // check user 
        // console.log(auth?.currentUser?.email)
    
        return (
            <div className="container">
                <h1>Reset Your Login</h1>
                
                <button className="btn btn__link">
                    <Link to="/" className="btn btn__link">Press To go Main</Link>
                </button>

                <label>Enter Your email</label>
                <input
                    placeholder="email..."
                    onChange={(e)=> setReset(e.target.value)} 
                />
                <button className="btn">Send</button>

                <button className="btn btn__link">
                    <Link to="/signIn" className="btn btn__link">Back Log In</Link>
                </button>
                <button className="btn btn__link">
                    <Link to="/createAccount" className="btn btn__link">Create Account</Link>
                </button>
            </div>
        )
    }