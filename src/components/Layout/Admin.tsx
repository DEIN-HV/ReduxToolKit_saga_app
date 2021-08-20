import { Box, makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { Header, Sidebar } from 'components/Common';
import * as React from 'react';
import Dashboard from 'features/dashboard/Dashboard';
import Students from 'features/students/Students';
import LoginPage from 'features/auth/pages/LoginPage';
//import Dashboard from 'features/dashboard/Dashboard';

const useStyles = makeStyles((themes) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '220px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    backgroundColor: themes.palette.background.paper,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    borderBottom: `1px solid ${themes.palette.divider}`
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${themes.palette.divider}`
  },
  main: {
    gridArea: 'main',
    padding: themes.spacing(2, 3),
  },
}));

export function Admin() {

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}><Header /></Box>
      <Box className={classes.sidebar}><Sidebar /></Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>

          <Route path="/admin/students">
            <Students />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
