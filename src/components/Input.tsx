/**
 * @fileoverview Input 박스 UI
 *
 * 사용 예시:
 * import { TextBox } from "@src/components/button";
 */
import React from 'react';
import {
  TextField,
  Checkbox,
  Radio,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  FormLabel,
  FormControl,
  Box,
  Typography
} from '@mui/material';

// ✅ 일반 텍스트 박스
export const TextBox = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <TextField
    label={label}
    variant="outlined"
    fullWidth
    value={value}
    onChange={onChange}
    sx={{ mb: 2 }}
  />
);

// ✅ 숫자 입력 박스
export const NumberBox = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <TextField
    label={label}
    variant="outlined"
    type="number"
    fullWidth
    value={value}
    onChange={onChange}
    sx={{ mb: 2 }}
  />
);

// ✅ 이메일 입력 박스
export const EmailBox = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <TextField
    label={label}
    variant="outlined"
    type="email"
    fullWidth
    value={value}
    onChange={onChange}
    sx={{ mb: 2 }}
  />
);

// ✅ 비밀번호 입력 박스
export const PwdBox = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <TextField
    label={label}
    variant="outlined"
    type="password"
    fullWidth
    value={value}
    onChange={onChange}
    sx={{ mb: 2 }}
  />
);

// ✅ 체크박스
export const CheckBox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
  <FormGroup>
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={label}
    />
  </FormGroup>
);

// ✅ 라디오 버튼 그룹
export const RadioBox = ({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <FormControl component="fieldset" sx={{ mb: 2 }}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup value={value} onChange={onChange} row>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio />}
          label={option}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

// ✅ 이체 한도 입력 컴포넌트
export const LimitInput = ({ 
    label,
    placeholder,
    value,
    onChange
}: {
    label: string; 
    placeholder: string; 
    value?: number | string;  
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body1" sx={{ color: "gray" }}>{label}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          variant="standard"
          type="number"
          placeholder={placeholder}
          sx={{
            width: "100%",
            "& .MuiInputBase-input::placeholder": {
              color: "lightgray"
            },
          }}
          inputProps={{ 
            style: { textAlign: "left", fontWeight: "bold", color: "black" },
          }}
          value={value ?? ""} 
          onChange={onChange}  
        />
        <Typography sx={{ fontWeight: "bold" }}>원</Typography>
      </Box>
    </Box>
  );
};



// ✅ 기본 export
export default {
  TextBox,
  NumberBox,
  EmailBox,
  PwdBox,
  CheckBox,
  RadioBox
};