import React from 'react';
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
import { IconButton } from '@material-ui/core';

// const useStyles = makeStyles(
//   table: {
//     minWidth: 650,
//   },
// });

const useStyles = makeStyles((themes) => ({
  table: {},
  text: {
    fontSize: 15,
    padding: themes.spacing(0, 4),
  },
}));

export interface StudentListProps {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, onEdit, onRemove }: StudentListProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
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
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell width="10%" align="right" className={classes.text}>
                {idx + 1}
              </TableCell>
              <TableCell align="left" className={classes.text}>
                {student.name}
              </TableCell>
              <TableCell align="left" className={classes.text}>
                {student.age}
              </TableCell>
              <TableCell align="left" className={classes.text}>
                {student.gender}
              </TableCell>
              <TableCell width="10%" align="right" className={classes.text}>
                {student.mark}
              </TableCell>
              <TableCell align="left" className={classes.text}>
                {student.city}
              </TableCell>
              <TableCell align="left" className={classes.text}>
                <IconButton onClick={() => onEdit?.(student)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => onRemove?.(student)}>
                  <Delete color="secondary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
