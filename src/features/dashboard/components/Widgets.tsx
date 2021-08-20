import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import RankingList from './RankingList';

export interface WidgetsProps {
    title: string;
    children: any;
}

const useStyle = makeStyles((themes) => ({
    root: {
        padding: themes.spacing(2),
        border: `solid 1px ${themes.palette.divider}`,
    },
}))

export default function Widgets({ title, children }: WidgetsProps) {

    console.log(children)
    const classes = useStyle();
    return (
        <Paper className={classes.root}>
            <Typography>{title}</Typography>
            <Box mt={2}><RankingList rankingList={children} /></Box>
        </Paper>
    );
}
