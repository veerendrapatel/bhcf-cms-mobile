import { combineReducers } from 'redux';
import  peopleReducer  from './people.reducer';
import  authReducer  from './auth.reducer';
import  alertReducer from './alert.reducer';
import cellGroupReducer from './cellgroup.reducer';

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    people: peopleReducer,
    cellgroup: cellGroupReducer
});

export default rootReducer;