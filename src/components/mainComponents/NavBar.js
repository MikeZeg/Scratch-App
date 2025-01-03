import React from "react"
import { ReactDom } from "react-dom"
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import '../../styles/navBarStyle.css'

export const NavBar = () => {

    const goTo = useNavigate()    

    return (
        <div className="navBar__style">
            <div className="boxes__height">
                {/* add links to  */}
                <div className="navBar__box" id="box-home" onClick={()=>{console.log('Click to home')}}></div>
                <div className="navBar__box" id="box-stats" onClick={()=>{console.log('Click to Stats')}}></div>
                <div className="navBar__box" id="box-profile"  onClick={()=>{goTo('/Setting')}}></div>
                <div className="navBar__box" id="box-scratches" onClick={()=>{console.log('Click to scratch')}}></div>
            </div>
        </div>
    )
}