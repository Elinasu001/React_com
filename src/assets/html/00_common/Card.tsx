/**
 * @fileoverview 카드 UI
 *
 * 사용 예시:
 * import { Card01, Card02 } from "@src/components/Card";
 */
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Alert, Box, Button, Card, CardContent, List, ListItem, Snackbar, Typography, } from "@mui/material";
import { ButtonContent } from "@src/assets/html/00_common/Button";
import DataSet from "@src/assets/io/DataSet";
import { openBottomPopupWithMenu } from "@src/components/Popup";
import React, { useState } from "react";


/**
 * 계좌 카드 속성
 */
interface Card02Props {
  items: {
    type: string;
    acno: string;
    balance: number;
    pdnm: string;
    newDt: string;
    wtchPosbAmt: number;
    psntInrt: number;
    categoryClass: string; // 카테고리 색상 클래스
    nFunc?: (data?: DataSet) => void;
    showTradeHs?: boolean;
  }[];
}

/**
 * 카드 컴포넌트 (계좌 전용)
 */

export const Card02 = ({ items }: Card02Props) => {
  
  return (
    <List className="card-wrap">
      {items.map((item, index) => (
        <ListItem key={index} className="card-list">
          <Card className="card-box">
            <CardContent>
              <Box className="card-info-actions">
                {/* 상품타입 + 상품명 */}
                <Box className="card-info">
                  <Typography className={`card-category ${item.categoryClass}`}>
                    {item.type}
                  </Typography>
                  <Typography className="card-name" variant="h6">
                    {item.pdnm}
                  </Typography>
                </Box>

                {/* 설정 버튼 */}
                <Button
                  className="btn-control"
                  aria-label="계좌 설정"
                  onClick={() =>
                    openBottomPopupWithMenu({
                      title: "계좌설정",
                      param: new DataSet({
                        acno: item.acno,
                        type: item.type,
                        pdnm: item.pdnm,
                        balance: item.balance,
                        newDt: item.newDt,
                        wtchPosbAmt: item.wtchPosbAmt,
                        psntInrt: item.psntInrt,
                      }),
                    })
                  }
                >
                  <MoreVertIcon />
                </Button>
              </Box>

              {/* 계좌번호 및 복사 아이콘 */}
              <Box className="card-account-info">
                <Typography className="account-num">{item.acno}</Typography>
                <Button
                  className="btn-copy"
                  aria-label="계좌 복사"
                  onClick={() => {
                    if (typeof window !== "undefined" && navigator?.clipboard) {
                      try {
                        navigator.clipboard.writeText(item.acno);
                      } catch (error) {
                        console.error("클립보드 복사 오류:", error);
                      }
                    } else {
                      console.warn("클립보드 복사는 브라우저에서만 가능합니다.");
                    }
                  }}
                >
                  <ContentCopyIcon />
                </Button>
              </Box>

              {/* 계좌 잔액 */}
              <Box className="card-balance" sx={{ fontWeight: "bold", textAlign: "right" }}>
                <Typography className="txt-balance">잔액</Typography>
                <Typography className="num-balance">
                  {(item.balance ?? 0).toLocaleString()} <span>원</span>
                </Typography>
              </Box>

              {/* 컨텐츠 공통 버튼 적용 */}
              <ButtonContent
                buttons={
                  item.type === "4"
                    ? [{ name: "상환" }]
                    : [
                        ...(item.showTradeHs
                          ? [
                              {
                                name: "거래내역",
                                onClick: () =>
                                  item.nFunc?.(new DataSet({ acno: item.acno, type: item.type, pdnm: item.pdnm, balance: item.balance })),
                              },
                            ]
                          : []),
                        { name: "이체" },
                      ]
                }
              />
            </CardContent>
          </Card>
        </ListItem>
      ))}
  </List>
);
};



/**
 * 상품 카드 속성
 */

interface Card03Props {
  items: {
    pdcd: string;             // 상품코드
    pdnm: string;             // 상품명
    categoty: string;         // 카테고리
    pdDesc: string;           // 상품설명
    keyword: string[];        // 키워드
    contents1: string;        // 내용1
    contents2: string;        // 내용2
    categoryClass: string;    // 카테고리를 클래스별 색상변경
    onClick?: () => void;
  }[];
}


// 개별 카드 컴포넌트 (각 ListItem 내부에서 사용)
export const Card03 = ({ items }: Card03Props) => {
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
    <List className="card-wrap">
      {items.map((item, index) => (
        <ListItem key={index} className="card-list">
          <Card onClick={item.onClick} className="card-box">
            <CardContent>
              {/* 상품 설명 + 아이콘 */}
              <Box className="card-info-actions">
                <Typography className="card-desc">{item.pdDesc}</Typography>
                <Box className="card-actions">
                  <Button onClick={handleCompareClick} disableRipple className={`btn-compare ${isCompared ? "active" : ""}`} aria-label="비교하기"></Button>
                  <Button onClick={handleGiftClick} disableRipple className={`btn-favorite ${isFavorite ? "active" : ""}`} aria-label="관심상품"></Button>
                </Box>
              </Box>

              {/* 카테고리 + 상품명 */}
              <Box className="card-info">
                <Typography className={`card-category ${item.categoryClass}`}>
                  {item.categoty}
                </Typography>
                <Typography className="card-name" variant="h6">
                  {item.pdnm}
                </Typography>
              </Box>

              {/* 키워드 */}
              <Typography className="card-tag">
                {item.keyword.join(" | ")}
              </Typography>

              {/* 내용1 */}
              <Typography className="card-term" variant="subtitle2" sx={{ mt: 1.5, fontWeight: "bold" }}>
                {item.contents1}
              </Typography>

              {/* 내용2 */}
              <Typography className="card-rate" variant="h6" sx={{ fontWeight: "bold" }}>
                {item.contents2}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
     ))}
      {/* 알림창 */}
      <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </List>
  );
};

 
export default { Card02, Card03 };