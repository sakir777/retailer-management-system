import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(dashboardSaga),
  ]);
}
