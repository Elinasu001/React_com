import { useState } from 'react';
import NestedCheckbox from '@src/components/checkbox';
import { Box, Checkbox } from '@mui/material';

type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
  children?: CheckboxItem[];
};

const initialCheckboxData: CheckboxItem = {
  id: 'parent',
  label: 'Parent',
  checked: false,
  children: [
    {
      id: 'child1',
      label: 'Child 1',
      checked: false,
      children: [
        { id: 'child1-1', label: 'Child 1-1', checked: false },
        { id: 'child1-2', label: 'Child 1-2', checked: false },
        {
          id: 'child1-3',
          label: 'Child 1-3',
          checked: false,
          children: [
            { id: 'child1-3-1', label: 'Child 1-3-1', checked: false },
            { id: 'child1-3-2', label: 'Child 1-3-2', checked: false },
            { id: 'child1-3-3', label: 'Child 1-3-3', checked: false },
          ],
        },
      ],
    },
    { id: 'child2', label: 'Child 2', checked: false },
    { id: 'child3', label: 'Child 3', checked: false },
  ],
};

export default function CheckboxExample() {
  const [checkboxData, setCheckboxData] = useState<CheckboxItem>(initialCheckboxData);

  const handleChange = (updatedItem: CheckboxItem) => {
    setCheckboxData(updatedItem);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Checkbox label="Label" />
        <Checkbox label="Label" defaultChecked />
      </Box>
      
      <Box sx={{ p: 2 }}>
        <NestedCheckbox item={checkboxData} onChange={handleChange} />
      </Box>
    </Box>
  );
}