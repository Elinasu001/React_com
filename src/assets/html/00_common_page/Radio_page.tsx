import React from 'react';
import { CommonRadio } from '@src/assets/html/00_common/form/Radio';
import { Typography, Box } from '@mui/material';


const RadioPage: React.FC = () => {
  const radioOptions = [
    { value: 'option1', label: '옵션 1(checked)', disabled: false },
    { value: 'option2', label: '옵션 2(normal)', disabled: false },
    { value: 'option3', label: '옵션 3(disabled)', disabled: true},
  ];

  const buttonRadioOptions = [
    { value: 'option1', label: '옵션 2-1' },
    { value: 'option2', label: '옵션 2-2' },
    { value: 'option3', label: '옵션 2-3', disabled: true },
  ];

  const buttonRadioOptionsRow = [
    { value: 'option3-1', label: '옵션 3-1' },
    { value: 'option3-2', label: '옵션 3-2' },
    { value: 'option3-3', label: '옵션 3-3', disabled: true },
    { value: 'option3-4', label: '옵션 3-4' },
    { value: 'option3-5', label: '옵션 3-5' },
    { value: 'option3-6', label: '옵션 3-6' },

  ];

  const handleRadioChange = (value: string) => {
    console.log('선택된 값:', value);
  };

  return (
    <>
      <Typography className="exp">라디오 베이직</Typography>
      
      <Box className="formGroup">
        <CommonRadio
          options={radioOptions}
          defaultValue="option1"
          label="기본 스타일"
          name="basic-radio"
          variant="basic"
          onChange={handleRadioChange}
        />
      </Box>
    
      <Typography className="exp">라디오 버튼</Typography>    
      <Box className="formGroup">
        <CommonRadio
          options={buttonRadioOptions}
          defaultValue="option1"
          label="버튼 스타일"
          name="button-radio"
          variant="button"
          onChange={handleRadioChange}
        />
      </Box>

      <Typography className="exp">라디오 가로</Typography>    
      <Box className="formGroup">
        <CommonRadio
          options={buttonRadioOptionsRow}
          defaultValue="option1"
          label="버튼 스타일"
          name="button-radio"
          variant="button"
          row={true}
          onChange={handleRadioChange}
        />
      </Box>
    </>
  );
};

export default RadioPage;


