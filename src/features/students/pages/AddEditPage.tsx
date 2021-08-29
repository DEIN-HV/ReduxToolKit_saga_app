import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api-collection/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StudentForm } from '../components/StudentForm';

export function AddEditPage() {
    const { studentId } = useParams<{ studentId: string }>();
    const isEditMode = Boolean(studentId);
    const [student, setStudent] = useState<Student>();
    const history = useHistory();

    useEffect(() => {

        if (!studentId) return;
        fetchStudent();
    }, [studentId]);

    const fetchStudent = async () => {
        try {
            const res = await studentApi.getById(studentId);
            setStudent(res);

        } catch (error) {
            console.log(error)
        }
    }

    const initialValues: Student = {
        name: '',
        age: '',
        gender: '',
        city: '',
        mark: '',
        ...student,
    } as Student;

    const handleStudentOnSubmit = async (student: Student) => {
        if (isEditMode) {
            await studentApi.update(student);

        }
        else {
            await studentApi.add(student);
        }

        const message = isEditMode ? 'Update successfully!' : 'Add successfully!';
        toast.success(message);
        //throw new Error('testing error');
        history.push('/admin/students/')
    }

    return (
        <Box>
            <Link to="/admin/students" >
                <Typography style={{ display: 'flex' }}>
                    <ChevronLeft />Back to student list
                </Typography>
            </Link>

            <Typography variant="h4">
                {isEditMode ? 'EDIT INFO STUDENT' : 'ADD NEW STUDENT'}
            </Typography>

            {(!isEditMode || Boolean(student)) && (
                <Box mt={2}>
                    <StudentForm initialValue={initialValues} onSubmit={handleStudentOnSubmit} />
                </Box>
            )}
        </Box>
    );
}
