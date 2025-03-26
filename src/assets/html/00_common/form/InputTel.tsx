/**
 * @fileoverview Input 박스 UI
 *
 * 사용 예시:
 * import { TextBox } from "@src/components/Input";
 */
import React from "react";
import {
  FormLabel,
  Input,
  Box,
  FormHelperText,

} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import SelectPopup from '@src/assets/html/00_common/form/select';


export const SelectInputBox = ({
  selectLabel,
  selectOptions,
  selectValue,
  onSelectChange,
  inputValue,
  onInputChange,
  errorMessage,
}: {
  selectLabel: string;
  selectOptions: { label: string; value: string }[];
  selectValue?: string;
  onSelectChange?: (event: any) => void;
  inputValue?: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}) => (
  <Box className="form-input">
    <FormLabel error={!!errorMessage}>{selectLabel}</FormLabel>
    <Box className="form-input-box flex-row">
      <SelectPopup
        label=""
        options={selectOptions}
        value={selectValue}
        onChange={onSelectChange}
        placeholder="통신사 선택"
        withFormControl={false}
      />
      <Input 
        placeholder="번호 입력" 
        value={inputValue} 
        onChange={onInputChange} 
        sx={{ width: "200px" }} 
        error={!!errorMessage}
      />
    </Box>
    {errorMessage && (
      <FormHelperText error sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <InfoOutlined fontSize="small" />
        {errorMessage}
      </FormHelperText>
    )}
  </Box>
);

// ✅ 기본 export
export default {
  SelectInputBox,
  SelectPopup
};