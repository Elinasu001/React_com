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

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  disabledIcon?: boolean;
  onChange?: (checked: boolean) => void;
}

/** ✅ 공통 체크박스 컴포넌트 */
const CustomCheckbox = ({ label, checked, defaultChecked, indeterminate, disabled, onChange }: CheckboxProps) => {
  return (
    <FormControlLabel 
      className={`basic-check ${checked ? 'checked' : ''}`}
      control={
        <Checkbox
          checked={checked}
          defaultChecked={defaultChecked}
          indeterminate={indeterminate}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked)}
          icon={<span className="checkbox-icon" />}
          checkedIcon={<span className="checkbox-icon checked" />}
          indeterminateIcon={<span className="checkbox-icon indeterminate" />}
          disabledIcon={disabled ? <span className="checkbox-icon disabled" /> : undefined}
        />
      }
      label={label || ''}
    />
  );
};

/** ✅ 베이직 */
const BasicCheckbox = (props: CheckboxProps) => <CustomCheckbox {...props} />;

interface NestedCheckboxProps {
  item: CheckboxItem;
  onChange: (updatedItem: CheckboxItem) => void;
  level?: number;
  isTopLevel?: boolean;
}

/** ✅ 중첩 체크박스 */
const NestedCheckbox: React.FC<NestedCheckboxProps> = ({ item, onChange, level = 0, isTopLevel = true }) => {
  const hasChildren = item.children && item.children.length > 0;

  const handleChange = (newChecked: boolean) => {
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
        <CustomCheckbox
          label={item.label}
          checked={item.checked}
          indeterminate={hasChildren && !item.checked && !!item.children?.some(child => child.checked)}
          onChange={handleChange}
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

export { BasicCheckbox, NestedCheckbox };
