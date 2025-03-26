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
  Typography,
  FormHelperText,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export const ResidentNumber = ({
    label,
    firstValue,
    secondValue,
    onFirstChange,
    onSecondChange,
    errorMessage,
  }: {
    label: string;
    firstValue?: string;
    secondValue?: string;
    onFirstChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSecondChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
  }) => {
    //const [firstFocused, setFirstFocused] = useState(false);
    //const [secondFocused, setSecondFocused] = useState(false);
  
    // 마스킹된 값을 표시하는 함수
    const getMaskedValue = (value?: string) => {
      if (!value) return '';
      return '●'.repeat(value.length);
    };
  
    return (
      <Box className="form-input">
        <FormLabel error={!!errorMessage}>{label}</FormLabel>
        <Box className="form-input-box flex-row">
          <Input 
            type="number" 
            placeholder="생년월일(6자리)" 
            value={firstValue} 
            onChange={onFirstChange} 
            inputProps={{ maxLength: 6 }} 
            //onFocus={() => setFirstFocused(true)}
            //onBlur={() => setFirstFocused(false)}
            error={!!errorMessage}
          />
          <Typography>-</Typography>
          <Box className="masked-input-box">
            <Input 
                        type="password"
                        className="masked-input-none"
              placeholder="뒷자리(7자리)" 
              value={secondValue} 
              onChange={onSecondChange} 
              inputProps={{ maxLength: 7 }} 
              error={!!errorMessage}
              //onFocus={() => setSecondFocused(true)}
              //onBlur={() => setSecondFocused(false)}
            />
            <Input 
              readOnly
              className="masked-input"
              placeholder="뒷자리(7자리)"
              value={getMaskedValue(secondValue)}
              error={!!errorMessage}
              sx={{ 
                width: "100%", 
                textAlign: "center",
                backgroundColor: 'transparent',
                '& .MuiInput-input': { 
                  cursor: 'default',
                  userSelect: 'none',
                  color: 'text.primary'
                },
                transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
              }}
            />
          </Box>
        </Box>
        {errorMessage && (
          <FormHelperText error sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <InfoOutlined fontSize="small" />
            {errorMessage}
          </FormHelperText>
        )}
      </Box>
    );
  };
  
  
export default {
  ResidentNumber,
};