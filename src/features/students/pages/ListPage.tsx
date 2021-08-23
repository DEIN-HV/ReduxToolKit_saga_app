import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ChangeEvent, useEffect } from 'react';
import { selectStudentFilter, selectStudentList, selectStudentPagination, studentActions } from '../studentSlice';
import StudentTable from '../components/StudentTable';
import { PaginationItem } from '../../../components/Common/Pagination';
import StudentFilter from '../components/StudentFilter';
import { selectCityList } from 'features/city/citySlice';
import { ListParams } from 'models';

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
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityList = useAppSelector(selectCityList);

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

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContent}>
        <Typography variant="h5">Student management</Typography>
        <Button variant="contained" color="primary" size="small">
          Add new student
        </Button>
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
        <StudentTable studentList={studentList} />
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        <PaginationItem pagination={pagination} onChangePage={handleChangePage} />
      </Box>
    </Box>
  );
}
