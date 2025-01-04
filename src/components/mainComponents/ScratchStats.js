import React from 'react';
import { useNavigate} from "react-router-dom";
import '../../styles/scratchStatsStyle.css'
import { NavBar } from './NavBar';


export const ScratchStats = () => {
    const goTo = useNavigate();

    return (
        <>
            <NavBar/>
            <div className='scratchStats'>  
                <section > Check scratch Cards </section>
                <section > Give diagram winning ratio - all users</section>
                <section > Give user diagram winning ration - select data? </section>
                <button className='btn rounded' onClick={()=>{goTo('/Main')}}> Go To Main</button>
            </div>
        </>
    )
}