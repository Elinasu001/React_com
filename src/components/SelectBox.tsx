
/**
 * @fileoverview selectBox UI
 *
 * 사용 예시:
 * import { SelectBox01, SelectBox02 } from "@src/components/SelectBox";
 */
import { Box, Typography, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material'; //Typography 타이포그래피 텍스트박스 생성 도구
import { useState, useEffect, ReactNode } from "react";

/**
 * 셀렉트 박스 속성
 */

interface ListItem {
  key: string;
  label: ReactNode;
  onClick?: () => void;
}

interface SelectBoxProps {
  label?: string;
  items:ListItem[];
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export const SelectBox01 = ({ label, items, value, onChange, defaultValue }: SelectBoxProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue); // 내부 상태 업데이트
    if (onChange) {
      onChange(newValue); // 부모로 값 전달
    }
  };

  
  return (
    <Box mt={3}>
      {label && <Typography variant="body2">{label}</Typography>}
      <Select fullWidth value={selectedValue} onChange={handleChange} displayEmpty>
        <MenuItem value="" disabled>
          선택하세요
        </MenuItem>
        {items.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

interface BankSelectBoxProps {
  label: string;
  value?: string;
  text?: string;
  onClick: () => void;
}

export const SelectBox02 = ({ label, value, text, onClick }: BankSelectBoxProps) => {
  return (
    <Box mt={3} width="100%">
      {label && <Typography variant="body2">{label}</Typography>}
      <FormControl sx={{ m: 1, minWidth: "100%", width: "100%" }}> {/* 화면에 맞게 조정 */}
      <InputLabel id="bank-select-label">{label}</InputLabel>
      <Select
        labelId="bank-select-label"
        id="bank-select"
        value={value}
        open={false}
        renderValue={(selected) => {
          if (!selected) return "선택";
          return text;
        }}
        onClick={onClick} // 부모에서 받은 함수 실행
      />
    </FormControl>
    </Box>
  );
};

export default { SelectBox01, SelectBox02 };


