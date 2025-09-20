import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';
import productsSaga from './productsSaga';
import ordersSaga from './ordersSaga';
import deliveriesSaga from './deliveriesSaga';
import settingsSaga from './settingsSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(dashboardSaga),
    fork(productsSaga),
    fork(ordersSaga),
    fork(deliveriesSaga),
    fork(settingsSaga),
  ]);
}
