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
  Typography,
} from "@mui/material";
import { FormLabel as CustomFormLabel } from "@src/assets/html/00_common/form/label";
import { HelperText } from "@src/assets/html/00_common/form/HelperText";

export const MoneyBox = ({
  label,
  value,
  onChange,
  placeholder,
  errorMessage,
}: {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
}) => {
  // 숫자만 추출하는 함수
  const getOnlyNumbers = (str: string) => str.replace(/[^\d]/g, '');
  
  // 천 단위 콤마 포맷팅 함수
  const formatNumber = (num: string) => {
    const numbers = getOnlyNumbers(num);
    if (numbers === '') return '';
    return new Intl.NumberFormat('ko-KR').format(parseInt(numbers));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(event.target.value);
    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <Box className="form-input">
    {label && <CustomFormLabel label={label} />}
    <Box className="form-input-box flex-row">
        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder || "0"}
          sx={{ textAlign: "right" }}
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <Typography>만원</Typography>
        </Box>
        <HelperText error={!!errorMessage} message={errorMessage} />
    </Box>
  );
};



export default {
  MoneyBox,
};