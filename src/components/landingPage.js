import React from "react";
import ReactDom from "react-dom/client";
import "../styles/landingPageStyle.css"
import {} from "../config/firebase.js";


const LandingPage = () => {

    return (
        <div>
            <header>
            {/* logo */}
                <div className="logo">
                    <img src="" alt="company logo" className="logo__img"/>
                </div>
            {/* navigation */}
                <div>
                    <button>Log In</button>
                    <button>Sign Up</button>
                </div>
            </header>

            {/* Content */}
            <main>
                <div className="container">
                    <h1 className="title">Scratch App</h1>
                    <h2 className="subtitle">Discover the Thrill of Instant Winnings with the Scratch App
                    <p>Instantly see your chances of winning big prizes in UK scratch games</p>
                    <p>Comprehensive database of scratch card details and odds</p>
                    <p>Personalized recommendations to maximize your winnings</p>

                    <p>The Scratch App is your key to unlocking the excitement of instant win scratch cards in the UK. 
                    With a vast database of game details and odds, you'll know exactly what your chances are of hitting the jackpot before you even scratch. 
                    Get personalized recommendations on the best cards to play and make the most of every pound spent. 
                    Whether you're a seasoned scratcher or new to the thrill, the Scratch App puts the power to win big right at your fingertips.</p></h2>
                </div>
            </main>
            
            {/* Footer */}
                <footer className="footer">
                    <p>Handcraf By <a href="https://www.github.com/MikeZeg" target="_blank" className="handcraft">MikeZeg</a> ©2024</p>
                </footer>
        </div>
    );
}

export default LandingPage;