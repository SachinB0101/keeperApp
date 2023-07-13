import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../Button";

import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConfirmPassword from "./ConfirmPassword";
import { useSignIn } from "react-auth-kit";

function Register(){
    useEffect(() => {
        document.body.style.fontFamily = "Source Sans Pro, sans-serif"
        document.body.style.height = "100%"
        document.body.style.width = "100%"
        document.body.style.fontWeight = "300"
        document.body.style.color = "white";
        document.body.style.background = "#FFD700";
    
        return () => {
          document.body.style.fontFamily = "";
          document.body.style.height = "";
          document.body.style.width = "";
          document.body.style.fontWeight = "";
          document.body.style.color = "";
          document.body.style.background = "";
        }
      }, []);

      const signIn = useSignIn();

      const navigate = useNavigate();

      const [isRegister, setIsRegister] = useState({
        email: false,
        password: false,
        confPassword: false
      });

      const [clickRegister, setClickRegister] = useState(false);

      const [userInfo, setUserInfo] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confPassword: ""
      });

      function handelChange(event){
        const { name, value } = event.target;

        setUserInfo(prevValue => {
            return{
                ...prevValue,
                [name] : value
            };
        });
      }

      function checkEmail(val){
        setIsRegister(prevValue => {
          return{
            email: val,
            password: prevValue.password,
            confPassword: prevValue.confPassword
          }
        });
      }

      function checkPassword(val){
        setIsRegister(prevValue => {
          return{
            email: prevValue.email,
            password: val,
            confPassword: prevValue.confPassword
          }
        });
      }

      function checkConfPassword(val){
        setIsRegister(prevValue => {
          return{
            email: prevValue.email,
            password: prevValue.password,
            confPassword: val
          }
        });
      }

      function handelSubmit(event){
        setClickRegister(true);
        event.preventDefault();
      }

      useEffect(() => {
        if(clickRegister && isRegister.confPassword && isRegister.email && isRegister.password){
          axios.post("http://localhost:5001/api/addUser", userInfo)
          .then(res => {
            signIn({
              token: res.data.accessToken,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: {email: userInfo.email}
            });
          });

          setClickRegister(false);

          navigate("/")
        }
      }, [clickRegister, isRegister, userInfo]);

    return (
        <div className="login-container">
            <h1>Hello {userInfo.fName} {userInfo.lName}</h1>
            <form onSubmit={handelSubmit}>
                <input onChange={handelChange} name="fName"  className="login-input" type="text" placeholder="First Name" value={userInfo.fName} autoComplete="off" required/>
                <input onChange={handelChange} name="lName"  className="login-input" type="text" placeholder="Last Name" value={userInfo.lName} autoComplete="off" required/>
                <EmailInput emailChange={handelChange} emailValue={userInfo.email} emailCheck={checkEmail}/>
                <PasswordInput passwordChange={handelChange} passwordValue={userInfo.password} passwordCheck={checkPassword}/>
                <ConfirmPassword confPasswordChange={handelChange} confPasswordValue={userInfo.confPassword} passwordValue={userInfo.password} confPasswordCheck={checkConfPassword}/>
                <Button text="Register"/>
                {
                  (clickRegister && !(isRegister.email && isRegister.password && isRegister.confPassword) && <label style={{color: "red"}}>Registration failed.</label>)
                }
                <p style={{paddingTop: "20px", color: "black"}}>Already have an account?</p>
                <Link to="/Login">Login</Link>
            </form>
        </div>
    );
}

export default Register;