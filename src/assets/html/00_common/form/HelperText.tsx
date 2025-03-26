import { FormHelperText as MuiFormHelperText } from '@mui/material';

interface HelperTextProps {
    error?: boolean;
    message?: string;
  }
  
  export const HelperText: React.FC<HelperTextProps> = ({ error, message }) => (
    <MuiFormHelperText error={error}>
      {message}
    </MuiFormHelperText>
  );
  
  export default HelperText;
  