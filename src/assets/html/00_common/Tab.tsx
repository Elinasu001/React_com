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
  isScrollable?: boolean;                       // 탭 스크롤 가능 여부
  containerClass?: "bg-gray" | "round" | "full" | "";    // 추가할 클래스 (bg-gray, round)
  scrollButtons?: true | false | "auto";        // 스크롤 버튼 표시 방식
  allowScrollButtonsMobile?: boolean;           // 모바일에서 스크롤 버튼 활성화 여부
  ariaLabel?: string;                           // 접근성을 위한 Aria Label
  onChange?: (value: string | number) => void;  // 탭 변경 콜백
}


/**
 * 탭 컴포넌트
 */
export const Tab01 = ({
  items,
  initialValue,
  isScrollable = false,
  containerClass = "",
  scrollButtons = "auto",
  allowScrollButtonsMobile = false,
  ariaLabel = "탭 UI",
  onChange,
}: TabProps) => {
  const [value, setValue] = useState(initialValue ?? items[0]?.value); // 기본값이 없으면 첫 번째 탭 선택

  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    setValue(newValue);   // 선택한 탭
    if (onChange) onChange(newValue);
  };

  return (

    /**
     *  // 스타일
     *  기본 탭
     *  꽉찬 탭 :: containerClass="full"
     *  배경 탭 :: containerClass="bg-gray"
     *  라운드 탭 :: containerClass="round"
     *  // 기능
     *  탭 스크롤 기능 :: Tabs 태그 [ isScrollable={true} 적용 ]
     *  탭 스크롤 기능 + 버튼 기능 :: Tabs 태그 [ isScrollable={true} + scrollButtons={true} 적용 ]
     *
     *  예시)
     *  <Tab01
     *     items={[
     *       { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
     *       { value: "tab2", label: "탭 2", component: <div>내용 2</div> },
     *     ]}
     *     initialValue="기본 선택 탭"
     *     isScrollable={true}  // 스크롤 추가
     *     containerClass="bg-gray" // "bg-gray", "round" "full" 스타일
     *   />
     **/

    <Box className={`tab-container ${containerClass}`.trim()}>
      {/* 탭 버튼 리스트 */}
      <Tabs
        value={value}
        onChange={handleChange}
        className="tab-item"
        variant={isScrollable ? "scrollable" : "standard"}
        scrollButtons={isScrollable ? scrollButtons : false}  // 수정된 부분
        allowScrollButtonsMobile={isScrollable ? allowScrollButtonsMobile : false}
        aria-label={ariaLabel}
      >
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
