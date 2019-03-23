import { combineReducers } from 'redux';
import  peopleReducer  from './people.reducer';
import  authReducer  from './auth.reducer';
import  alertReducer from './alert.reducer';
import cellGroupReducer from './cellgroup.reducer';

const appReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    people: peopleReducer,
    cellgroup: cellGroupReducer
});


const rootReducer = ( state, action ) => {
  if ( action.type === 'USERS_LOGOUT_SUCCESS' ) {
    state = undefined;
  }
      
  return appReducer(state, action)
}


export default rootReducer;