import { useState } from "react";
import { db, auth } from "./firebase"
import { getDocs, collection, addDoc, getDoc } from "firebase/firestore";



export const submit = async () => {
    const scratchCard = collection(db, "scratchCard")
    const scratchcardUsed = collection(db, "scratchcardUsed")
    const userNo = auth.currentUser.uid
//Fetch
    const cardsChoose = document.getElementById("cardsChoose");
    const selectedcardsChoose = cardsChoose.options[cardsChoose.selectedIndex].text
    const winingPrize = document.getElementById("winning");
    const hidenAddCards = document.getElementById('addCards');
    
    console.log("Submit its working!!");
    console.log(auth.currentUser.uid)
    
// Statment - Change status 
    let topPrize = false
    let win = false

    winingPrize.value >= 0 ? win = true : win = false;

        try {
            const dataScratchcard = await getDocs(scratchCard);
            const filterScratchcard = dataScratchcard.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }))
            // console.log(filterScratchcard)
            for(const card of filterScratchcard){
                // console.log('Checking cards: ', card.name)
                if(card.name === selectedcardsChoose){
                    // console.log('Looking card name: ', selectedcardsChoose)
                    card.topPrize <= winingPrize.value ? topPrize = true : topPrize = false;
                }
            }
        }catch(err){
            console.log(err)
        }
        console.log("Change topPrize status: ", topPrize)
    
    
// Send Data
    // console.log("Submit pressed", selectedcardsChoose, winingPrize.value)
    console.log(
        "ScratchCard name: ", selectedcardsChoose,
        ". Top Prize? ", topPrize, 
        ". User: ", userNo, 
        ". Win: ", win,
        ". Prize: ", winingPrize.value,
    )

    try {
        // await addDoc(scratchcardUsed,{
        //      name: selectedcardsChoose,
        //      topPrize: topWin,
        //      userNo: userNo,
        //      win: true,
        //      winPrize: winingPrize.value,
        // })
        
        hidenAddCards.classList.add("hidden-addCards")
    }catch(err){
        console.log(err)
    }
}