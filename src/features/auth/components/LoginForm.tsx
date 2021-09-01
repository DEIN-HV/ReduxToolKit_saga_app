import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, FormHelperText } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields/InputFiled';
import { selectCityOption } from 'features/city/citySlice';
import { Login } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, studentSchema } from 'validation';
import { selectErrorMessage, selectIslogged } from '../authSlice';

export interface LoginFormProps {
    initialValue: Login;
    onSubmit?: (login: Login) => void
}

export function LoginForm({ initialValue, onSubmit }: LoginFormProps) {

    const isLogged = useAppSelector(selectIslogged);
    const errorMessage = useAppSelector(selectErrorMessage);
    console.log(errorMessage)

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<Login>({
        defaultValues: initialValue,
        resolver: yupResolver(loginSchema),
    });

    const handleFormSubmit = (formValues: Login) => {
        try {
            onSubmit?.(formValues);

        } catch (error) {
            console.log(error)
        }
    }

    const handleFormSubmit1 = () => {
        console.log('object')
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} >
            <InputField name="username" label="User Name" control={control} />
            <InputField name="password" label="Pass word" control={control} type="password" />

            <Box mt={3}>
                {errorMessage && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
                <Button type="submit" variant="contained" color="primary">
                    {isSubmitting && <CircularProgress size="small" />} Login
                </Button>
            </Box>
        </form>
    );
}
