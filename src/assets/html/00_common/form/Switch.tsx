import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

interface SwitchProps {
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

function CustomSwitch({ label, defaultChecked, disabled, onChange }: SwitchProps) {
  return (
    <FormControlLabel
      className={`switch-check ${disabled ? 'disabled' : ''}`}
      control={
        <Switch
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
      }
      label=""
    />
  );
}

export default CustomSwitch; 