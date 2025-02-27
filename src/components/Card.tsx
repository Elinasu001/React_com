/**
 * @fileoverview 카드 UI
 *
 * 사용 예시:
 * import { Card01, Card02 } from "@src/components/Card";
 */
import React from "react";
import { Card, Box, Typography, IconButton, Divider, ListItemButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
 * 카드 컴포넌트 (기본)
 */
export const Card01 = ({
  children,
  padding = "5px",
  borderRadius = "20px",
  elevation = 5,
  width = "95%",
  height = "auto",
}: CardProps) => {
  return (
    <Card
      elevation={elevation}
      sx={{
        mb: 2,
        p: padding,
        borderRadius: borderRadius,
        width: width,
        height: height,
      }}
    >
      {children}
    </Card>
  );
};

/**
 * 계좌 카드 속성
 */
interface Card02Props {
  type: string;
  number: string;
  balance: number;
}

/**
 * 카드 컴포넌트 (계좌 전용)
 */
export const Card02 = ({ type, number, balance }: Card02Props) => {
  return (
    <Card
      elevation={5}
      sx={{
        mb: 2,
        p: 2,
        borderRadius: "12px",
        width: "95%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {type} 계좌
        </Typography>
      </Box>

      {/* 계좌번호 및 복사 아이콘 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body1" color="textSecondary">
          {number}
          <IconButton onClick={() => navigator.clipboard.writeText(number)} sx={{ p: 1 }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Typography>

        {/* 계좌 잔액 */}
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "right" }}>
          {balance.toLocaleString()} 원
        </Typography>
      </Box>

      {/* 구분선 */}
      <Divider sx={{ borderColor: "lightgray", borderBottomWidth: 1, my: 1 }} />

      {/* 버튼 영역 */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, alignItems: "center" }}>
        {type === "대출" ? (
          <ListItemButton
            sx={{
              justifyContent: "center",
              width: "100px",
              bgcolor: "transparent",
              color: "black",
              borderRadius: 2,
              "&:hover": { bgcolor: "grey.400" },
            }}
          >
            상환
          </ListItemButton>
        ) : (
          <>
            <ListItemButton
              sx={{
                justifyContent: "center",
                width: "100px",
                bgcolor: "transparent",
                color: "black",
                borderRadius: 2,
                "&:hover": { bgcolor: "grey.400" },
              }}
            >
              거래내역
            </ListItemButton>

            <Divider orientation="vertical" flexItem sx={{ height: "35px", borderColor: "lightgray" }} />

            <ListItemButton
              sx={{
                justifyContent: "center",
                width: "100px",
                bgcolor: "transparent",
                color: "black",
                borderRadius: 2,
                "&:hover": { bgcolor: "grey.400" },
              }}
            >
              이체
            </ListItemButton>
          </>
        )}
      </Box>
    </Card>
  );
};

export default { Card01, Card02 };
