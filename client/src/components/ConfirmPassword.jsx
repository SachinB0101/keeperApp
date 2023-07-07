import React, { useState } from "react";

function ConfirmPassword(props){
    const [isCorrect, setIsCorrect] = useState("true");

    function confirmPassword(){
        if(props.passwordValue === props.confPasswordValue || props.confPasswordValue.length === 0){
            setIsCorrect(true);
        }else{
            setIsCorrect(false);
        }
    }

    function handelFocus(){
        setIsCorrect(true);
    }

    return(
        <div>
            <input 
                onBlur={confirmPassword}
                onFocus={handelFocus}
                onChange={props.confPasswordChange} 
                name="confPassword" 
                className="login-input" 
                type="password" 
                placeholder="Confirm Password" 
                value={props.confPasswordValue}
                required
            />
            {!isCorrect && <label style={{color: "red"}}>Password did not match.</label>}
        </div>
    )
}

export default ConfirmPassword;