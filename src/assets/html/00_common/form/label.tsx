import { FormLabel as MuiFormLabel } from '@mui/material';

interface FormLabelProps {
    label?: string;
}

export const FormLabel = ({ label }: FormLabelProps) => {
    return label ? <MuiFormLabel>{label}</MuiFormLabel> : null;
};
