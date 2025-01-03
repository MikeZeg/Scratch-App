import React from 'react';
import { useNavigate} from "react-router-dom";
import '../../styles/scratchStatsStyle.css'
import { NavBar } from './NavBar';


export const ScratchStats = () => {
    const goTo = useNavigate();

    return (
        <div className='scratchStats'>  
            <NavBar/>
            <button className='btn rounded' onClick={()=>{goTo('/Main')}}> Go To Main</button>
        </div>
    )
}