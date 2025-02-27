/**
 * @fileoverview 카드 UI
 *
 * 사용 예시:
 * import { Card01, Card02 } from "@src/components/Card";
 */
import React from "react";
import { Card as MuiCard, Card, CardContent, Box, Typography, IconButton, Divider, ListItemButton } from "@mui/material";
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
 * 카드 기본 속성
 */
interface Card04Props {
    children: React.ReactNode;
    title: string;         // 제목
  }

/**
 * 카드 컴포넌트 (제목이 있는 기본 카드)
 */
export const Card04 = ({ title, children }: Card04Props) => {
    return (
      <MuiCard sx={{ p: 2, borderRadius: "12px", mb: 2 }}>
        {title && (
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {title}
          </Typography>
        )}
        <Box>{children}</Box>
      </MuiCard>
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


/**
 * 대출상품 카드 속성
 */
interface Card03Props {
  pdcd: string;               // 상품코드
  pdnm: string;               // 상품명
  cmmProdCategoty: string;    // 카테고리
  pdDesc: string;             // 상품설명
  keyword: string[];          // 키워드
  maxLimit: string;           // 최대한도
  minIntrate: string;         // 최저금리
  maxIntrate: string;         // 최대금리
}

/**
 * 대출상품 카드 컴포넌트
 */
export const Card03 = ({
  pdcd,
  pdnm,
  cmmProdCategoty,
  pdDesc,
  keyword,
  maxLimit,
  minIntrate,
  maxIntrate,
}: Card03Props) => {

  return (
      <Card01 padding="2px" elevation={3}>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {pdDesc}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Box
                sx={{
                  color: "Salmon",
                  border: "2px solid Salmon",
                  fontSize: "12px",
                  fontWeight: "bold",
                  px: 1,
                  py: 0.3,
                  borderRadius: "20px",
                }}
              >
                {cmmProdCategoty}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {pdnm}
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {keyword.join(" | ")}
            </Typography>

            <Typography variant="subtitle2" color="secondary" sx={{ fontWeight: 700, mt: 2 }}>
              최대한도 {maxLimit}만원
            </Typography>

            <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
              연 {minIntrate}%~{maxIntrate}%
            </Typography>
          </CardContent>

      </Card01>
    );
  };

export default { Card01, Card02, Card03, Card04 };
