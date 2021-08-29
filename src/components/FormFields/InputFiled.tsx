import { TextField } from '@material-ui/core';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { useController } from 'react-hook-form';
import { Control } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    control: Control<any>;
}

export function InputField({ name, label, control, ...inputProps }: InputFieldProps) {
    const controller = useController({
        name,
        control,
    });

    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error },
    } = controller;

    return (

        <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            value={value}
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
        />
    );
}
