import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
  children?: CheckboxItem[];
}

interface NestedCheckboxProps {
  item: CheckboxItem;
  onChange: (updatedItem: CheckboxItem) => void;
  level?: number;
  isTopLevel?: boolean;
}

const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ item, onChange, level = 0, isTopLevel = true }) => {
  const hasChildren = item.children && item.children.length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    const updateCheckboxState = (item: CheckboxItem): CheckboxItem => ({
      ...item,
      checked: newChecked,
      children: item.children?.map(child => updateCheckboxState(child))
    });
    onChange(updateCheckboxState(item));
  };

  const handleChildChange = (childIndex: number) => (updatedChild: CheckboxItem) => {
    if (!item.children) return;

    const newChildren = [...item.children];
    newChildren[childIndex] = updatedChild;
    
    const allChecked = newChildren.every(child => child.checked);
    
    onChange({
      ...item,
      checked: allChecked,
      children: newChildren,
    });
  };

  return (
    <List className={isTopLevel ? "terms-wrap" : undefined} component="ul">
      <ListItem className="form-check">
        <FormControlLabel
          className="all-check"
          label={item.label}
          control={
            <Checkbox
              checked={item.checked}
              indeterminate={hasChildren && !item.checked && !!item.children?.some(child => child.checked)}
              onChange={handleChange}
            />
          }
        />
        {hasChildren && level < 3 && (
        <List component="ul" className="child-list">
          {item.children?.map((child, index) => (
            <ListItem key={child.id} component="li" disablePadding>
              <NestedCheckbox
                item={child}
                onChange={handleChildChange(index)}
                level={level + 1}
                isTopLevel={false}
              />
            </ListItem>
          ))}
        </List>
      )}
      </ListItem>
    </List>
  );
};

export default NestedCheckbox;