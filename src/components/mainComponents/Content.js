import React, { useEffect, useState } from "react"
import { ReactDom } from "react-dom";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainContentStyle.css";
import { db, auth, app } from "../../config/firebase.js";
import { getDocs, collection, updateDoc, doc, writeBatch } from "firebase/firestore";
import { submit } from "../../config/submit.js"
import { update } from "firebase/database";

export const Content = () => {
// Scratch Data fetch
    const [scratch, setScratch] = useState([]);
// User scratch Data fetch
    const [userScratch, setUserScratch] = useState([]);
// Download userScrachcard Data
    const userScratchCollection = collection(db,"scratchcardUsed")
// Download data
    const scratchCollection = collection(db, "scratchCard");

// Functions
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
// Show - Hiding wining value
        const showWininigPrize = () => {
            const showPrize = document.querySelector("#winning");
            console.log("Show!!");
            showPrize.style.display = 'grid';
        }
        const hidingWiningPrize = () => {
            const showPrize = document.querySelector("#winning");
            console.log("Hiding!!")
            showPrize.style.display = 'none';
        }

//---------  Component -----------
    const Details = ({cards, usedCards}) => {
        
        const showDetails = () => {
            console.log('details clicked')
            console.log(cards)
        }
        // check how many that cards was used and compare with total printed.
        // check how many times that card give the win and compare to average.
        // give chance to win top prize and any win.
        
        return (
            <div>
                <div className="details-hidden">
                    <p>Cards name: {cards.name}.</p>
                    <p>Card prize: {cards.price}.</p>
                    <p>Cards Top Prize: {cards.topPrize}.</p>
                    <p></p>
                </div>
                <button className=" details-btn" onClick={()=> showDetails()}>Details</button>
            </div>
        )
    }

    // User add Card to database and received information about what scratchcard he added
    const UserAddScratchcard = ({ data }) => {
        const userId = auth?.currentUser?.uid;
        const [hidden, setHidden ] = useState(false)
        const [userscratchcards, setUserscratchcards] = useState(data.length)

        const showAddCardOption = () => {
            const grab = document.querySelector("#addCards")
            const grabMain = document.querySelector('body')
                        
            setHidden(!hidden)

            if(hidden == false){
                console.log(hidden)
                grab.classList.remove("hidden-addCards")
                grabMain.classList.add("stopScroll")

            }if(hidden == true){
                console.log(hidden)
                grab.classList.add("hidden-addCards")
                grabMain.classList.remove("stopScroll")
            }
        }
//update value in firestor
        const hideCard = async (card) => {
            console.log("pressed",card)
            await updateDoc(doc(db, "scratchcardUsed", card),{display: "false"})
            // Refresh without reload page ??
            // window.location.reload()
            getUserScrachcard();
        }

        return (
            <div className="contentUserAddScratchcard">
{/* ---------- I section ----------- */}
                <p>Total added scratchcard {userscratchcards}. </p>
                <p>Your added scratchcard below. Total by you: </p>
                <div id="lastCards" className="auto__scroll">
                    {data.filter((card) => card.userNo == userId)
                        .filter((card) => card.display === "true")
                        .map((card)=>
                        (
                        <section key={card.id} className="cards__info">
                            <br/>
                            <p>{card.name}</p>
                            <p>{card.topPrize == false ? ("!!! Win Top prize !!!")
                            :("All Top Prize Gone.")
                            }</p>
                            
                            {/* <img></img> add image to card */}
{/* Add value win price if user win cash */}
                            <p>{card.win != false ? (<strong>Last Time You Win: {card.winPrize} £</strong>)
                            :("Next Time Win chance is: ")
                            }</p>
                            <button 
                                className="btn hidden__scratchcard" 
                                onClick={()=> hideCard(card.id)}
                            >Press to hidden</button>
                        </section>
                    ))}        
                </div>
{/*  ----------- II section ---------------- */}
                <div id="addCards" className="hidden hidden-addCards">
                    
                    <button id="hidden-addCard-btn" className="btn" onClick={()=> showAddCardOption()}>X</button>

                    <div id="addCardsContent">
                        <section id="hidden-addCards-inputs">
            {/* select scratch */}
                            <label id="cardsChooseLabel" htmlFor="cardsChoose" className="addCards-text">Choose a scratchcard</label>
                            <select id="cardsChoose" name="cards" >
                                {scratch.map((card)=> (
                                    <option key={card.id} value={card.name}>{card.name}</option>
                                ))}
                            </select>

                            <form id="win-input-radio">
                                <p id="winQuestion" className="addCards-text">Winning ticket</p>

                                <input 
                                    className="input-radio"
                                    type="radio" 
                                    id="winQuestionYes" 
                                    name="if_win" 
                                    value="yes"
                                    onChange={(e)=>{showWininigPrize(e.target)}}
                                    />
                                <label className="input-radioText">Yes</label>

                                <input 
                                    className="input-radio" 
                                    type="radio" 
                                    id="winQuestionNo" 
                                    name="if_win"
                                    onChange={(e)=>{hidingWiningPrize(e.target)}}
                                    value="no"/>
                                <label className="input-radioText">No</label>
                            </form>
                            
                            <input
                                className="hidden"
                                type="number"
                                id="winning"
                                name="winning"
                                placeholder="Wining value"
                                min={2}/>
                            <input type="submit" id="addCardBtn" className="btn" onClick={()=>{
                                submit();
                                showAddCardOption();
                                getUserScrachcard();
                                console.log('Information about added scratchcard, or added other component')
                                alert("Scratch Added")
                            }}/>
                        </section>

                        {/* <section id="hidden-addCards-img">
                            <figure>
                                <img id="" className="img"></img>
                                <figcaption>
                                </figcaption>
                            </figure>
                        </section> */}
                    </div>

                </div>
                <button onClick={()=> showAddCardOption()} className="btn btn-mg-bottom">Press to add cards</button>
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
                    <div>
                        <section key={card.id} className="cards__info">
                            <br/>
                            <img className="cardImage" src={card.img}></img>
                            <div>
                                <p className="cardName" ><strong>ScratchCard:</strong> {card.name}</p>
                                <p className="cardPrice" ><strong>Price:</strong> {card.price}</p>
                                <p className="cardTopWin" ><strong>Top Prize to win:</strong> {card.topPrize}</p>
                                <p className="cardWinLeft" >{card.topPrizeLeft > 0 ?
                                    "You have chance to win top PRIZE !!!"
                                    :"All top prizes already gone :/"}</p>
                            </div>
                        </section>
                        <Details 
                            cards = {card}
                            usedCards = {userScratch}
                        />
                        {/* <button className=" details-btn">Details</button> */}
                    </div>
                    ))}
            </div>

            <div className="contentUser">
                <p className="content__subtitle">Your info</p>
                
                <div id="contentUserCards" className="">
                    <UserAddScratchcard data = {userScratch}/>
                </div>
            </div>
        </div>
    )
}