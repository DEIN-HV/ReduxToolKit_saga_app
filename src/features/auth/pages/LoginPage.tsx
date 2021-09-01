import * as React from 'react';
import useStyles from './style';
import { Paper, Typography, Box, Button, CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from '../authSlice';
import { LoginForm } from '../components/LoginForm';
import { Login, User } from 'models';
import { useRef } from 'react';


export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isLogging = useAppSelector(state => state.auth.logging);
  const userInfo = useAppSelector(selectCurrentUser);

  const userRef = useRef<User>();

  const handleLoginCLick = (loginForm: Login) => {
    dispatch(
      authActions.login({
        username: loginForm.username,
        password: loginForm.password,
      })
    );
    userRef.current = userInfo;
  };

  const initialValue: Login = {
    username: '',
    password: '',
  }

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          {/* <Button fullWidth variant="contained" color="primary" onClick={handleLoginCLick}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp;
            Login
          </Button> */}

          <LoginForm onSubmit={handleLoginCLick} initialValue={initialValue} />
        </Box>
      </Paper>
    </div>
  );
}
