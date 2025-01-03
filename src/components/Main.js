import React from "react"
import { useNavigate} from "react-router-dom";
import "../styles/mainStyle.css";
import { LogOut } from "./login/LogOut";
import { User } from "./mainComponents/User.js";
import { Content } from "./mainComponents/Content.js";
import { NavBar } from "./mainComponents/NavBar.js";

export const Main = () => {

    const goTo = useNavigate();

    return (
        <div className="main">
            <section className="navBar">
                <NavBar/>
            </section>
            
            <section className="main__top">
                <div id="welcomeUser">
                    <div id="settingUser">
                        <img className="userImage"></img>
                        <button className="btn rounded" onClick={()=>{goTo('/Setting')}}>Setting</button>
                        {/* <Setting /> */}
                        <LogOut  myData = {data => console.log("Log oFF from main level")} />
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