import { Box } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AddEditPage } from './pages/AddEditPage';
import { ListPage } from './pages/ListPage';

export default function Students() {

    const { path } = useRouteMatch();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [])

    return (
        <Box>
            <Switch>
                <Route exact path={path}>
                    <ListPage />
                </Route>

                <Route path={`${path}/add`}>
                    <AddEditPage />
                </Route>

                <Route path={`${path}/:studentId`}>
                    <AddEditPage />
                </Route>
            </Switch>
        </Box>
    );
}
