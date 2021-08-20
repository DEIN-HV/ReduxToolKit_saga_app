import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Student } from '../../../models'

// const useStyles = makeStyles(
//   table: {
//     minWidth: 650,
//   },
// });

const useStyles = makeStyles((themes) => ({
    table: {

    },
    text: {
        fontSize: 13,
        padding: themes.spacing(1, 1),
    }
}))

export interface RankingListProps {
    rankingList: Student[];
}

export default function RankingList({ rankingList }: RankingListProps) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width="10%" align="right" className={classes.text}>#</TableCell>
                        <TableCell align="left" className={classes.text}>Name</TableCell>
                        <TableCell width="10%" align="right" className={classes.text}>Mark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rankingList.map((student, idx) => (
                        <TableRow key={student.id}>
                            <TableCell width="10%" align="right" className={classes.text}>{idx + 1}</TableCell>
                            <TableCell align="left" className={classes.text}>{student.name}</TableCell>
                            <TableCell width="10%" align="right" className={classes.text}>{student.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
