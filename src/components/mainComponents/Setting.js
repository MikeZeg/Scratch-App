
import React from "react"
import { ReactDom } from "react-dom";
import { useState } from "react";
import { Link, Route, Router, Routes, useNavigate} from "react-router-dom";
import "../../styles/mainSettingStyle.css";

import { userData } from "./User.js"

// console.log(userData.userEmail)


// Components
//Change Image 
export const ChangeImage = () => {
    const [open, setOpen] = useState(false)

    const Modal = ({ imageModal }) => {
        return(
            <>
            <section>
                <p>Change Image</p>
                <label htmlFor="avatar">Choose a profile image: </label>
                <input 
                    type="file"
                    id="avatr"
                    accept="image/png, image/jpeg"
                />
                <button className="btn">Press to change</button>
                <button className="btn btnCancel" onClick={()=> imageModal(false)}>Cancel</button>
            </section>
            </>
        )
    }

    return (
    <div className="changeImage change">
        {/* <button className="btn" onClick={()=>{setOpen(true)}}>Change Image</button> */}
        {open === true ? <Modal imageModal={setOpen}/> : (<button className="btn" onClick={()=>{setOpen(true)}}>Change Image Press</button>)}
        
    </div>
    )
}
// Change email
export const ChangeEmail = () => {
    const [open, setOpen] = useState(false)

    const Modal = ({ emailModal }) => {
        return (
            <div className="">
                <section>
                    <p>Change Email</p>
                    <label htmlFor="email">Please add new email: </label>
                    <input 
                        type="email"
                        id="email"
                        size="30"
                        pattern=""
                        required
                    />
                    <label htmlFor="rep-email">Please add new email: </label>
                    <input 
                        type="email"
                        id="rep-email"
                        size="30"
                        pattern=""
                        required
                    />
                    <button>Press to change</button>
                    <button className="btn btnCancel" onClick={()=> emailModal(false)}>Press to cancel</button>
                </section>
            </div>
        )
    }


    return (
        <div className="changeEmail change">
            {open === true ? <Modal emailModal={setOpen}/> : (<button className="btn" onClick={()=>{setOpen(true)}}>Change Email Press</button>)}
        </div>
    )
}
//Change Password
export const ChangePassword = () => {
    const [open, setOpen] = useState(false)

    const Modal = ({ passwordModal }) => {
        return (
            <div className="">
                <section>
                <p>Change Password</p>
                <label htmlFor="password">Please add new password: </label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    minLength={5}
                    required
                />
                <label htmlFor="rep-password">Please repete password: </label>
                <input 
                    type="password"
                    id="rep-password"
                    name="rep-password"
                    minLength={5}
                    required/>
                <button>Press to change</button>
                <button className="btn btnCancel" onClick={()=> passwordModal(false)}>Cancel</button>
            </section>
            </div>
        )
    }

    return (
        <div className="change changePassword">
            {open === true ? <Modal passwordModal={setOpen}/> : (<button className="btn" onClick={()=>{setOpen(true)}}>Change Email Press</button>)}
        </div>
    )
}


// Component Modal
export const ModalSetting = ( {closeModal} ) => {
    return (
        <div className="settingModal">
            <div className="btnClose">
                <button className="btn" onClick={()=> closeModal(false)}>X</button>
            </div>
            <br/>
            <ChangeImage/>
            <br/>
            <ChangeEmail/>
            <br/>
            <ChangePassword/>
            <button className="btn" onClick={()=> closeModal(false)}> Cancel</button>
        </div>
    )
}

export const Setting = () => {

    const [openModal, setOpenModal] = useState(false)


    return (
        <div className="setting">
    {/* open A Modal */}
            <button className="btn btnModalOpen" onClick={()=> {setOpenModal(true)}}>Setting</button>
            { openModal && <ModalSetting closeModal={setOpenModal}/>}
        </div>
    )
}