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
    
    console.log("Submit its working!!");
    console.log(auth.currentUser.uid)

    //send data with: name->, topPrize->,userNo->, win->, winPrice->
    
    // if winingPrize.value === scratchCard.topPrize.value then topPrize = yes
    const win = false;
    const topPrize = false

//check scratchcards
try {
        const dataScratchcard = await getDocs(scratchCard);
        const filterScratchcard = dataScratchcard.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
        }))
    }catch(err){console.log(err)}

    // if(winingPrize.value ===  ){
        // topPrize = true
    // }
    
    
    console.log("Submit pressed", selectedcardsChoose, winingPrize.value)
    console.log(
        "ScratchCard name: ", selectedcardsChoose,
        ". Top Prize? ",topPrize, 
        ". User: ", userNo, 
        ". Win: ", win,
        ". Prize: ", winingPrize.value
    )
    try {
        // await addDoc(scratchcardUsed,{
        //      name: selectedcardsChoose,
        //      topPrize: topWin,
        //      userNo: userNo,
        //      win: true,
        //      winPrize: winingPrize.value,
        // })
    }catch(err){
        console.log(err)
    }
}