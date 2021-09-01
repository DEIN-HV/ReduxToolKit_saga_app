import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User } from 'models/user';
import { useReducer } from 'react';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
  errorMessage?: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.errorMessage = '';
      state.currentUser = action.payload;
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      state.errorMessage = action.payload;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export const selectIslogged = (state: RootState) => state.auth.isLoggedIn;
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export default authReducer;
