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
// Download userScrachcard Data
    const userScratchCollection = collection(db,"scratchcardUsed")
// Download data
    const scratchCollection = collection(db, "scratchCard");


// All scratchcards Collect Data from Firebase - used useEffect? to monitoring changes.
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

    const UserAddScratchcard = ({ data }) => {
        const userId = auth?.currentUser?.uid;
        
        return (
            <div className="contentUserAddScratchcard">
                <p>User scratchcard filtred by currentUser UID:</p>
                <div id="lastCards">
                    {data.filter((card) => card.userNo == userId)
                        .map((card)=>
                            
                        (
                        <section key={card.id}>
                            <br/>
                            <p>{card.name}</p>
                            <p>{card.topPrize == false ? ("!!! Win Top prize !!!")
                            :("All Top Prize Gone.")
                            }</p>
                            
                            {/* <img></img> add image to card */}
{/* Add value win price if user win cash */}
                            <p>{card.win != false ? (<strong>Last Time You Win : £</strong>)
                            :("Next Time Win chance is: ")
                            }</p>
                            
                        </section>
                    ))}        
                </div>
                <div id="addCards">
                    {/* choose card -> from database
                    win ? yes : no
                    if yes -> topPrize ?
                    if yes -> Congatulation :)
                    if not -> add other price */}

                </div>
            </div>
        )
    }

    useEffect(()=>{
        getScratchList();
        getUserScrachcard();
        
    },[])

    return (
        <div className="main__content">
            <div className="content__subtitle">
                <p>Please check ScratchCard in our database</p>
            </div>

            <div id="contentScratchcard" className="auto__scroll">
                    {scratch.map((card)=> (
                        <section key={card.id} className="cards__info">
                            <br/>
                            <img className="cardImage"></img>
                            <div>
                                <p className="cardName" ><strong>ScratchCard:</strong> {card.name}</p>
                                <p className="cardPrice" ><strong>Price:</strong> {card.price}</p>
                                <p className="cardTopWin" ><strong>Top Prize to win:</strong> {card.topPrize}</p>
                                <p className="cardWinLeft" >{card.topPrizeLeft > 0 ?
                                    "You have chance to win top PRIZE !!!"
                                    :"All top prizes already gone :/"}</p>
                            </div>
                        </section>
                    ))}
            </div>
            <div className="contentUser">
                <p className="content__subtitle">Your info</p>
                
                <div id="contentUserCards" className="auto__scroll">
                    <UserAddScratchcard data = {userScratch}/>
                </div>
            </div>
        </div>
    )
}