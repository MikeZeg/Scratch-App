import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainUserStyle.css"
import { auth, getDocs, getDoc } from "../../config/firebase";
// import { LogOut } from "./login/LogOut";

const user = auth

export const topScratch = () => {
    const userUid = auth?.currentUser?.uid
    console.log(userUid)
}

export const User = () => {

    return (
        <div className="user">
            <section id="user-greeting">
                <p>
                    Welcome 
                    {/* {user?.currentUser?.email} */}
                </p></section>
            <section></section>
        </div>
    )
}