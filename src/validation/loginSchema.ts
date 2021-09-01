import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup
        .string()
        .required('Please enter username'),
    password: yup
        .string()
        .required('Please enter password'),
});
