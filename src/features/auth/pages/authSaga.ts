import { PayloadAction } from '@reduxjs/toolkit';
import { authActions, LoginPayload } from './../authSlice';
import { call, delay, fork, put, take } from 'redux-saga/effects';

function* handleLogin(payLoad: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'fake_token');
    put(
      authActions.loginSuccess({
        id: '1',
        name: 'DienHV',
      })
    );
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
  while (true) {
    const isLogged = Boolean(localStorage.getItem('access_token'));
    if (!isLogged) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
