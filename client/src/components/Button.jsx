import React, { useState } from "react";

function Button(props){
    const [mouseOver, setMouseOver] = useState(false);
    
    function handelMouseOver(){
        setMouseOver(true)
    }
    
    function handelMouseOut(){
        setMouseOver(false)
    }

    return(
        <div>
            <button 
            type="submit"
            onMouseOver={handelMouseOver} 
            onMouseOut={handelMouseOut}
            style={{backgroundColor: mouseOver && "black"}} 
            className="login-button"
            >
            {props.text}
            </button>
        </div>
    )
}

export default Button;