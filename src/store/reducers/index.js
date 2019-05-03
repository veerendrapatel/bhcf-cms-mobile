import { combineReducers } from 'redux';
import  peopleReducer  from './people.reducer';
import  authReducer  from './auth.reducer';
import  alertReducer from './alert.reducer';
import cellGroupReducer from './cellgroup.reducer';
import schoolClassReducer from './schoolClass.reducer';
import classCategoryReducer from './classCategory.reducer';
import netInfoReducer from './netinfo.reducer';
import sundayReducer from './sunday.reducer';

const appReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    people: peopleReducer,
    cellReport: cellGroupReducer,
    classCategory: classCategoryReducer,
    schoolClass: schoolClassReducer,
    netInfo: netInfoReducer,
    sundayReport: sundayReducer
});


const rootReducer = ( state, action ) => {
  if ( action.type === 'USERS_LOGOUT_COMMIT' ) {
    state = undefined;
  }
      
  return appReducer(state, action)
}


export default rootReducer;