import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Button from "./Button";

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

      const [userInfo, setUserInfo] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confPassword: ""
      });

      // const [emailStyle, setEmailStyle] = useState({
      //   animation: "",
      //   boxShadow: ""
      // });

      const emailStyle = {
        animation: "shake 0.4s ease-in-out 0s 2",
        boxShadow: "0 0 0.5em red"
      }

      const [validEmail, setValidEmail] = useState(true);

      function handelChange(event){
        const { name, value } = event.target;

        setUserInfo(prevValue => {
            return{
                ...prevValue,
                [name] : value
            };
        });
      }

      function checkEmail(){
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(userInfo.email.match(validRegex) || userInfo.email.length === 0) setValidEmail(true);
        else{
          setValidEmail(false);
          setTimeout(() => {
            setValidEmail(true);
          }, 400);
        }
      }

      function handelSubmit(event){
        event.preventDefault();
        console.log(userInfo);
      }

    return (
        <div className="login-container">
            <h1>Hello {userInfo.fName} {userInfo.lName}</h1>
            <form onSubmit={handelSubmit}>
                <input onChange={handelChange} name="fName"  className="login-input" type="text" placeholder="First Name" value={userInfo.fName} autoComplete="off" required/>
                <input onChange={handelChange} name="lName"  className="login-input" type="text" placeholder="Last Name" value={userInfo.lName} autoComplete="off" required/>
                <input onBlur={checkEmail} onChange={handelChange} style={!validEmail ? emailStyle : {}} name="email" className="login-input" type="email" placeholder="Your Email" value={userInfo.email} autoComplete="off" required/>
                <input onChange={handelChange} name="password"  className="login-input" type="password" placeholder="Password" value={userInfo.password} required/>
                <input onChange={handelChange} name="confPassword" className="login-input" type="password" placeholder="Confirm Password" value={userInfo.confPassword} required/>
                <Button text="Register"/>
                <p style={{paddingTop: "20px"}}>Already have an account?</p>
                <Link to="/Login">Login</Link>
            </form>
        </div>
    );
}

export default Register;

// style={!correctEmail ? {background: "red"} : {}}