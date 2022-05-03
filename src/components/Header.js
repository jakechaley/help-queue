import React from "react";
import ticketsImage from "./../img/tickets.jpeg";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
      <div>
      <img src={ticketsImage} alt="tickets"/>
      </div>
      <h1> Help Queue</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;