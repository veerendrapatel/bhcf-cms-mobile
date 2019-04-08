import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { peopleConstants, alertConstants } from '../constants';
import {  alertActions } from '../actions';


function* notifySaveMemberCommit(action) {
   try {
      yield put({type: alertConstants.SUCCESS, message: 'Successfully synced to server.'});
   } catch (e) {
      yield put(alertActions.error(e.message));
   }
}

function* notifySaveMemberRequest(action) {
   try {
      yield put({type: alertConstants.SUCCESS, message: 'Successfully saved but waiting for network to sync.'});
   } catch (e) {
      yield put(alertActions.error(e.message));
   }
}


function* peopleSaga() {
   yield takeEvery(peopleConstants.ADD_NEW_MEMBER_REQUEST, notifySaveMemberRequest);
   yield takeEvery(peopleConstants.ADD_NEW_MEMBER_COMMIT, notifySaveMemberCommit);

   yield takeEvery(peopleConstants.UPDATE_MEMBER_REQUEST, notifySaveMemberRequest);
   yield takeEvery(peopleConstants.UPDATE_MEMBER_COMMIT, notifySaveMemberCommit);
}

export default peopleSaga;