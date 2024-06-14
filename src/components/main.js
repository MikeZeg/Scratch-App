import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../styles/mainStyle.css";
import { auth, getDocs, getDoc } from "../config/firebase";
import { LogOut } from "./login/LogOut";



export const Main = () => {

    



    return (
        <div>
            <h1>Welcome Please check you info</h1>
            <button className="btn btn__main">
                    <Link to="/" className="btn btn__link">Press To go back</Link>
                </button>
            <LogOut/>
        </div>
    )
}