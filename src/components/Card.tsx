
/**
 * @fileoverview 카드 UI
 *
 * 사용 예시:
 * import { Card01 } from "@src/components/Card";
 */
import React from "react";
import { Card } from "@mui/material";

/**
 * 카드 기본 속성
 */
interface CardProps {
  children: React.ReactNode;
  padding?: string;        // 내부 여백
  boxShadow?: string;      // 그림자
  borderRadius?: string;   // 테두리 둥글기
  width?: string;          // 카드 너비
  height?: string;         // 카드 높이
}

/**
 * 카드 컴포넌트
 */
export const Card01 = ({ children, padding, boxShadow, borderRadius, width, height }: CardProps) => {
  return (
    <Card
      sx={{
        mb: 2,
        padding: padding == null ? "5px" : padding,
        boxShadow: boxShadow == null ? '2px' : boxShadow,
        borderRadius: borderRadius == null ? '20px' : borderRadius,
        width: width == null ? "95%" : width,
        height: height == null ? "auto" : height,
      }}
    >
      {children}
    </Card>
  );
};

export default { Card01 };