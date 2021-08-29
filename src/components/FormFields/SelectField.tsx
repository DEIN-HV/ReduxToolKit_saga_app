import { FormHelperText, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { default as React } from 'react';
import { Control, useController } from 'react-hook-form';


export interface RadioOptions {
    label?: string;
    value: string | number;
}

export interface SelectFieldProps {
    name: string;
    control: Control<any>;
    options?: RadioOptions[];
    label?: string;
    disabled?: boolean;
}

export function SelectField({ name, label, control, disabled, options }: SelectFieldProps) {

    const controller = useController({
        name,
        control,
    });

    const { field, fieldState } = controller;
    const { onChange, onBlur, value } = field;
    const { invalid, error } = fieldState;

    return (

        <FormControl variant="outlined" size="small" fullWidth disabled={disabled} error={invalid}>
            <InputLabel id={`${value}'Id'`}>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                labelId={`${value}'Id'`}
                label={label}>
                {options && options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
