import * as React from 'react';
import useStyles from './style';
import { Paper, Typography, Box, Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';

export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLoginCLick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginCLick}>
            Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
