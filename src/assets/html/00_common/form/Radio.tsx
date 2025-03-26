import React from 'react';
import { Box } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioProps {
  options: RadioOption[];
  defaultValue?: string;
  label?: string;
  name: string;
  /** 25.03.24 수정  **/
  variant?: 'basic' | string;
  row?: boolean;
  onChange?: (value: string) => void;
}

export const CommonRadio: React.FC<RadioProps> = ({
  options,
  defaultValue,
  label,
  name,
  variant = 'basic',
  /** 25.03.24 추가  **/
  row = false,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  /** 25.03.24  수정 및 변경  **/
  const formControlStyle = options.length >= 4 && row ? { width: '50%' } : {};

  return (
    <Box className={`form-radio radio-${variant}`}>
        {/*{label && <FormLabel id={`${name}-label`}>{label}</FormLabel>}*/}
        <RadioGroup
          aria-labelledby={`${name}-label`}
          defaultValue={defaultValue}
          name={name}
          onChange={handleChange}
          className={`radio-${variant} ${row ? 'row' : ''}`}
        >
        {options.map((option) => (
          <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
          disabled={option.disabled}
          sx={formControlStyle}
          />
        ))}
        </RadioGroup>
    </Box>
  );
};

export default CommonRadio;