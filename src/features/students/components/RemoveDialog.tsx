import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Student } from 'models';

export interface RemoveDialogProps {
    open: boolean;
    selectedStudent?: Student;
    onHandleRemoveClose: () => void;
    onRemove: (selectedStudent: Student) => void;
}

export default function RemoveDialog({ open, selectedStudent, onHandleRemoveClose, onRemove }: RemoveDialogProps) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={onHandleRemoveClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Remove student"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to remove student named <b>{selectedStudent?.name}</b>. <br />
                        This action can't be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onHandleRemoveClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => onRemove?.(selectedStudent as Student)} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
