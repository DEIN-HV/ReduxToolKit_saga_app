import authSaga from 'features/auth/pages/authSaga';
import counterSaga from 'features/counter/counterSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga()]);
}
