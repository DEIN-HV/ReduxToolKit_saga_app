import { PayloadAction } from '@reduxjs/toolkit';
import { authActions, LoginPayload, selectIslogged } from './../authSlice';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { useAppSelector } from 'app/hooks';

let isLogged: boolean;

function* handleLogin(payLoad: LoginPayload) {
  try {
    yield delay(1000);

    if (payLoad.username == 'admin' && payLoad.password == 'admin') {
      localStorage.setItem('access_token', 'fake_token');
      yield put(
        authActions.loginSuccess({
          id: '1',
          name: 'admin',
        })
      );
      isLogged = true;
      //redirect to admin page
      yield put(push('/admin/dashboard'));

    }
    else {
      yield put(authActions.loginFailed('username or password wrong'));
    }

  } catch (error) {
    //yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');

  //redirect to login page
  yield put(push('/'));
}

function* watchLoginFlow() {
  while (true) {
    isLogged = Boolean(localStorage.getItem('access_token'));

    if (!isLogged) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield call(handleLogin, action.payload);
    }

    else {
      yield take(authActions.logout.type);
      yield call(handleLogout);
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
