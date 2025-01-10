import React, {useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import '../../styles/scratchStatsStyle.css';
import '../../styles/mainStyle.css';
import '../../styles/navBarStyle.css';
import { NavBar } from './NavBar';
import { db, auth} from "../../config/firebase.js";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";


const UserScratchStats = () => {
    const [ userScratch, setUserScratch ] = useState([])
    
    
    const goTo = useNavigate();
    const userScratchCollection = collection(db,"scratchcardUsed")


    const getUserScrachcard = async () => {
        try {
            const data = await getDocs(userScratchCollection);
            const userScratchcard = data.docs.map((card)=>({
                ...card.data(),
                id: card.id,
            }))
            setUserScratch(userScratchcard)
            // console.log("filtred Data: -->: ",userScratchcard)
        } catch(err){console.error(err)}
    }



    return (
        <div className='userScratchStats'>

        </div>
    )
}