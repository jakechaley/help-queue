import React from "react";
import ticketsImage from "./../img/tickets.jpeg";

function Header(){
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <img src={ticketsImage} alt="tickets" />
    </React.Fragment>
  );
}

export default Header;