import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import axiosClient from 'api-collection/axiosClient';
import cityApi from 'api-collection/cityApi';
import { Switch, Route } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { Admin } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';
import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => console.log(res));
    // cityApi.getAll().then(
    //   res=> res.data.map(x=>console.log(x.name) )
    // )
  }, []);

  const dispatch = useAppDispatch();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => dispatch(authActions.logout())}>
        Logout
      </Button>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute exact path="/admin">
          <Admin />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
