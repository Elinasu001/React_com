/**
 * @fileoverview 카드 UI
 *
 * 사용 예시:
 * import { Card01, Card02 } from "@src/components/Card";
 */
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Alert, Box, Card, CardContent, IconButton, Card as MuiCard, Snackbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DataSet from "@src/assets/io/DataSet";
import { Button01, ButtonContent } from "@src/components/Button";
import { openBottomPopupWithMenu } from "@src/components/Popup";
import React, { useState } from "react";

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
  // padding = "5px",
  // borderRadius = "20px",
  elevation = 5,
  // width = "95%",
  // height = "auto",
}: CardProps) => {
  return (
    <Card className="card-box" elevation={elevation}>
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
  acno: string;
  balance: number;
  pdnm: string;
  nick: string;
  newDt: string;
  wtchPosbAmt: number;
  psntInrt: number;
  nFunc?: (data?: DataSet) => void;
  showTradeHs? : boolean;
}

/**
 * 카드 컴포넌트 (계좌 전용)
 */

export const Card02 = ({ type, acno, balance, pdnm, newDt, wtchPosbAmt, psntInrt, nFunc, showTradeHs = true }: Card02Props) => {
  
  return (
    <Card className="card-box">
      <CardContent>
        <Box className="card-info-actions">
          
          <Typography variant="h6" className="card-name">
            {type} 계좌 {pdnm}
          </Typography>

          <StyledIconButton className="btn-control"
            onClick={() => 
              openBottomPopupWithMenu({
                title: "계좌설정", 
                param: new DataSet({ acno, type, pdnm, balance, nick, newDt, wtchPosbAmt, psntInrt })
              })
            }
          >
          <MoreVertIcon/>
          </StyledIconButton>
        </Box>

        {/* 계좌번호 및 복사 아이콘 */}
        <Box className="card-account-info">

          <Typography className="account-num">
            {acno}
          </Typography>
          <StyledIconButton  className="btn-copy"
            onClick={() => {
              if (typeof window !== "undefined" && navigator?.clipboard) {
                try {
                  navigator.clipboard.writeText(acno);
                } catch (error) {
                  console.error("클립보드 복사 오류:", error);
                }
              } else {
                console.warn("클립보드 복사는 브라우저에서만 가능합니다.");
              }
            }}
          >
            <ContentCopyIcon/>
          </StyledIconButton>
          
        </Box>

        {/* 계좌 잔액 */}
        <Box className="card-balance" sx={{ fontWeight: "bold", textAlign: "right" }}>
          <Typography className="txt-balance">잔액</Typography><Typography className="num-balance">{(balance ?? 0).toLocaleString()} <span>원</span></Typography>
        </Box>

        {/* 구분선 */}
        {/* <Divider sx={{ borderColor: "lightgray", borderBottomWidth: 1, my: 1 }} /> */}

        {/* 버튼 영역 */}
        {/* <Box className="btn-area">
          {type === "4" ? (
            <Button className="btn btn-secondary">
              상환
            </Button>
          ) : (
            <>
              <Button className="btn btn-secondary"
                onClick={() =>
                  nFunc?.(new DataSet({  acno, type, pdnm, balance }))
                }
              >
                거래내역
              </Button>

              <Button className="btn btn-primary">
                이체
              </Button>
            </>
          )}
        </Box> */}
        {/* 컨텐츠 공통 버튼으로 적용 */}
        <ButtonContent
          buttons={
            type === "4"
              ? [{ name: "상환", className: "btn-secondary" }]
              : [
                ...(showTradeHs ? [{name: "거래내역",className: "btn-secondary",onClick: () => nFunc?.(new DataSet({ acno, type, pdnm, balance }))}] : []),
                  { name: "이체", className: "btn-primary" },                
                ]
                
          }
        />
      </CardContent>

    </Card>
  );
};



/**
 * 상품 카드 속성
 */
interface Card03Props {
  pdcd: string;             // 상품코드
  pdnm: string;             // 상품명
  categoty: string;         // 카테고리
  pdDesc: string;           // 상품설명
  keyword: string[];        // 키워드
  contents1: string;        // 내용1
  contents2: string;        // 내용2
  categoryClass: string;    // 카테고리를 클래스별 색상변경
  onClick?: () => void;
}

/**
 * 스타일 지정 (아이콘 클릭 시 테두리 제거)
 */
const StyledIconButton = styled(IconButton)({
  outline: "none",
  "&:focus": { outline: "none" },
  "&.active": { color: "Salmon" },
});

/**
 * 상품 카드 컴포넌트
 */
export const Card03 = ({
  pdcd,
  pdnm,
  categoty,
  pdDesc,
  keyword,
  contents1,
  contents2,
  categoryClass,
  onClick
}: Card03Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 관심상품 클릭
  const handleGiftClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    setSnackbarMessage(
      isFavorite ? "관심 상품에서 제외되었습니다." : "관심 상품으로 등록되었습니다."
    );
    setSnackbarOpen(true);
  };

  // 비교상품 클릭
  const handleCompareClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCompared(!isCompared);
    setSnackbarMessage(
      isCompared ? "비교 상품에서 제외되었습니다." : "비교 상품으로 등록되었습니다."
    );
    setSnackbarOpen(true);
  };

  // 알림 닫기
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card onClick={onClick} className="card-box">

        {/* 카드 본문 */}
        <CardContent>

          {/* 상품 설명 + 아이콘 */}
          <Box className="card-info-actions">

            <Typography className="card-desc">
              {pdDesc}
            </Typography>

            <Box className="card-actions">
              {/* 비교상품 아이콘 */}
              <StyledIconButton
                onClick={handleCompareClick}
                disableRipple
                className={`btn-compare ${isCompared ? "active" : ""}`}
              >
              </StyledIconButton>

              {/* 관심상품 아이콘 */}
              <StyledIconButton
                onClick={handleGiftClick}
                disableRipple
                className={`btn-favorite ${isFavorite ? "active" : ""}`}
              >
              </StyledIconButton>

            </Box>
            
          </Box>

          {/* 상품명 + 카테고리 */}
          <Box className="card-info">
            <Typography className={`card-category ${categoryClass}`}>{/* .deposit : 예적금, .loan: 대출 , .clLoan: 종합대출  :: 화면이 안보여서 대출, 예/적금, 종합대출  클래스별 분류 필요 */}
              {categoty}
            </Typography>

            <Typography className="card-name" variant="h6">
              {pdnm}
            </Typography>
          </Box>

          {/* 키워드 */}
          <Typography className="card-tag">
            {keyword.join(" | ")}
          </Typography>

          {/* 내용1 */}
          <Typography  className="card-term" variant="subtitle2" sx={{ mt: 1.5, fontWeight: "bold" }}>
            {contents1}
          </Typography>

          {/* 내용2 */}
          <Typography className="card-rate" variant="h6" sx={{ fontWeight: "bold" }}>
            {contents2}
          </Typography>

        </CardContent>
      </Card>

      {/* 알림창 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};


 
export default { Card01, Card02, Card03, Card04 };