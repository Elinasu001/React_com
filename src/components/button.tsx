
/**
 * @fileoverview 버튼 UI
 *
 * 사용 예시:
 * import { button_01 } from "@src/components/button";
 */
import { Typography } from '@mui/material'; //Typography 타이포그래피 텍스트박스 생성 도구

export const GButtonTest = () => {
    return {
      title_01: (text: string) => <h1>{text}</h1>,
      title_02: (text: string) => <h2>{text}</h2>,
    };
  };
  