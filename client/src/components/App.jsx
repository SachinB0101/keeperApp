import React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./Home/Home";

import Login from "./Login";

import Register from "./Register/Register";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/Register" element={<Register />}/>
    </Routes>
  );
}

export default App;
