import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

import Button from "./Button";
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

  const [data, setData] = useState({
    email: "",
    password: ""
  });

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

    axios.post("http://localhost:5001/api/checkUser", data)
    .then(res => console.log(data));
  }

  return (
    <div className="login-container">
      <h1>Welcome</h1>
      <form onSubmit={handelSubmit}>
        <input name="email" onChange={handelChange} className="login-input" type="email" placeholder="Your Email" value={data.email} required/>
        <input name="password" onChange={handelChange} className="login-input" type="password" placeholder="Your Password" value={data.password} required/>
        <Button text="Login"/>
      </form>
      <p style={{paddingTop: "20px"}}>Don't have an account yet?</p>
      <Link to="/Register">Create an account</Link>
    </div>
  );
}

export default Login;
