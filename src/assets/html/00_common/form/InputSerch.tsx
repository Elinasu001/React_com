import { IconButton, Box, Input } from "@mui/material";
import { HelperText } from "@src/assets/html/00_common/form/HelperText";
import { FormLabel as CustomFormLabel } from "@src/assets/html/00_common/form/label";

// ✅ 입력창 + 버튼 조합
export const InputSerch = ({
    value,
    onChange,
    onButtonClick,
    errorMessage,
    label,
    type = "text",
    buttonText,
    placeholder,
    variant = "default",
  }: {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
    buttonText?: string;
    errorMessage?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    variant?: "default" | "total-search";
  }) => {
    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <Box className={`form-input ${variant}`}>
          {label && <CustomFormLabel label={label} />}
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Input
                type={type}
                value={value} 
                onChange={onChange}
                placeholder={placeholder}
            />
          </Box>
            <Box className="button-box">
            {value && (
              <IconButton className="input-clear-button" onClick={handleClear} />
            )}  
              <IconButton className="input-serch-button" onClick={onButtonClick} >
                  {buttonText}
              </IconButton>
          </Box>
          <HelperText error={!!errorMessage} message={errorMessage}  />
      </Box>
    );
  };
  
  export default {
    InputSerch,
  };