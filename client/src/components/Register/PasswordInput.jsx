import React, { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function PasswordInput(props){
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    function checkPassword(){
        const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(props.passwordValue.match(validRegex) || props.passwordValue.length === 0){
            setIsValidPassword(true);
        }else{
            setIsValidPassword(false);
        }
    }

    useEffect(() => {
        props.passwordCheck(isValidPassword);
    }, [isValidPassword]);

    function handleTogglePassword(){
        setIsValidPassword(true);
        setShowPassword(preValue => {
            return !preValue;
        })
    }

    return(
        <div> 
            <input 
                onBlur={checkPassword}
                onChange={props.passwordChange} 
                name="password"  
                className="login-input" 
                type={showPassword ? "text" : "password"}
                placeholder="Password" 
                value={props.passwordValue}
                style={{display: "inline"}}
                required
            />
            {
                showPassword ? <VisibilityOffIcon onClick={handleTogglePassword} className="password-icon"/> : 
                <VisibilityIcon onClick={handleTogglePassword} className="password-icon"/>
            }
            <br />
            {!isValidPassword && <label style={{color: "red"}}>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.</label>}
            
        </div>
    )
}

export default PasswordInput;