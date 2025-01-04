import React from 'react';
import { useNavigate} from "react-router-dom";
import '../../styles/scratchStatsStyle.css';
import '../../styles/mainStyle.css';
import '../../styles/navBarStyle.css';
import { NavBar } from './NavBar';


export const ScratchStats = () => {
    const goTo = useNavigate();

    return (
        <div className='scratchStats'>

            <div className='scratchStats__navBar'>
                <NavBar/>
            </div>

            <div className='scratchStats__content'>  
                <section > Check scratch Cards </section>
                <section > Give diagram winning ratio - all users</section>
                <section > Give user diagram winning ration - select data? </section>
                <button className='btn rounded' onClick={()=>{goTo('/Main')}}> Go To Main</button>
            </div>

        </div>
    )
}