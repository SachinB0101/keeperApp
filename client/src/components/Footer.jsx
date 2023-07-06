import React from "react";

function Footer(props) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p style={{color: props.color}}>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
