import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import { auth, getDocs, getDoc } from "../config/firebase";
import "../styles/mainStyle.css";
import { LogOut } from "./login/LogOut";
import { User } from "./mainComponents/User.js";
import { Content } from "./mainComponents/Content.js";
import { Setting } from "./mainComponents/Setting.js";
import { NavBar } from "./mainComponents/NavBar.js";



export const Main = () => {

    return (
        <div className="main">
            <section className="navBar">
                <NavBar/>
            </section>
            
            <section className="main__top">
                <div id="welcomeUser">
                    <div id="settingUser">
                        <img className="userImage"></img>
                        <LogOut  myData = {data => console.log("Log oFF from main level")} />
                        <Setting /> 
                    </div>
                </div>
                    <User/>
            </section>
            
            <section className="main__middle">
                <Content/>
            </section>
        </div>
    )
}