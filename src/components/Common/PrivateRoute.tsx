import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
    const isLogged = Boolean(localStorage.getItem('access_token'));
    if (!isLogged) return <Redirect to="/login" />

    return <Route {...props} />

}
