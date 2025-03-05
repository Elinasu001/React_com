
/**
 * @fileoverview selectBox UI
 *
 * 사용 예시:
 * import { Button01 } from "@src/components/button";
 */
import { Box, Typography, Select, MenuItem, SelectChangeEvent  } from '@mui/material'; //Typography 타이포그래피 텍스트박스 생성 도구
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


export default { SelectBox01 };

