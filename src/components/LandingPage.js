import React, { useState } from "react";
import "../styles/landingPageStyle.css"
import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LogOut } from "./login/LogOut.js";

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
// Login Button
    const BtnLogin = () => {        
        return (
            <button className="btn nav__btn" onClick={()=>{signIn('/SignIn')}}>Log In</button>
        )
    }

    return (
        <div>
            {/* Content */}
            <main className="main__LandingPage">
                <div className="container">
                    <section className="container__content">
                        <h1 className="title h1">Scratch App</h1>
                        <h2 className="subtitle h2">Discover the Thrill of Instant Winnings with the Scratch App</h2>

                        <div className="login">
                            { checklogged !== null ? (<button onClick={()=>{signIn('/Main')}}  className="btn nav__btn">Get In</button>) : ''}
                            { checklogged !== null ? <LogOut myData = {data => setCheckLogged(data)}/> : <BtnLogin/> }
                            <button className="btn nav__btn" onClick={()=>{signIn('/CreateAccount')}}>Sign Up</button>
                        </div>
                    </section>

                    <section className="container__img">
                        <figure className="container__figure">
                            <img className="img" alt="figure"></img>
                        </figure>
                    </section>
                </div>
            </main>
            
            {/* Footer */}
                <footer className="footer">
                    <p className="p footer__p">Handcraf By <a href="https://www.github.com/MikeZeg" target="_blank" rel="author" className="handcraft a-link">MikeZeg</a> ©2024</p>
                </footer>
        </div>
    );
}

export default LandingPage;