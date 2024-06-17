import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainUserStyle.css"
// import { auth, getDocs, getDoc } from "../../config/firebase";
// import { LogOut } from "./login/LogOut";


export const userData = {
    userName: "Adam",
    userSurname: "Smith",
    userEmail: "adamsmith@g.com",
    uid: "asd123",
    scratch: {
        1:"Bingo",
        2:"Bingo",
        3:"Bingo",
        4:"Bingo",
        5:"Bingo",
        6:"Bingo",
        7:"Bingo",
        8:"Bingo",
    },
}

export const topScratch = () => {

    const data = userData.scratch;

    console.log(data)
}




export const User = () => {


    return (
        <div className="user">
            <section>Welcome {userData.userName}</section>
            <section></section>
        </div>
    )
}