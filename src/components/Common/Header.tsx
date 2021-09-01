import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser, selectIslogged } from 'features/auth/authSlice';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useRef } from 'react';
import { IconButton } from '@material-ui/core';
import { User } from 'models';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export function Header() {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(authActions.logout())
    }

    const userInfo = useAppSelector(selectCurrentUser);
    const islooged = useAppSelector(selectIslogged);
    console.log(userInfo)
    console.log(islooged)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Student Management
                    </Typography>
                    <Typography variant="h6">{userInfo?.name}</Typography>
                    <IconButton style={{ color: 'white' }} onClick={handleLogout}><ExitToAppIcon /></IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
