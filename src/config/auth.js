import React, { useState } from "react";
import ReactDom from "react-dom";
import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth'



    export const Auth = async () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const signIn = async () => {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            }catch (err){
                console.error(err)
            }
    }
    
    };