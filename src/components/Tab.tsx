/**
 * @fileoverview 탭 UI
 *
 * 사용 예시:
 * import { Tab01 } from "@src/components/Tab";
 */
import { Box, Tab, Tabs } from "@mui/material";
import React, { ReactNode, useState } from "react";

/**
 * 개별 탭 항목 속성
 */
interface TabItem {
  label: string;            // 탭 이름
  value: string | number;   // 탭 고유 값
  component?: ReactNode;    // 탭의 콘텐츠
}

/**
 * 공통 탭 컴포넌트 속성
 */
interface TabProps {
  items: TabItem[];                             // 탭 항목 배열
  initialValue?: string | number;               // 기본 선택 탭 (value)
  borderBottom?: boolean;                       // 탭 하단 테두리 여부
  onChange?: (value: string | number) => void;  // 탭 변경 콜백
}

/**
 * 탭 컴포넌트
 */
export const Tab01 = ({ 
  items,
  initialValue,
  onChange,
}: TabProps) => {
  const [value, setValue] = useState(initialValue ?? items[0]?.value); // 기본값이 없으면 첫 번째 탭 선택

  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    setValue(newValue);   // 선택한 탭
    if (onChange) onChange(newValue);
  };

  return (
    <Box className="tab-container round">
      {/* 탭 버튼 리스트 */

      /**
       *
       *  스크롤 기능 :: Tabs 태그 [ variant="scrollable" 적용, .scroll 클래스 적용]
       *  배경 탭 :: Box 태그 [ .bg-gray 클래스 적용 ]
       *  라운드 탭 :: Box 태그 [ .round ]
       *
       **/

      }
      <Tabs value={value} onChange={handleChange} variant="scrollable" className="tab-item scroll">
        {items.map((item) => (
          <Tab key={item.value} label={item.label} value={item.value} />
        ))}
      </Tabs>

      {/* 탭 콘텐츠 */}
      {items.map((item) => (
        item.component && value === item.value ? (
          <Box  key={item.value} className="tab-body">
            {item.component}
          </Box>
        ) : null
      ))}
    </Box>
  );
};

export default { Tab01 };
