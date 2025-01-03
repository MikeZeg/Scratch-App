
import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainSettingStyle.css";

import { userData } from "./User.js"
import  {auth } from "../../config/firebase.js";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { updateEmail, reauthenticateWithCredential, sendEmailVerification, updatePassword } from "firebase/auth";

// Components
// ------------  Change Image -------------
export const ChangeImage = () => {
    const [open, setOpen] = useState(false)

    const Modal = ({ imageModal }) => {
        return(
        <div className="changeModal" >
            <section id="change-email">
                <p className="change__title">Change Image</p>
                <label htmlFor="avatar" className="change__subtitle">Choose a profile image: </label>
                <input 
                    type="file"
                    id="avatr"
                    accept="image/png, image/jpeg"
                />
                <button className="btn btnConfChange">Confirm</button>
                <button className="btn btnCancel" onClick={()=> imageModal(false)}>Cancel</button>
            </section>
        </div>
        )
    }

    return (
        <div className="changeImage change">
            {/* <button className="btn" onClick={()=>{setOpen(true)}}>Change Image</button> */}
            {open === true ? <Modal imageModal={setOpen}/> : (<button className="btn btnModal" onClick={()=>{setOpen(true)}}>Change Image Press</button>)}
            
        </div>
    )
}
// --------   Change email -------------
export const ChangeEmail = () => {
    const [open, setOpen] = useState(false)

    // ----- Modal Component -----
    const Modal = ({ emailModal }) => {
        const [newEmail1, setNewEmail1] = useState(" ")
        const [newEmail2, setNewEmail2] = useState("")
        const [credantialPassword,setCredantialPassword] = useState("")
        const mainNav = useNavigate();
        
        const emailInput = document.querySelectorAll('.newEmail');
        const easyMailFormat = /^\S+@\S+\.\S+$/;


        // ---- Change email Function -------
        const upDateEmail = async () =>{

            if(auth.currentUser === null ){
                return;
            }
            if(!newEmail1.match(easyMailFormat)) {
                return alert('Please check email format')
            }if(newEmail1 != newEmail2){
                emailInput.forEach((input)=> {
                    input.style.backgroundColor  = "red"
                })
            }
            if(newEmail1 === newEmail2){
                // console.log("send new email")
                try {
                    const userEmail = auth.currentUser.email;
                    const userPassword = credantialPassword;
        // Reauthenticate user before updating the email
                    const credential = EmailAuthProvider.credential(userEmail, userPassword);
                    await reauthenticateWithCredential(auth.currentUser, credential)
        // Update the emial after succressful
                    await updateEmail(auth.currentUser, newEmail1)
        // Optional - send email to verification the new email
                    // await sendEmailVerification(auth.currentUser)
        // Information for User
                    alert('New Email update');
                    mainNav("/LandingPage")
                } catch (error) {
                    console.log("Something get wrong. "+error)
                }
            }
        }

        return (
            <div className="changeModal changeModalInput" >
                <section id="change-email">
                    <p className="change__title">Change Email</p>
                    <label htmlFor="email" className="change__subtitle">Please add new email: </label>
                    <input 
                        type="email"
                        className="newEmail"
                        id="email"
                        placeholder="New Email"
                        onChange={(e)=> {
                            setNewEmail1(e.target.value)
                            e.target.style.backgroundColor = "white";
                        }}
                    />
                    <label htmlFor="rep-email" className="change__subtitle">Please repete new email: </label>
                    <input 
                        type="email"
                        className="newEmail"
                        id="rep-email"
                        placeholder="Repete New Email"
                        onChange={(e)=> {
                            setNewEmail2(e.target.value)
                            e.target.style.backgroundColor = "white";
                        }}
                    />
                    <label htmlFor="emailUpdatePassword" className="change__subtitle">Password</label>
                    <input
                        type="password"
                        id="emailUpdatePassword"
                        placeholder="Password"
                        onChange={(e)=>{
                            setCredantialPassword(e.target.value)
                        }}
                    />
                    <button className="btnConfChange btn" onClick={upDateEmail}>Press to change</button>
                    <button className="btn btnCancel change" onClick={()=> emailModal(false)}>Cancel</button>
                </section>
            </div>
        )
    }

    return (
        <div className="changeEmail change">
            {open === true ? <Modal emailModal={setOpen}/> : (<button className="btn btnModal" onClick={()=>{setOpen(true)}}>Change Email</button>)}
        </div>
    )
}
// ------------ Change Password -----------------
export const ChangePassword = () => {
    const [open, setOpen] = useState(false)

//------- Component Modal ------
    const Modal = ({ passwordModal }) => {
        const [pass, setPass] = useState('')
        const [newPass1, setNewPass1] = useState('');
        const [newPass2, setNewPass2] = useState('');
        const mainNav = useNavigate();

// Function change password
        const upDatePassword = async () => {
            // const passFormat = ;
            
            if(auth.currentUser === null ){
                return;

            }if(newPass1 !== newPass2) {
                return alert('!!! Password Not Match !!!')
            }if(newPass1.length < 6) {
                return alert('!!! Password need to be longer than 6 signs!!')
            }
        // if(newPass1.match(passFormat)){return alert("!! Please check password format. Including ... !!")}
            if(newPass1 === newPass2){

                try {
                    const userEmail = auth.currentUser.email;
                    const userPassword = pass;
        // Reauthenticate user before updating the email
                    console.log("User email and password: ",userEmail, userPassword)
                    const credential = EmailAuthProvider.credential(auth.currentUser.email, userPassword);
                    await reauthenticateWithCredential(auth.currentUser, credential)
        // Update the emial after succressful
                    await updatePassword(auth.currentUser, newPass1)
        // Optional - send email to verification the new email
                    // await sendEmailVerification(auth.currentUser)
        // Information for User
                    alert('New Password update');
                    mainNav("/LandingPage")
                } catch (error) {
                    console.log("Something get wrong. "+error)
                }
            }
        }

        return (
            <div className="changeModal changeModalInput" >
                <section id="change-password">
                    <p className="change__title">Change Password</p>
                    
                    <label htmlFor="password" className="change__subtitle">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        minLength={6}
                        required
                        onChange={(e)=>{
                            setPass(e.target.value)
                        }}
                    />

                    <label htmlFor="password" className="change__subtitle">Please add new password: </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="password"
                        minLength={6}
                        required
                        onChange={(e)=>{
                            setNewPass1(e.target.value)
                        }}
                    />
                    <label htmlFor="rep-password" className="change__subtitle">Please repete new password: </label>
                    <input 
                        type="password"
                        id="rep-newPassword"
                        name="rep-password"
                        minLength={6}
                        required
                        onChange={(e)=>{
                            setNewPass2(e.target.value)
                        }}
                        />
                    <button className="btnConfChange btn" onClick={ upDatePassword}>Press to change</button>
                    <button className="btn btnCancel change" onClick={()=> passwordModal(false)}>Cancel</button>
                </section>
            </div>
        )
    }

    return (
        <div className="change changePassword">
            {open === true ? <Modal passwordModal={setOpen}/> : (<button className="btn btnModal" onClick={()=>{setOpen(true)}}>Change Password</button>)}
        </div>
    )
}


// --------------- Component Modals --------------
export const ModalSetting = ( {closeModal} ) => {
    
    const goTo = useNavigate();

    return (
        <div className="settingModal">
            <div id="setting-btnClose">
                <button className="btn" onClick={()=>{goTo('/Main')}}>X</button>
            </div>
            <br/>
            <ChangeImage/>
            <br/>
            <ChangeEmail/>
            <br/>
            <ChangePassword/>
            {/* <button className="btn change" onClick={()=> closeModal(false)}> Cancel</button> */}
        </div>
    )
}

export const Setting = () => {

    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="setting">
            <ModalSetting/>
        </div>
    )
}