import React, { useEffect, useState } from "react";

function ConfirmPassword(props){
    const [isCorrect, setIsCorrect] = useState(true);

    function handelConfirmPassword(){
        if(props.passwordValue === props.confPasswordValue || props.confPasswordValue.length === 0){
            setIsCorrect(true);
        }else{
            setIsCorrect(false);
        }
    }

    useEffect(() => {
        props.confPasswordCheck(isCorrect);
    }, [isCorrect]);

    function handelFocus(){
        setIsCorrect(true);
    }

    return(
        <div>
            <input 
                onBlur={handelConfirmPassword}
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