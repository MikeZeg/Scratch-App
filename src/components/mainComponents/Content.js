import React, { useEffect } from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainContentStyle.css";
import { db } from "../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";




export const Content = () => {
    const [scratch, setScratch] = useState([]);

//Download data
    // const scratchCollection = collection(db, "");

    useEffect(()=>{
        const getScratchList = async() => {
            // Read data
            // Set that list in content
            // const data = await getDocs(scratchCollection)
        }
    })

    return (
        <div>
            <p>Please check Your Scratches below: </p>
        </div>
    )
}