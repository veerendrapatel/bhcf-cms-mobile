import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { peopleConstants, alertConstants } from '../constants';
import {  alertActions } from '../actions';
import { NavigationActions } from 'react-navigation';

function* notifySaveMemberCommit(action) {
   try {
      yield put({type: alertConstants.SUCCESS, message: 'Successfully synced to server.'});
      yield put(NavigationActions.navigate({ routeName: 'People'}));
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
   yield takeLatest(peopleConstants.ADD_NEW_MEMBER_REQUEST, notifySaveMemberRequest);
   yield takeLatest(peopleConstants.ADD_NEW_MEMBER_COMMIT, notifySaveMemberCommit);

   yield takeLatest(peopleConstants.UPDATE_MEMBER_REQUEST, notifySaveMemberRequest);
   yield takeLatest(peopleConstants.UPDATE_MEMBER_COMMIT, notifySaveMemberCommit);
}

export default peopleSaga;