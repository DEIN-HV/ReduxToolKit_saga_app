import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface StatisticItemProps {
    icon: React.ReactElement;
    label: string;
    value: string | number;
}

const useStyles = makeStyles((themes) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',

        padding: themes.spacing(2, 3),

    },
}))

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Box>{icon}</Box>
            <Box>
                <Typography variant="h5" align="right">{value}</Typography>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </Paper>
    );
}
