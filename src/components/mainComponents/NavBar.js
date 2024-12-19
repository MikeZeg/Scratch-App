import React from "react"
import { ReactDom } from "react-dom"
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import '../../styles/navBarStyle.css'

export const NavBar = () => {
// working on that component

    return (
        <div className="navBar__style">
            <section className="navbar__box home" onClick={()=>{console.log('Click to home')}}>Home</section>
            <section className="navbar__box stats" onClick={()=>{console.log('Click to Stats')}}>Stats</section>
            <section className="navbar__box profile" onClick={()=>{console.log('Click to Profile')}}>Profile</section>
            <section className="navbar__box scratches" onClick={()=>{console.log('Click to scratch')}}>Scratches</section>
        </div>
    )
}