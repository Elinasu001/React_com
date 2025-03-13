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
import { openBottomPopupWithMenu } from "@src/assets/html/00_common/Popup";
import DataSet from "@src/assets/io/DataSet";
import React, { useState } from "react";


/**
 *  예적금 관리 카드 속성
 */
interface AcnoDepositCardProps {
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

    buttons?: { name: string; onClick?: () => void }[]; // 예시 버튼입니다.
  }[];
}

/**
 *  예적금 카드 컴포넌트 (계좌 전용)
 */

export const AcnoDepositCard = ({ items }: AcnoDepositCardProps) => {
  
  return (
    <List className="card-wrap">
      {items.map((item, index) => (
        <ListItem key={index} className="card-list">
          <Card className="card-box">
            <CardContent>
              <Box className="card-info-actions">
                    {/* 상품타입 + 상품명 */}
                    <Box className="card-info">
                    <Typography className={`card-category ${item.categoryClass}`} aria-label={`상품 유형: ${item.type}`}>
                        {item.type}
                    </Typography>
                    <Typography className="card-name" variant="h6" aria-label={`상품명: ${item.pdnm}`}>
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
                    <Typography className="account-num" aria-label={`계좌번호 ${item.acno}`}>
                    {item.acno}
                    </Typography>
                    <Button
                    className="btn-copy"
                    aria-label="계좌번호 복사"
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
                <Box className="card-balance">
                    <Typography className="txt-balance">잔액</Typography>
                    <Typography className="num-balance highlight" aria-label={`잔액 ${item.balance.toLocaleString()} 원`}>
                    {(item.balance ?? 0).toLocaleString()} <span>원</span>
                    </Typography>
                </Box>

                {/* 컨텐츠 공통 버튼 적용 - 예시입니다. */}
                {item.buttons && item.buttons.length > 0 && <ButtonContent buttons={item.buttons} />}

            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
);
};


/**
 *  대출 관리 카드 속성
 */
interface AcnoLoanCardProps {
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
    
    buttons?: { name: string; onClick?: () => void }[]; // 예시 버튼입니다.
  }[];
}

/**
 * 대출 카드 컴포넌트 (계좌 전용)
 */

export const AcnoLoanCard = ({ items }: AcnoLoanCardProps) => {
  
  return (
    <List className="card-wrap">
      {items.map((item, index) => (
        <ListItem key={index} className="card-list">
          <Card className="card-box">
            <CardContent>
                <Box className="card-info-actions">
                    {/* 상품타입 + 상품명 */}
                    <Box className="card-info">
                    <Typography className={`card-category ${item.categoryClass}`} aria-label={`상품 유형: ${item.type}`}>
                        {item.type}
                    </Typography>
                    <Typography className="card-name" variant="h6" aria-label={`상품명: ${item.pdnm}`}>
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
    
                {/* 만기일자 표시 */}
                <Typography className="card-mtyDate">만기일자 <span className="card-mtyDate-value">{["2024-03-13", "원리금균등"].join(" | ")}</span></Typography>

                {/* 계좌번호 및 복사 아이콘 */}
                <Box className="card-account-info">
                    <Typography className="account-num" aria-label={`계좌번호 ${item.acno}`}>
                    {item.acno}
                    </Typography>
                    <Button
                    className="btn-copy"
                    aria-label="계좌번호 복사"
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
                <Box className="card-balance">
                    <Typography className="txt-balance">잔액</Typography>
                    <Typography className="num-balance highlight" aria-label={`잔액 ${item.balance.toLocaleString()} 원`}>
                    {(item.balance ?? 0).toLocaleString()} <span>원</span>
                    </Typography>
                </Box>

                {/* 컨텐츠 공통 버튼 적용 - 예시입니다. */}
                {item.buttons && item.buttons.length > 0 && <ButtonContent buttons={item.buttons} />}

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

export const Card03 = ({ items }: Card03Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 각 카드별 상태를 배열로 관리
  const [isFavorite, setIsFavorite] = useState<boolean[]>(Array(items.length).fill(false));
  const [isCompared, setIsCompared] = useState<boolean[]>(Array(items.length).fill(false));

  // 관심상품 클릭
  const handleGiftClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    
    setIsFavorite((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });

    setSnackbarMessage(
      isFavorite[index] ? "관심상품에서 제외되었습니다." : "관심상품으로 등록되었습니다."
    );
    setSnackbarOpen(true);
  };

  // 비교상품 클릭
  const handleCompareClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    
    setIsCompared((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });

    setSnackbarMessage(
      isCompared[index] ? "비교상품에서 제외되었습니다." : "비교상품으로 등록되었습니다."
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
                <Typography className="card-desc" aria-label={`상품 설명: ${item.pdDesc}`}>
                  {item.pdDesc}
                </Typography>

                {/* 비교하기 + 관심상품 */}
                <Box className="card-actions">
                  <Button
                    className={`btn-compare ${isCompared[index] ? "active" : ""}`}
                    onClick={(event) => handleCompareClick(event, index)}
                    disableRipple
                    aria-label="비교하기"
                    aria-pressed={isCompared[index]}
                  ></Button>
                  <Button
                    className={`btn-favorite ${isFavorite[index] ? "active" : ""}`}
                    onClick={(event) => handleGiftClick(event, index)}
                    disableRipple
                    aria-label="관심상품"
                    aria-pressed={isFavorite[index]}
                  ></Button>
                </Box>
              </Box>

              {/* 카테고리 + 상품명 */}
              <Box className="card-info">
                <Typography  className={`card-category ${item.categoryClass}`} aria-label={`카테고리: ${item.categoty}`}>
                  {item.categoty}
                </Typography>
                <Typography  className="card-name" variant="h6" aria-label={`상품명: ${item.pdnm}`}>
                  {item.pdnm}
                </Typography>
              </Box>

              {/* 키워드 */}
              <Typography className="card-tag" aria-label={`관련 키워드: ${item.keyword.join(", ")}`}>
                {item.keyword.join(" | ")}
              </Typography>

              {/* 내용1 */}
              <Typography className="card-term" aria-label={`설명: ${item.contents1}`}>
                {item.contents1}
              </Typography>

              {/* 내용2 */}
              <Typography className="card-rate" aria-label={`상세 내용: ${item.contents2}`}>
                {item.contents2}
              </Typography>
            </CardContent>
          </Card>
        </ListItem>
      ))}

      {/* 알림창 */}
      <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={handleSnackbarClose}  aria-live="polite" anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </List>
  );
};


/**
 * 계좌 관리 속성
 */
interface Card04Props {
  items: {
    type: string;
    acno: string;
    balance: number;
    pdnm: string;
    newDt: string;
    wtchPosbAmt: number;
    psntInrt: number;
    keyword: string[];       // 키워드
    categoryClass: string;  // 카테고리 색상 클래스
    nFunc?: (data?: DataSet) => void;
    showTradeHs?: boolean;
  }[];
}

/**
 * 카드 컴포넌트 (계좌 전용)
 */

export const Card04 = ({ items }: Card04Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 각 카드별 상태를 배열로 관리
  const [isFavorite, setIsFavorite] = useState<boolean[]>(Array(items.length).fill(false));

  // 관심상품 클릭
  const handleGiftClick = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    
    setIsFavorite((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });

    setSnackbarMessage(
      isFavorite[index] ? "즐겨찾기에서 제외되었습니다." : "즐겨찾기로 등록되었습니다."
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
          <Card className="card-box">
            <CardContent>
              <Box className="card-info-actions">
                {/* 상품타입 + 상품명 */}
                <Box className="card-info">
                  <Typography className={`card-category ${item.categoryClass}`} aria-label={`상품 유형: ${item.type}`}>
                    {item.type}
                  </Typography>
                  <Typography className="card-name" variant="h6" aria-label={`상품명: ${item.pdnm}`}>
                    {item.pdnm}
                  </Typography>
                </Box>

                {/* 수정 + 즐겨찾기 버튼 */}
                <Box className="card-actions">
                  <Button
                    className={"btn-modify"}
                    disableRipple
                    aria-label="수정하기"
                  ></Button>
                  <Button
                    className={`btn-star ${isFavorite[index] ? "active" : ""}`}
                    onClick={(event) => handleGiftClick(event, index)}
                    disableRipple
                    aria-label="즐겨찾기"
                    aria-pressed={isFavorite[index]}
                  ></Button>
                </Box>
              </Box>

              {/* 키워드 */}
              <Typography className="card-tag" aria-label={`관련 키워드: ${item.keyword.join(", ")}`}>
                {item.keyword.join(" | ")}
              </Typography>

              {/* 계좌번호 및 복사 아이콘 */}
              <Box className="card-account-info">
                <Typography className="account-num" aria-label={`계좌번호 ${item.acno}`}>
                  {item.acno}
                </Typography>
                <Button
                  className="btn-copy"
                  aria-label="계좌번호 복사"
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
              <Box className="card-balance">
                <Typography className="txt-balance">잔액</Typography>
                <Typography className="num-balance" aria-label={`잔액 ${item.balance.toLocaleString()} 원`}>
                  {(item.balance ?? 0).toLocaleString()} <span>원</span>
                </Typography>
              </Box>

              {/* 컨텐츠 공통 버튼 적용 */}
              <ButtonContent
                buttons={
                  item.type === "4"
                    ? [{ name: "상환하기" }]
                    : [
                        ...(item.showTradeHs
                          ? [
                              {
                                name: "거래내역보기",
                                onClick: () =>
                                  item.nFunc?.(new DataSet({ acno: item.acno, type: item.type, pdnm: item.pdnm, balance: item.balance })),
                              },
                            ]
                          : []),
                        { name: "이체하기" },
                      ]
                }
              />
            </CardContent>
          </Card>
        </ListItem>
      ))}

      {/* 알림창 */}
      <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={handleSnackbarClose}  aria-live="polite" anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleSnackbarClose} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </List>
);
};

 
export default { AcnoDepositCard, AcnoLoanCard, Card03, Card04 };