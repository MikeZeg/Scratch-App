import React from "react"
import { useNavigate} from "react-router-dom";
import '../../styles/navBarStyle.css'

export const NavBar = () => {
    const goTo = useNavigate()

    return (
        <div className="navBar__style">
            <div className="boxes__height">
                {/* add links to  */}
                <div className="navBar__box" id="box-home" onClick={()=>{goTo('/Main')}}></div>
                <div className="navBar__box" id="box-stats" onClick={()=>{goTo('/ScratchStats')}}></div>
                <div className="navBar__box" id="box-profile"  onClick={()=>{goTo('/Setting')}}></div>
                <div className="navBar__box" id="box-scratches" onClick={()=>{console.log('Click to scratch')}}></div>
            </div>
        </div>
    )
}