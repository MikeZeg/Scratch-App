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
// User ID
    // const userUid = auth?.currentUser?.uid
    // console.log("ID", userUid)

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
    const Details = ({cards, usedCards, cardNo,index}) => {
        const [hidden, setHidden] = useState(false)
        const [totalWinRatio, setTotalWinRatio] = useState("")
        const [userWinRatio, setUserWinRatio] = useState("")
        const [userBuyScratchTime , setUserBuyScratchTime] = useState("")
        const [ winingTopPrize , setWiningTopPrize] = useState("")

        let primaryWin = parseFloat(cards.FirstChanceToWin) * 100;
        
        const handleSubmit = (card,index, event) => {
            // document.querySelector(`#card${index}Details`).classList.toggle('details__hidden');
            document.getElementById(`card${index}Details`).classList.toggle('details__hidden');
            document.querySelector("body").classList.toggle('stopScroll')
        }

        const chanceToWinAny = (cards) => {
            const scratchcardInfo = scratch.filter((card) => card.name == cards.name)
        //basic win by scratchcard
            const basicWinChance = scratchcardInfo[0].FirstChanceToWin;
            console.log("Basic chance to win: ", basicWinChance)
        // user added scratchcards ratio
            const addScratch = userScratch.filter(( addCard ) => addCard.name == cards.name)
        
            const win = addScratch.filter(( addCard ) => addCard.win == true)
            console.log(win)
            const lose = addScratch.filter(( addCard ) => addCard.win == false)
            console.log(lose)
            const userRatio = parseInt(win.length / lose.length )*100 ;

            console.log("win: ", win.length)
            console.log("lose: ", lose.length)

            console.log("Ratio check by users: ", userRatio)
        }
// chance to win top prize 
        const winTopPrize = (cards) => {
            const scratchInfo = scratch.filter((card) => card.name == cards.name)
        
        // pressed scratchcard top prize left
            const scratchTopPrizeLeft = scratchInfo[0].topPrizeLeft
            console.log("Scratch top prize left: ",scratchTopPrizeLeft)

        // pressed scratchcard printed amount
            const scratchPrinted = scratchInfo[0].printedAmount
            console.log('Printed scrachcard: ', scratchPrinted)

        // scratchcards added by users
            const usersCards = userScratch.filter((addCards) => addCards.name == cards.name )
                                        .filter((addCards)=> addCards.topPrize != true )
            console.log('cards added by users: ', usersCards)

            const result = (parseInt(scratchTopPrizeLeft) / (parseInt(scratchPrinted) - usersCards.length)) * 100
            console.log("result: ",result, '%')
            // console.log("Chance to win top: ", parseInt(scratchTopPrizeLeft) / (parseInt(scratchPrinted) - usersCards.length) )
            setWiningTopPrize(result)
        }
// User ratio - compare winning cards added by user
        const userRatio = (cards) => {
            const userUid = auth?.currentUser?.uid
            
            const myArr = userScratch.filter((card) => card.userNo == userUid)
                        .filter((card) => card.name == cards.name)

            const winArr = myArr.filter((card) => card.win == true)

            setUserBuyScratchTime(myArr.length)
            setUserWinRatio( (winArr.length / myArr.length)*100)
        }
// wining ratio by scratch by all users
        const winingRatio = (cards) => {
            let result = 0;
            let numberOfWinScratch = 0;
            let ratio = 0;

            const myArr = userScratch.filter((card) => card.name === cards.name)
            // console.log("Array: ",myArr)
            myArr.forEach((cardPrise)=> {
                if(parseInt(cardPrise.winPrize) > 0){
                    numberOfWinScratch ++;
                    result += parseInt(cardPrise.winPrize)
                    // console.log("scratch card win: ", numberOfWinScratch)
                    // console.log("total win prise: ", result)
                }
                return ratio = (numberOfWinScratch / (myArr.length))*100
            })
            setTotalWinRatio(ratio)
        }

        return (
            <div>
                <div className="card-details details__hidden details__show" id={`card${index}Details`}>
                    <button 
                    className="btn"
                    id="btn-cardDetalis"
                    onClick={()=>{
                        handleSubmit(cards, index)}
                    }> X </button>

                    <div className="display">

                        <div className="card__details__top">
                            <p className="card__title "><span className="card__details__weight">{cards.name}</span></p>
                        </div>

                        <div className="breakLine"></div>

                        <div className="card__details__info">
                            <p className="font__Size">Card prize: {cards.price}£.</p>
                            <p className="font__Size">Cards Top Prize: {cards.topPrize}.</p>
                            <p className="font__Size">Top price left: {cards.topPrizeLeft}</p>
                        </div>

                        <div className="breakLine"></div>

                        <div className="wining__calculation">
                            <p className="font__Size">Your chance to Win any price:  <span>{primaryWin}%</span></p>
                            <p className="font__Size">Chance to win Top Prize: <span>{winingTopPrize}%</span></p>
                            <p className="font__Size">You buy scratch: {userBuyScratchTime} times</p>
                            <p className="font__Size">Your Win Ration: {userWinRatio} %</p>
                            <p className="font__Size">Win Ration related all users: {totalWinRatio} %</p>
                        </div>

                        <div className="breakLine"></div>

                    </div>

                </div>
                <button className="details-btn" onClick={()=> {
                    handleSubmit(cards, index)
                    winingRatio(cards)
                    userRatio(cards)
                    winTopPrize(cards)
                    chanceToWinAny(cards)
                }}
                >Details</button>
            </div>
        )
    }

    // User add Card to database and received information about what scratchcard he added
    const UserAddScratchcard = ({ data }) => {
        const userId = auth?.currentUser?.uid;
        const [hidden, setHidden ] = useState(false)
        const [userscratchcards, setUserscratchcards] = useState(data.length);

        const showAddCardOption = () => {
            const grab = document.querySelector("#addCards");
            const grabMain = document.querySelector('body');
                        
            setHidden(!hidden)

            if(hidden == false){
                console.log(hidden);
                grab.classList.remove("hidden-addCards");
                grabMain.classList.add("stopScroll");

            }if(hidden == true){
                console.log(hidden);
                grab.classList.add("hidden-addCards");
                grabMain.classList.remove("stopScroll");
            }
        }
//update value in firestor
        const hideCard = async (card) => {
            console.log("pressed",card)
            await updateDoc(doc(db, "scratchcardUsed", card),{display: "false"})
            getUserScrachcard();
        }

        return (
            <div className="contentUserAddScratchcard">
{/* ---------- I section ----------- */}
                <p>Total added scratchcard {userscratchcards}. </p>
                <p>Your added scratchcard below. Total by you: </p>
                <button className="btn">Reset all scratchcards to display ??</button>
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
                    {scratch.map((card, index)=> (
                    <div key={card.id.toString()} id={`card${index.toString()}`}>
                        <section  className="cards__info">
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
                            cardNo = {card.id}
                            index={index}
                        />
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