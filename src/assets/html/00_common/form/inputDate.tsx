import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Box, Dialog, DialogContent, Typography, Button, DialogActions } from '@mui/material';
import { FormLabel as CustomFormLabel } from "@src/assets/html/00_common/form/label";
import { HelperText } from "@src/assets/html/00_common/form/HelperText";
import { useState } from 'react';

interface DatePickerProps {
  label: string;
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs | null) => void;
  views?: ('year' | 'month' | 'day')[];
  defaultValue?: dayjs.Dayjs;
  errorMessage?: string;
  format?: string;
}

export const DatePickerValue = ({
  label,
  value,
  onChange,
  views = ['year', 'month', 'day'],
  defaultValue,
  errorMessage,
  format,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getFormat = () => {
    if (format) return format;
    if (views.length === 1 && views[0] === 'month') return 'YYYY년 MM월';
    return 'YYYY년 MM월 DD일';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box className="form-input date">
        {label && <CustomFormLabel label={label} />}
        <DatePicker
          value={value}
          onChange={onChange}
          views={views}
          defaultValue={defaultValue}
          open={false}
          format={getFormat()}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!errorMessage,
              onClick: () => setOpen(true),
              inputProps: {
                'aria-invalid': !!errorMessage
              }
            }
          }}
        />
        <HelperText error={!!errorMessage} message={errorMessage} />
      </Box>

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
          <Typography variant="h2">{label}</Typography>
          <Button aria-label="close" onClick={handleClose} className="btn btn-close right">
            <Typography component="span" className="sr-only">닫기</Typography>
          </Button>
        </Box>
        <DialogContent className="pop-body" sx={{ p: 0, maxWidth: '100%', width: '100%' }}>
          <StaticDatePicker
            value={value}
            onChange={onChange}
            views={views}
            defaultValue={defaultValue}
            displayStaticWrapperAs="desktop"
            localeText={{ 
              okButtonLabel: '확인',
              cancelButtonLabel: '취소',
              clearButtonLabel: '초기화',
              todayButtonLabel: '오늘',
              previousMonth: '이전 달',
              nextMonth: '다음 달',
              toolbarTitle: '날짜 선택'
            }}
            sx={{
                '& .MuiPickersCalendarHeader-label': {
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
              
                  // 기존 텍스트 완전히 숨기기
                  color: 'transparent',
                  fontSize: 0,
                  '&::before': {
                    content: `"${value ? value.year() : ''}년"`,
                    fontSize: '1rem',
                    color: '#000',
                    marginRight: '0.5rem',
                    },
                  
                  '&::after': {
                    content: `"${value ? value.month() + 1 : ''}월"`,
                    fontSize: '1rem',
                    color: '#000',
                  },
                }
              }}              
          />
           <Box className="content-footer">
                <Button className="btn btn-primary" variant="contained" onClick={handleClose}>확인</Button>
           </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default {
  DatePickerValue,
};