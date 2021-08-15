import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
}

export const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
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
      state.currentUser = action.payload;
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
