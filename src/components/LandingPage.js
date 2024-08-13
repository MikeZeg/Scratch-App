import React, { useState, useEffect } from "react";
import ReactDom from "react-dom/client";
import "../styles/landingPageStyle.css"

import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { SignIn } from "./login/SignIn.js";
import { LogOut } from "./login/LogOut.js";
import { Main } from "./Main.js";

//  ------ MAIN APP ------
const LandingPage = () => {

    const [checklogged, setCheckLogged] = useState(null);
    const signIn = useNavigate();
    
    onAuthStateChanged(auth,(user) => {
        if(user){
            // console.log('User logged')
            setCheckLogged(user)
        }else {
            // console.log("not login")
        }
    })

// Location 
    const goToSignIn = () => {
        signIn('/CreateAccount')
    }
    const goToLogIn = () => {
        signIn('/SignIn')
    }
    const goToMain = () => {
        signIn('/Main')
    }
    
// Login Button
    const BtnLogin = () => {        
        return (
            <button className="btn nav__btn" onClick={()=>{goToLogIn()}}>Log In</button>
        )
    }

    return (
        <div>
            <header className="header">
            {/* logo */}
                <div className="logo">
                    {/* <img src="" alt="company logo" className="header__logo__img"/> */}
                </div>
            {/* navigation */}
                <div className="nav">
                    { checklogged !== null ? <LogOut myData = {data => setCheckLogged(data)}/> : <BtnLogin/> }
                    <button className="btn nav__btn" onClick={()=>{goToSignIn()}}>Sign Up</button>
                </div>
            </header>

            {/* Content */}
            <main className="main">
                <div className="container">
                    <h1 className="title h1">Scratch App</h1>
                    <h2 className="subtitle h2">Discover the Thrill of Instant Winnings with the Scratch App</h2>
                    
                    <div className="list">
                        <p className="p">Instantly see your chances of winning big prizes in UK scratch games</p>
                        <p className="p">Comprehensive database of scratch card details and odds</p>
                        <p className="p">Personalized recommendations to maximize your winnings</p>
                    </div>

                    <div id="btn-mid">
                        {checklogged !== null ? (<button onClick={()=>{goToMain()}}  className="btn nav__btn">Get In </button>) : (<button className="btn nav__btn" onClick={()=>{goToSignIn()}}>Sign Up</button>)}
                    </div>

                    <p className="p content">The Scratch App is your key to unlocking the excitement of instant win scratch cards in the UK. 
                    With a vast database of game details and odds, you'll know exactly what your chances are of hitting the jackpot before you even scratch. 
                    Get personalized recommendations on the best cards to play and make the most of every pound spent. 
                    Whether you're a seasoned scratcher or new to the thrill, the Scratch App puts the power to win big right at your fingertips.</p>
                </div>
            </main>
            
            {/* Footer */}
                <footer className="footer">
                    <p className="p footer__p">Handcraf By <a href="https://www.github.com/MikeZeg" target="_blank" className="handcraft a-link">MikeZeg</a> ©2024</p>
                </footer>
        </div>
    );
}

export default LandingPage;