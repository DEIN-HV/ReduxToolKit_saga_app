import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { selectStudentList, studentActions } from '../studentSlice';
import StudentTable from '../components/StudentTable';

const useStyles = makeStyles((themes) => ({
  root: {},
  titleContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const studentList = useAppSelector(selectStudentList);

  useEffect(() => {
    dispatch(
      studentActions.fecthStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContent}>
        <Typography variant="h5">Student management</Typography>
        <Button variant="contained" color="primary" size="small">
          Add new student
        </Button>
      </Box>

      <Box mt={2}>
        <StudentTable studentList={studentList} />
      </Box>
    </Box>
  );
}
