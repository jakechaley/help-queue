import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from "./../actions";
import { withFirestore } from "react-redux-firebase";



class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => 
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleEditingTicketInList = () => {
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }


  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({collection: "tickets", doc: id});
    this.setState({selectedTicket: null});
  }

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({collection: "tickets", doc: id}).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        is: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket });
    });
  }

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editng: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = 
      <EditTicketForm
        ticket = {this.state.selectedTicket} 
        onEditTicket = {this.handleEditingTicketInList} />
        buttonText= "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
      <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = { this.handleDeletingTicket}
        onClickingEdit = { this.handleEditClick}/>
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection = {this.handleChangingSelectedTicket}/>
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage 
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);