
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
  padding?: string;         // 내부 여백
  borderRadius?: string;    // 테두리 둥글기
  elevation?: number;       // 그림자 (0~24까지)
  width?: string;           // 카드 너비
  height?: string;          // 카드 높이
}

/**
 * 카드 컴포넌트
 */
export const Card01 = ({
    children,
    padding = '5px',
    borderRadius = '20px',
    elevation = 5,
    width = '95%',
    height = 'auto',
    }: CardProps) => {
    return (
        <Card
        elevation={elevation}
        sx={{
            mb: 2,
            p: padding,
            borderRadius: borderRadius,
            width: width,
            height: height
        }}
        >
        {children}
        </Card>
    );
};

export default { Card01 };