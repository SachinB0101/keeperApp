import React, { useState } from "react";
import axios from "axios";
import { TextField } from '@mui/material';

function EmailInput(props){
    const emailStyle = {
        animation: "shake 0.4s ease-in-out 0s 2",
        boxShadow: "0 0 0.5em red"
      }

    const [validEmail, setValidEmail] = useState(true);
    const [isNewEmail, setIsNewEmail] = useState(true);

    function checkEmail(){
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(props.emailValue.match(validRegex) || props.emailValue.length === 0){
            setValidEmail(true);
            if(props.emailValue.match(validRegex)){
                axios.get("http://localhost:5001/api/checkEmail?email=" + props.emailValue)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    setIsNewEmail(false);
                })
            }
        } 
        else{
            setValidEmail(false);
            setTimeout(() => {
                setValidEmail(true);
            }, 400);
        }
    }

    function handelFocus(){
        setIsNewEmail(true);
    }

    return (
        <div>
            <input 
                onFocus={handelFocus}
                onBlur={checkEmail}
                onChange={props.emailChange}
                style={!validEmail ? emailStyle : {}}
                name="email" 
                className="login-input" 
                type="email" 
                placeholder="Your Email"
                value={props.emailValue}
                autoComplete="off" 
                required
            />
            {!isNewEmail && "This email is already associated with an account."}
        </div>
    )
}

export default EmailInput;