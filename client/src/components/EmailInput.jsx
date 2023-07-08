import React, { useEffect, useState } from "react";
import axios from "axios";

function EmailInput(props){
    const emailStyle = {
        animation: "shake 0.4s ease-in-out 0s 2",
        boxShadow: "0 0 0.5em red"
      }

    const [validEmail, setValidEmail] = useState(true);
    const [isNewEmail, setIsNewEmail] = useState(true);

    function checkEmail(){
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
        }
        
    }

    useEffect(() => {
        props.emailCheck(validEmail && isNewEmail);
    }, [validEmail, isNewEmail]);

    function handelFocus(){
        setValidEmail(true);
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
                type="text" 
                placeholder="Your Email"
                value={props.emailValue}
                autoComplete="off" 
                required
            />
            {!isNewEmail && <label style={{color: "red"}}>This email is already associated with an account.</label>}
        </div>
    )
}

export default EmailInput;