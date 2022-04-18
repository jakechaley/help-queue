import React from "react";
import Ticket from "./Ticket";


const mainTicketList = [
  {
    names: 'Thato and Haley',
    location: '3A',
    issue: 'Firebase won\'t save record. Halp.'
  },
  {
    names: 'Sleater and Kinney',
    location: '4B',
    issue: 'Prop types are throwing and error.'
  },
  {
    names: 'Imani and Jacob',
    location: '9F',
    issue: 'Child component isnt\'t rendering.'
  }
];

function TicketList() {
  return (
    <React.Fragment>
      <hr/>
      {mainTicketList.map((ticket, index) => 
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index}/>
          
      )}
      
    </React.Fragment>
  );
}

export default TicketList;