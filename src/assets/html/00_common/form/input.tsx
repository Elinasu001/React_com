/**
 * @fileoverview Input 박스 UI
 *
 * 사용 예시:
 * import { TextBox } from "@src/components/Input";
 */
import React from "react";
import {
  Input,
  Box,
} from "@mui/material";
import { FormLabel as CustomFormLabel } from "@src/assets/html/00_common/form/label";
import { HelperText } from "@src/assets/html/00_common/form/HelperText";


export const TextBox = ({
  label,
  type,
  value,
  onChange,
  errorMessage,
}: {
    label?: string;
    type?: string;
    value?: string;
    errorMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-input">
    {label && <CustomFormLabel label={label} />}
    <Input type={type} value={value} onChange={onChange} />
    <HelperText error={!!errorMessage} message={errorMessage} />
  </Box>
);


export default {
  TextBox
};