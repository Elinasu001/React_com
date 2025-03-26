import React from "react";
import { Box, Input, Typography } from "@mui/material";
import { ButtonContent } from "@src/assets/html/00_common/Button";
import { FormLabel as CustomFormLabel } from "@src/assets/html/00_common/form/label";
import { HelperText } from "@src/assets/html/00_common/form/HelperText";

interface InputUnitWithButtonsProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  buttons: { name: string }[];
}

export const InputUnitWithButtons: React.FC<InputUnitWithButtonsProps> = ({
  label,
  value,
  onChange,
  errorMessage,
  buttons,
}) => {
  return (
    <Box className="formGroup">
      <Box className="form-input button">
        <CustomFormLabel label={label} />
        <ButtonContent buttons={buttons} />
        <Box className="form-input-box flex-row">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0"
            sx={{ textAlign: "right" }}
            inputProps={{ style: { textAlign: 'right' } }}
          />
          <Typography>만원</Typography>
        </Box>
        <HelperText error={!!errorMessage} message={errorMessage} />
      </Box>
    </Box>
  );
};

export default InputUnitWithButtons; 