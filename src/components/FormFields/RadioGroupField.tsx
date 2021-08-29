import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOptions {
    label?: string;
    value: string | number;
}

export interface RadioGroupFieldProps {
    name: string;
    control: Control<any>;
    options?: RadioOptions[];
    label?: string;
    disabled?: boolean;
}

export function RadioGroupField({ name, label, control, disabled, options }: RadioGroupFieldProps) {

    const controller = useController({
        name,
        control,
    });

    const { field, fieldState } = controller;
    const { onChange, onBlur, value } = field;
    const { invalid, error } = fieldState;

    return (

        <FormControl component="fieldset" disabled={disabled} error={invalid}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label="gender" name={name} value={value} onChange={onChange} onBlur={onBlur}>

                {options && options.map((option) => (
                    <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                ))}
            </RadioGroup>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
