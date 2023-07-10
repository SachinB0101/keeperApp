import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

import Button from "./Button";
import { useSignIn } from "react-auth-kit";
// import Footer from "./Footer";

function Login() { 
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

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    clicked: false,
    correctLogin: false
  });

  const signIn = useSignIn();

  function handelChange(event){
    const { name, value } = event.target;

    setData(prevValue => {
      return{
        ...prevValue,
        [name] : value
      };
    });
  }

  function handelSubmit(event){
    event.preventDefault();

    axios.post("http://localhost:5001/api/login", data)
    .then(res => {
      signIn({
        token: res.data.accessToken,
        expiresIn: 3600,
        tokenType: "Bearer"
      });

      setStatus(preValue => {
        return{
          clicked: true,
          correctLogin: true
        }
      });

      navigate("/");

    })
    .catch(error => setStatus(preValue => {
      return{
        clicked: true,
        correctLogin: false
      }
    }))
  }

  return (
    <div className="login-container">
      <h1>Welcome</h1>
      <form onSubmit={handelSubmit}>
        <input name="email" onChange={handelChange} className="login-input" type="email" placeholder="Your Email" value={data.email} required/>
        <input name="password" onChange={handelChange} className="login-input" type="password" placeholder="Your Password" value={data.password} required/>
        <Button text="Login"/>
      </form>
      {
        (status.clicked && !status.correctLogin && <label style={{color: "red"}}>Either email or password is incorrect.</label>)
      }
      <p style={{paddingTop: "20px", color: "black"}}>Don't have an account yet?</p>
      <Link to="/Register">Create an account</Link>
    </div>
  );
}

export default Login;
