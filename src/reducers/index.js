import formVisibleReducer from "./form-visible-reducer";
// import ticketListReducer from "./ticket-list-reducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
// import { firestore } from "./firebase";


const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  firestore: firestoreReducer
});

export default rootReducer;