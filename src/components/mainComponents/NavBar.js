import React from "react"
import { ReactDom } from "react-dom"
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import '../../styles/navBarStyle.css'

export const NavBar = () => {
    return (
        <div className="navBar__style">
            <section className="navbar__box">Home</section>
            <section className="navbar__box">Statistic</section>
            <section className="navbar__box">Profile</section>
            <section className="navbar__box">Scratches</section>
        </div>
    )
}