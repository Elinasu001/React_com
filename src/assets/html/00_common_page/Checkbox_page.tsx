import { useState } from 'react';
import { NestedCheckbox, BasicCheckbox } from '@src/assets/html/00_common/form/Checobox';
import CustomSwitch from '@src/assets/html/00_common/form/Switch';

import { Typography, Box } from '@mui/material';

type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
  children?: CheckboxItem[];
};

const initialCheckboxData: CheckboxItem = {
  id: 'parent',
  label: '약관전체보기',
  checked: false,
  children: [
    {
      id: 'child1-1',
      label: '약관1',
      checked: false,
      children: [
        { id: 'child1-1-1', label: '약관1-1', checked: false },
        { id: 'child1-1-2', label: '약관1-2', checked: false },
        /*{
          id: 'child1-1-3',
          label: '약관3',
          checked: false,
          children: [
            { id: 'child1-3-1', label: '약관3-1', checked: false },
            { id: 'child1-3-2', label: '약관3-2', checked: false },
            { id: 'child1-3-3', label: '약관3-3', checked: false },
          ],
        },*/
      ],
    },
    { id: 'child2', label: '약관2', checked: false },
    { id: 'child3', label: '약관3', checked: false },
  ],
};

export default function CheckboxExample() {
  const [checkboxData, setCheckboxData] = useState<CheckboxItem>(initialCheckboxData);

  const handleChange = (updatedItem: CheckboxItem) => {
    setCheckboxData(updatedItem);
  };

  return (
    <>
      <Typography className="exp">체크박스 베이직</Typography>
      <Box className="formGroup">
        <BasicCheckbox label="CheckBox" />
        <BasicCheckbox label="CheckBox(Chcekd)" defaultChecked />
        <BasicCheckbox label="CheckBox(disabled)" disabled />
      </Box>

      <Typography className="exp">스위치</Typography>
      <Box className="formGroup">
        <CustomSwitch label="Switch" />
        <CustomSwitch label="Switch(Checked)" defaultChecked />
        <CustomSwitch label="Switch(disabled)" disabled />
      </Box>
      


      <Typography className="exp">약관 체크</Typography>
      <Box className="formGroup">
        <NestedCheckbox item={checkboxData} onChange={handleChange} />
      </Box>
    </>
  );
}