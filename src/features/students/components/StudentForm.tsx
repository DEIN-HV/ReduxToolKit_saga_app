import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields/InputFiled';
import { RadioGroupField } from 'components/FormFields/RadioGroupField';
import { SelectField } from 'components/FormFields/SelectField';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { studentSchema } from 'validation';
import studentApi from 'api-collection/studentApi';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert'

export interface StudentFormProps {
    initialValue: Student;
    onSubmit?: (student: Student) => void
}

export function StudentForm({ initialValue, onSubmit }: StudentFormProps) {

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<Student>({
        defaultValues: initialValue,
        resolver: yupResolver(studentSchema),
    });

    const selectCityOptions = useAppSelector(selectCityOption);
    const [error, setError] = useState<string>('');

    const handleFormSubmit = async (formValues: Student) => {
        try {
            // await new Promise<Student>((resolve) => {
            //     setTimeout(() => {
            //         resolve(studentApi.add(formValues));
            //     }, 1000);
            // })
            setError('');
            onSubmit?.(formValues);

        } catch (error) {
            setError(error.message);
        }
    }

    const radioOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }]

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} style={{ maxWidth: 500 }}>
            <InputField name="name" label="Name" control={control} />
            <InputField name="age" label="Age" control={control} type="number" />
            <RadioGroupField name="gender" label="Gender" control={control} options={radioOptions} />
            <SelectField name="city" label="City" control={control} options={selectCityOptions} />
            <InputField name="mark" label="Mark" control={control} type="number" />

            <Box mt={3}>
                {error && <Alert severity="error">{error}</Alert>}
                <Button type="submit" variant="contained">
                    {isSubmitting && <CircularProgress size="small" />} Save
                </Button>
            </Box>
        </form>
    );
}
