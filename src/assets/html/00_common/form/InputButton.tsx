import { IconButton, Box, Input } from "@mui/material";
import { HelperText } from "@src/assets/html/00_common/form/HelperText";
import { FormLabel as CustomFormLabel } from "@src/assets/html/00_common/form/label";

// ✅ 입력창 + 버튼 조합
export const InputWithButton = ({
    value,
    onChange,
    onButtonClick,
    errorMessage,
    label,
    type = "text",
    buttonText,
    placeholder,
  }: {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
    buttonText?: string;
    errorMessage?: string;
    label?: string;
    type?: string;
    placeholder?: string;
  }) => (
    <Box className="form-input">
        {label && <CustomFormLabel label={label} />}
        <Input
            type={type}
            value={value} 
            onChange={onChange}
            placeholder={placeholder}
        />
        <IconButton className="input-button" onClick={onButtonClick} >
            {buttonText}
        </IconButton>
        <HelperText error={!!errorMessage} message={errorMessage}  />
    </Box>
  );
  
  // ... existing code ...        