
import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainSettingStyle.css";

import { userData } from "./User.js"

console.log(userData.userEmail)


export const Setting = () => {
    return (
        <div>
            <p>User info</p>
            <p>User change</p>
            <p>Somethink</p>
        </div>
    )
}