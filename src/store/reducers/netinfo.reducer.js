import { netinfoConstants } from '../constants/index';

const initialState = {
  isConnected: false,
};

const netInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case netinfoConstants.CHANGE_CONNECTION_STATUS:
            return {
                ...state,
                 isConnected: action.isConnected,
            }
        default:
            return state;
    }
}

export default netInfoReducer;