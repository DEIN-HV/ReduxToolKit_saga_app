import { NotFound, PrivateRoute } from 'components/Common';
import { Admin } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <Switch>
      <Route exact path={["/login", "/"]}>
        <LoginPage />
      </Route>

      <PrivateRoute path="/admin">
        <Admin />
      </PrivateRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
