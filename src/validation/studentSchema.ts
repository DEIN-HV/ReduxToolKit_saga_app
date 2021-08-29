import * as yup from "yup";

export const studentSchema = yup.object().shape({
    name: yup
        .string()
        .required('Please enter name')
        .test('two-word', 'Please enter at least two words', value => {
            if (!value) return true;
            const part = value.split(' ');
            return part.filter(x => Boolean(x)).length >= 2
        }),
    age: yup
        .number()
        .positive('Please enter a valid age')
        .integer()
        .required('Please enter age')
        .typeError('Please enter a valid age')
        .min(18).max(60),
    mark: yup
        .number()
        .positive('Please enter a valid age')
        .integer()
        .required('Please enter age')
        .typeError('Please enter a valid age')
        .min(0).max(10),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Please select either male or female')
        .required('Please enter gender'),
    city: yup
        .string()
        .required('Please enter city'),
});
