import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../styles/mainStyle.css";
import { auth, getDocs, getDoc } from "../config/firebase";
import { LogOut } from "./login/LogOut";
import { User } from "./mainComponents/User.js";
import { Content } from "./mainComponents/Content.js";
import { Setting } from "./mainComponents/Setting.js";



export const Main = () => {

    return (
        <div className="main">
            <div className="main__top">
                <div id="welcomeUser">
                    <p>ScratchCard App</p>
                    <div id="settingUser">
                        <LogOut  myData = {data => console.log("Log oFF from main level")}/>
                        <Setting /> 
                    </div>

                </div>
                    <User/>
            </div>
            <div className="main__middle">
                <Content/>
            </div>
            <div className="main__bottom">
            </div>
        </div>
    )
}