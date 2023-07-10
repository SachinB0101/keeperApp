import React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./Home/Home";

import Login from "./Login";

import Register from "./Register/Register";
import { RequireAuth } from "react-auth-kit";


function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth loginPath="/login">
        <Home />
        </RequireAuth>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/Register" element={<Register />}/>
    </Routes>
  );
}

export default App;
