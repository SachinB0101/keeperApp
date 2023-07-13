import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Header() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  function handelClick(){
    signOut();
    navigate("/login");
  }

  return (
    <header>
      <div className="header-container">
        <h1><HighlightIcon />Keeper</h1>
        <Button style={{color: "black"}} onClick={handelClick}><LogoutIcon/></Button>  
      </div>
    </header>
  );
}

export default Header;
