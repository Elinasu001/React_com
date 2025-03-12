/**
 * @fileoverview 탭 UI
 *
 * 사용 예시:
 * import { Tab01 } from "@src/components/Tab";
 */
import { Box, Tab, Tabs } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useSwipeable } from "react-swipeable";

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
  ariaLabel?: string;                                    // 접근성을 위한 Aria Label
  initialValue?: string | number;                        // 기본 선택 탭 (value)
  items: TabItem[];                                      // 탭 항목 배열
  containerClass?: "bg-gray" | "round" | "full" | "";    // 추가할 클래스 (bg-gray, round, full)

  scrollButtons?: true | false | "auto";                 // 스크롤 버튼 표시 여부
  isScrollable?: boolean;                                // 탭 스크롤 가능 여부
  allowScrollButtonsMobile?: boolean;                    // 모바일에서 스크롤 버튼 활성화 여부
  useSwiper?: boolean;                                   // 스와이프 적용 여부
  onChange?: (value: string | number) => void;           // 탭 변경 콜백
}

export const Tab01 = ({                                  // 기본값 설정
  ariaLabel = "탭 UI",
  initialValue,
  items,
  containerClass = "",

  scrollButtons = "auto",
  isScrollable = false,
  allowScrollButtonsMobile = false,
  useSwiper = false,
  onChange,
}: TabProps) => {
  const [value, setValue] = useState(initialValue ?? items[0]?.value); // 기본값이 없으면 첫 번째 탭 선택
  const currentIndex = items.findIndex((item) => item.value === value);

  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    setValue(newValue);   // 선택한 탭
    if (onChange) onChange(newValue);
  };

  // 스와이프 이벤트 핸들러
  const handlers = useSwiper
    ? useSwipeable({
        onSwipedLeft: () => {
          if (currentIndex < items.length - 1) {
            const newValue = items[currentIndex + 1].value;
            setValue(newValue);
            if (onChange) onChange(newValue);
          }
        },
        onSwipedRight: () => {
          if (currentIndex > 0) {
            const newValue = items[currentIndex - 1].value;
            setValue(newValue);
            if (onChange) onChange(newValue);
          }
        },
        preventScrollOnSwipe: true, // preventDefaultTouchmoveEvent 버그 해결  > preventScrollOnSwipe 최신 버전으로 적용
        trackMouse: true, // 마우스 드래그 지원
      })
    : {};

  return (
    <Box className={`tab-container ${containerClass}`.trim()} {...handlers}>
      {/* 탭 버튼 리스트 */}
      <Tabs
        value={value}
        onChange={handleChange}
        className="tab-item"
        variant={isScrollable ? "scrollable" : "standard"}
        scrollButtons={isScrollable ? scrollButtons : false}
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


/**
 *  탭 컴포넌트
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
