import { Box, Button, makeStyles, Typography, LinearProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ChangeEvent, useEffect } from 'react';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import StudentTable from '../components/StudentTable';
import { PaginationItem } from '../../../components/Common/Pagination';
import StudentFilter from '../components/StudentFilter';
import { selectCityList } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import studentApi from 'api-collection/studentApi';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const useStyles = makeStyles((themes) => ({
  root: {
    position: 'relative',
    paddingTop: themes.spacing(1),
  },
  titleContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    top: themes.spacing(-1),
    width: '100%',
  },
}));

export function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { path } = useRouteMatch();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityList = useAppSelector(selectCityList);
  const loading = useAppSelector(selectStudentLoading);

  useEffect(() => {
    dispatch(
      studentActions.fecthStudentList(filter));
  }, [filter]);

  const handleChangePage = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page,
    }))
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
    }
    dispatch(studentActions.setFilterDebounce(newFilter));
  };

  const handleFilterChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
    }
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleSortChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order: (_order as 'asc' || 'desc') || undefined,
    }
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleClearClick = () => {
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: '',
    }
    dispatch(studentActions.setFilter(newFilter));
  }

  const handleRemove = async (selectedStudent: Student) => {
    try {
      await studentApi.remove(selectedStudent?.id || '');
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));

    } catch (error) {
      console.log(error)
    }
    toast.info('remove successfully!')

  }

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContent}>
        <Typography variant="h5">Student management</Typography>

        <Link to={`${path}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="small">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mt={2}>
        <StudentFilter
          filter={filter} cityList={cityList}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onClearClick={handleClearClick} />
      </Box>

      <Box mt={3}>
        <StudentTable studentList={studentList} onRemove={handleRemove} />
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        <PaginationItem pagination={pagination} onChangePage={handleChangePage} />
      </Box>
    </Box>
  );
}
