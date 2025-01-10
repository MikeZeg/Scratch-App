import React, {useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import '../../styles/scratchStatsStyle.css';
import '../../styles/mainStyle.css';
import '../../styles/navBarStyle.css';
import { NavBar } from './NavBar';
import { db, auth} from "../../config/firebase.js";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";


export const ScratchStats = () => {
    const [scrachCard, setScratchCard ] = useState([]);
    const [userCards , setUserCards ] = useState([]);

    const goTo = useNavigate();
    const scratchCollection = collection(db, "scratchCard")
    const userScratchCollection = collection(db, "scratchcardUsed")
  
// Functions
    const getScratchList = async () => {
        try {
            const data = await getDocs(scratchCollection);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            console.log('data from scrach stats')
            setScratchCard(filterData)
        } catch(err){console.log(err)}
    }
    const getUserScratchCards = async () => {
        try {
            const data = await getDocs(userScratchCollection);
            const userScratchcards = data.docs.map((card) => ({
                ...card.data(),
                id: card.id,
            }))
            setUserCards(userScratchcards)
        } catch(err){console.log(err)}
    }

// Refresh data
    useEffect(()=>{
        console.log('Refresh data - ScratchStats');
        getScratchList();
        getUserScratchCards();
    },[])

// --------- Components --------- Components --------- 

    // --------- Display scratch Cards in dataBase ---------
    const DisplayCards = ({scratch, usersScratch}) => {
        const [ratio, setRatio ] = useState('')
        const [ cashWin , setCashWin ] = useState('')
        const [ cashSpend, setCashSpend ] = useState('')
        // console.log(scratch, usersScratch)

        const totalCards = scratch.length;

    //winnig ratio - users scratch cards add to.
        const winRatio = () => {
            let winScratch = 0;
            let cashTotal = 0;
            let cashTotalSpend = 0;

            usersScratch.map((card)=> {

                let checkPrice = card.name
            // check card price in scratch card db
                scratch.map((card) => {
                    if(card === checkPrice){
                        cashTotalSpend += card.price
                        console.log('check price', card)
                    }
                })

                if(card.win === true ){
                    winScratch++;
                    cashTotal += parseInt(card.winPrize);
                }
            })
            setRatio(winScratch / totalCards * 100)
            setCashWin(cashTotal)
            setCashSpend(cashTotalSpend);
        }
        
        useEffect(()=>{
            winRatio();
        },[])
        
        return (
            <div className='scratchStats__displayCards'>
                <div className='displayCards__info'>
                    <h2 >All Scratch Cards: <p> {totalCards} </p> </h2>
                    <h2> Winning Ratio: <p>{ratio}</p></h2>
                    <h2>Total Cash Win: <p>{cashWin}</p></h2>
                    <h2>{cashSpend}</h2>
                </div>

                <div className='scratchCards auto__scroll'>
                    
                    {scratch.map((card, index) => (
                        <section className='display__card' key={card.id.toString()} id={`card${index.toString()}`}>
                            <img src={card.img}/>
                            
                                <p>{card.name}</p>
                                <p>Price: {card.price}</p>
                                <p>Top Prize: {card.topPrize}</p>
                                <p>Top Prize Left to Win: {card.topPrizeLeft}</p>
                            
                        </section>
                    ))}
                </div>
            </div>
        )
    }
// ------ Display stats for all scratch

    return (
        <div className='scratchStats'>

            <div className='scratchStats__navBar'>
                <NavBar/>
            </div>

            <div className='scratchStats__content'>
                <DisplayCards 
                    scratch = {scrachCard}
                    usersScratch = {userCards}
                    />
                <section > Give diagram winning ratio - all users</section>
                <section > Give user diagram winning ration - select data? </section>
                <button className='btn rounded' onClick={()=>{goTo('/Main')}}> Go To Main</button>
            </div>

        </div>
    )
}