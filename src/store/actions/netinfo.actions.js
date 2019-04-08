import { netinfoConstants } from '../constants/index';
export const connectionState = (status) => {
    return {
        type: netinfoConstants.CHANGE_CONNECTION_STATUS, 
        isConnected: status
    }
}