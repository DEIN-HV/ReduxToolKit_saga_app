import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import Widgets from './components/Widgets';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistic, selectHighestStudent, selectLowestStudent, selectRankingByCity } from './dashboardSlice';

const useStyles = makeStyles((themes) => ({
    root: {
        position: 'relative',
        paddingTop: themes.spacing(1),
    },
    loading: {
        position: 'absolute',
        top: themes.spacing(-1),
        width: '100%',
    },
}))

export default function Dashboard() {

    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectDashboardStatistic);
    const highestStudentList = useAppSelector(selectHighestStudent);
    const lowestStudentList = useAppSelector(selectLowestStudent);
    const rankingPerCity = useAppSelector(selectRankingByCity);

    console.log(highestStudentList)

    console.log(loading);
    useEffect(() => {
        dispatch(dashboardActions.fecthData());
    }, [dispatch]);

    const classes = useStyles();
    return (
        <Box className={classes.root}>

            {/* loading */}
            {loading && <LinearProgress className={classes.loading} />}

            {/* statisitc */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="male"
                        value={statistics.maleCount} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="female"
                        value={statistics.femaleCount} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="mark higher than 8"
                        value={statistics.highMarkCount} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="mark low less than 5"
                        value={statistics.lowMarkCount} />
                </Grid>
            </Grid>

            {/* All student ranking */}
            <Box mt={4}>
                <Typography variant="h5" gutterBottom>Student Ranking</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Widgets title="Student with highest mark" children={highestStudentList} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Widgets title="Student with lowest mark" children={lowestStudentList} />
                    </Grid>
                </Grid>
            </Box>

            {/* Ranking per city */}
            <Box mt={4}>
                <Typography variant="h5" gutterBottom>Ranking per city</Typography>
                <Grid container spacing={3}>
                    {rankingPerCity.map((city) => (
                        <Grid item xs={12} md={6} lg={3}>
                            <Widgets title={city.cityName} children={city.rankingList} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Box>
    );
}
