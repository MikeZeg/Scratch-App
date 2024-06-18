import React, { useEffect } from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainContentStyle.css";
import { db, auth } from "../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";




export const Content = () => {
// Scratch Data fetch
    const [scratch, setScratch] = useState([]);
// User scratch Data fetch
    const [userScratch, setUserScratch] = useState([]);

    console.log("user id", auth?.currentUser?.uid)


// Download data
    const scratchCollection = collection(db, "scratchCard");
// Collect Data from Firebase - used useEffect to monitoring changes.
    const getScratchList = async() => {
        try{
            const data = await getDocs(scratchCollection);
            const filterData = data.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            // console.log("Data from getScratchList ->>",filterData)
            setScratch(filterData)
        } catch(err){console.error(err)}
    }

// Download userScrachcard Data
    const uesrScratchCollection = collection(db,"scratchcardUsed")
// Filtred data to using in app
    const getUserScrachcard = async () => {
        try {
            const data = await getDocs(uesrScratchCollection);
            const userScratchcard = data.docs.map(()=>{

                //filted data by userd UID and add filter Information like how many cards added, ration cash (spend, win), favorite scratch, chance to win to selected scratchcard

            })
            setUserScratch(userScratchcard)
            console.log("filtred Data: -->: ",userScratchcard)
        } catch(err){console.error(err)}
    }


    const UserAddScratchcard = () => {
        return (
            <div className="contentUserAddScratchcard">
                
            
            
            
            </div>
        )
    }

    useEffect(()=>{
        getScratchList();
    },[])

    return (
        <div>
            <h1>Please check Your Scratches below: </h1>
            <h2>List of available scratchcards: </h2>

        <div className="contentScratchcard">
            {scratch.map((card)=> (
                <section key={card.id}>
                    <br/>
                    <img className="cardImage"></img>
                    <p className="cardName" ><strong>ScratchCard:</strong> {card.name}</p>
                    <p className="cardPrice" ><strong>Price:</strong> {card.price}</p>
                    <p className="cardTopWin" ><strong>Top Prize to win:</strong> {card.topPrize}</p>
                    <p className="cardWinLeft" >{card.topPrizeLeft > 0 ?
                            "You have chance to win top PRIZE !!!"
                            :"All top prizes already gone :/"}</p>
                </section>
            ))}
        </div>

        </div>
    )
}