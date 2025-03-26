import { useState } from "react";
import {
  FormLabel,
  Button,
  Typography,
  Dialog,
  DialogContent,
  List,
  ListItem,
  Box,
} from "@mui/material";

interface BaseSelectPopupProps {
  label: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (event: any) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface SelectPopupWithFormProps extends BaseSelectPopupProps {
  withFormControl: true;
}

interface SelectPopupWithoutFormProps extends BaseSelectPopupProps {
  withFormControl: false;
}

type SelectPopupProps = SelectPopupWithFormProps | SelectPopupWithoutFormProps;

const SelectPopup = ({
  label,
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
  disabled = false,
  withFormControl = true
}: SelectPopupProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange({ target: { value: selectedValue } });
    }
    handleClose();
  };

  const SelectButton = (
    <Button onClick={handleOpen} disabled={disabled}>
      <Typography 
        className="btn-select"
        sx={{
          color: selectedOption ? 'var(--color-2)' : '#757575'
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </Typography>
    </Button>
  );

  return (
    <>
      {withFormControl ? (
        <Box className="form-input">
          <FormLabel>{label}</FormLabel>
          {SelectButton}
        </Box>
      ) : (
        SelectButton
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        className="popup-container btmSheet"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          '& .MuiDialog-paper': {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            m: 0,
            borderRadius: '16px 16px 0 0',
            maxHeight: '70vh',
            width: '100vw',
            boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.15)'
          },
          '& .MuiDialog-container': {
            alignItems: 'flex-end'
          }
        }}
      >
        <Box className="pop-header">
          <Typography variant="h2">{placeholder}</Typography>
          <Button aria-label="close" onClick={() => { handleClose(); }} className="btn btn-close right">
            <Typography component="span" className="sr-only">닫기</Typography>
          </Button>
        </Box>
        <DialogContent className="pop-body" sx={{ p: 0, maxWidth: '100%', width: '100%' }}>
          <List sx={{ pt: 0, pb: 2, width: '100%' }}>
            {options.map((option) => (
              <ListItem
                key={option.value}
                onClick={() => handleSelect(option.value)}
                sx={{
                  py: 2,
                  px: 3,
                  width: '100%',
                  textAlign: 'center',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: option.value === value ? '#1976d2' : 'inherit',
                  fontWeight: option.value === value ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  },
                  '&:active': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)'
                  }
                }}
              >
                {option.label}
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectPopup; 