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
    // All scratch Cards
    const getScratchList = async () => {
        try {
            const data = await getDocs(scratchCollection);
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setScratchCard(filterData)
        } catch(err){console.log(err)}
    }
    // All users scratch cards
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
        // console.log('Refresh data - ScratchStats');
        getScratchList();
        getUserScratchCards();
    },[])

// --------- Components --------- Components --------- 

    // --------- Display scratch Cards in dataBase ---------
    const DisplayCards = ({scratch, usersScratch}) => {
        const [ ratio, setRatio ] = useState('')
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
                scratch.forEach((card)=>{
                    if(card.name === checkPrice){
                        cashTotalSpend += card.price
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
            winRatio()
        },[])
        
        return (
            <div className='scratchStats__displayCards'>
                <div className='displayCards__info'>
                    <h2 className='stats__info'>All Scratch Cards<p>{totalCards} </p> </h2>
                    <h2 className='stats__info'> Winning Ratio<p>{ratio} %</p></h2>
                    <h2 className='stats__info'>Users win<p>{cashWin} £</p></h2>
                    <h2 className='stats__info'>Users spend total<p>{cashSpend} £</p></h2>
                </div>

                <div className='scratchCards auto__scroll'>
                    
                    {scratch.map((card, index) => (
                        <section className='display__card' key={card.id.toString()} id={`card${index.toString()}`}>
                            <figcaption className='display__card__img'>
                                <img src={card.img}/>
                            </figcaption>
                            <div className='display__card__info'>
                                <p><span>{card.name}</span></p>
                                <p>Price: <span>{card.price}</span></p>
                                <p>Top Prize: <span>{card.topPrize}</span></p>
                                <p>Top Prize Left to Win: <span>{card.topPrizeLeft}</span></p>
                            </div>
                                <Details
                                    card = {card}
                                    index = {index}
                                    cardId = {card.id}
                                    userCards = {usersScratch}
                                />
                        </section>
                    ))}
                </div>
            </div>
        )
    }
// ------- Details component ------
    const Details = ({card, index, cardId, userCards}) => {
        const [printed, setPrinted] = useState('')
        const [totalWin, setTotalWin] = useState('')
        const [expense, setExpense] = useState('')
        const [userBuy, setUserBuy] = useState('')
        const [ratio, setRatio] = useState('')

        // function
        const handleSubmit = ({card, index, cardId}) => {
            document.getElementById(`card${index}Stats`).classList.toggle('showStats')
            document.getElementById(`card${index}Stats`).classList.toggle('card__stats__showStats')
            let cardPrice = card['price']
    
            cardStats(card.name, cardPrice)
        }
        //Refresh Data
        const refreshData = () => {
            console.log('data refresh data')
        }
    
    //  Check card stats
        const cardStats = (chooseCard, cardPrice) => {
        //  total card
            const totalAdd = userCards.filter((add)=> add.name === chooseCard)
        //  total spend
            let totalSpend = (cardPrice * totalAdd.length)
            totalSpend <= 0 ? setExpense('No buy yet') : setExpense(totalSpend)
                
        // total win
            const checkWin = totalAdd.filter((total) => total.win === true)
                                .map((add) => parseInt(add.winPrize))
                                .reduce((acc, curr)=> acc + curr, 0)
            checkWin > 0 ? setTotalWin(checkWin+'£') : setTotalWin('Not Win Yet')

        // Wining Ratio
            const wininigCards = totalAdd.filter((win) => win.win == true)
            let cardRatio = parseInt((wininigCards.length / totalAdd.length)*100)
            cardRatio > 0 ? setRatio(cardRatio+'%') : setRatio('No Win')
        }
        
        // total cards refresh onClick - 179           
        useEffect(()=>{
            // console.log('refresh data - cards printedAmount value')
            setPrinted(card.printedAmount)
        },[handleSubmit])

        return (
            // add card name before - toggle change status on existing card in parent
            <div className='card__stats'>
                <div className='card__stats__showStats' id={`card${index}Stats`}>
                    <button
                        className='btn'
                        id='btn-closeCardStats'
                        onClick = {()=>{
                            handleSubmit({card, index, cardId});}
                        }
                    >X</button>
                    {/* Mian info about scratch Card */}
                    <section className='stats__info__card'>
                        <button onClick={()=>{refreshData()}} className='btn' id='btn-refreshStats'>Refresh Data</button>
                        <div className='stats__info__card__details'>
                            <h1 className='stats__info__cardName'>Stats for <p>{card.name}</p></h1>
                            <div className='stats__info__flex'>
                                <h2 className=''>Total scratched cards<p>{printed}</p></h2>
                                <h2>Total Wins<p>{totalWin}</p></h2>
                                <h2>Win Precentage <p>{ratio}</p></h2>
                            </div>
                        </div>
                    </section>
                    {/* diagram for winning chance */}
                    <section className='stats__diagram'>
                        <div className='char'>

                        </div>
                    </section>
                </div>

                <button
                    onClick = {()=>{
                        handleSubmit({card, index, cardId});}
                    }
                >Press to check stats!!!</button>
            </div>
        )
    }

    return (
        <div className='scratchStats'>

            <div className='scratchStats__navBar'>
                <NavBar/>
            </div>

            <div className='scratchStats__content'>
                <button className='btn rounded' id='stats-btn' onClick={()=>{goTo('/Main')}}> Go To Main</button>
                <DisplayCards 
                    scratch = {scrachCard}
                    usersScratch = {userCards}
                    />
                {/* <section > Give diagram winning ratio - all users</section> */}
            </div>
        </div>
    )
}