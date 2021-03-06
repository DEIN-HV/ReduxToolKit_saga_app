import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Student } from '../../../models';
import { Delete, Edit } from '@material-ui/icons';
import { Box, IconButton } from '@material-ui/core';
import { capitalizeString, getMarkColor } from 'utils';
import { useAppSelector } from 'app/hooks';
import { selectStudentFilter } from '../studentSlice';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import RemoveDialog from './RemoveDialog';
import { useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((themes) => ({
  table: {},
  text: {
    fontSize: 15,
    padding: themes.spacing(0, 4),
  },
  tableRow: {
    padding: themes.spacing(0),
    height: 15,
  },
}));

export interface StudentListProps {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onRemove: (selectedStudent: Student) => void;
}

export default function StudentTable({ studentList, onEdit, onRemove }: StudentListProps) {
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();

  const { _page, _limit } = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);

  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleRemoveOpen = (student: Student) => {
    setOpen(true);
    setSelectedStudent(student);
  };

  const handleRemoveClose = () => {
    setOpen(false);
  };

  const handleEdit = (student: Student) => {
    history.push(`${path}/${student.id}`);
  }

  const hanldeConfirm = (selectedStudent: Student) => {
    onRemove(selectedStudent)
    setOpen(false);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell width="10%" align="right" className={classes.text}>
                #
              </TableCell>
              <TableCell align="left" className={classes.text}>
                Name
              </TableCell>
              <TableCell align="left" className={classes.text}>
                Age
              </TableCell>
              <TableCell align="left" className={classes.text}>
                Gender
              </TableCell>
              <TableCell width="10%" align="right" className={classes.text}>
                Mark
              </TableCell>
              <TableCell align="left" className={classes.text}>
                City
              </TableCell>
              <TableCell align="left" className={classes.text}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {studentList.map((student, idx) => (
              <TableRow key={student.id} className={classes.tableRow}>
                <TableCell width="10%" align="right" className={classes.text}>
                  {(idx + 1) + ((_page - 1) * _limit)}
                </TableCell>
                <TableCell align="left" className={classes.text}>
                  {student.name}
                </TableCell>
                <TableCell align="left" className={classes.text}>
                  {student.age}
                </TableCell>
                <TableCell align="left" className={classes.text}>
                  {capitalizeString(student.gender)}
                </TableCell>
                <TableCell width="10%" align="right" className={classes.text}>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell align="left" className={classes.text}>
                  {cityMap[student.city]?.name}
                </TableCell>
                <TableCell align="left" className={classes.text}>
                  <IconButton onClick={() => handleEdit?.(student)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveOpen?.(student)}>
                    <Delete color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* REMOVE MODAL */}
      <RemoveDialog open={open}
        onHandleRemoveClose={handleRemoveClose}
        selectedStudent={selectedStudent}
        onRemove={hanldeConfirm} />
    </>


  );
}
