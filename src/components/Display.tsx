/**
 * @fileoverview Display UI
 *
 * 사용 예시:
 * import { LimitDisplay } from "@src/components/Display";
 */
import { Box, Typography, TextField } from "@mui/material";
import { Button01 } from "./button";

interface LimitDisplayProps {
  label: string;
  value: number;
}
//거래내역정보 데이터
interface TransactionDisplayProps {
  ACNO : string;
  DEPR_NM : string;
  NEXT_TRAN_YN : string;
  DTA_NCNT : number;
  OUT_REC: {
    TRN_DT: string;                 //거래일자
    TRN_TKTM : string;              //거래시각
    TRAN_AMT_SIGN: string;          //거래금액부호
    TRN_AMT: number;                //거래금액
    TRNF_AF_BLNC_SIGN: string;      //거래후잔액부호
    ACNT_BLNC: number;              //계좌잔액
    OUTL : string                   //거래자명
  };
  NEXT_DATA_XN: string;
  API_RS_MSG : string
}

// 계좌 정보 데이터 
interface AccountProps {
  ACNO : string,
  ACNT_BLNC: number,
};

interface AccountTransactionsProps {
  account: AccountProps;
  transactions: TransactionDisplayProps[];
}

// ✅이체 한도 표시 컴포넌트
export const LimitDisplay = ({ 
    label
  , value }: LimitDisplayProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid lightgray", pb:"20px", width: "100%" }}>
      <Typography>{label}</Typography>
      <TextField
        variant="standard"
        type="number"
        value={value}
        sx={{ flexGrow: 1, width: "150px", textAlign: "right" }}
        inputProps={{ style: { textAlign: "right", fontWeight: "bold" } }}
        InputProps={{ disableUnderline: true, readOnly: true }}
      />
    </Box>
  );
};

// ✅ 계좌 정보 + 거래 내역 통합 컴포넌트
export const AccountTransactions = ({ account, transactions }: AccountTransactionsProps) => {
  return (
    <Box sx={{ padding: "16px", maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      
      {/* ✅ 계좌 정보 표시 */}
      <Box
        sx={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px"
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "12px", color: "#666", marginBottom: "12px", textAlign: "left" }}>
          입출금  보통예금(예스뱅킹)
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "12px", color: "#666", marginBottom: "12px", textAlign: "left" }}>
          계좌번호 : {account.ACNO}
        </Typography>

        <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: "bold", color: "#222", textAlign: "left" }}>
          잔액 : {account.ACNT_BLNC.toLocaleString()} 원
        </Typography>

        <Typography variant="h6" sx={{ fontSize: "10px", fontWeight: "bold", color: "#222", textAlign: "left" }}>
          출금가능금액 : {account.ACNT_BLNC.toLocaleString()} 원
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
          <Button01
            btnName="이체"
            width="100%"
            fontSize="16px"
            clickFunc={async () => {
              // 이체 로직
            }}
          />
        </Box>
        <Typography variant="h6" sx={{ fontSize: "12px", fontWeight: "bold", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            2024.11.26 ~ 2025.02.26 {/* TODO 거래날짜 셋팅 */}
            <span>잔액보기</span>
          </Typography>
        

        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <TransactionDisplay key={index} transaction={transaction} />
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "#666" }}>
            거래 내역이 없습니다.
          </Typography>
        )}
      </Box>

      
    </Box>
  );
};

// ✅ 거래 내역 개별 표시 컴포넌트
export const TransactionDisplay = ({ transaction }: { transaction: TransactionDisplayProps }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid lightgray",
        pb: "12px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" sx={{ color: "#888", marginBottom: "4px" }}>
          {transaction.OUT_REC.TRN_DT} <span>{transaction.OUT_REC.TRN_TKTM}</span>
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {transaction.OUT_REC.OUTL}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: transaction.OUT_REC.TRAN_AMT_SIGN === " " ? "#1976D2" : "#000",
          }}
        >
          {transaction.OUT_REC.TRAN_AMT_SIGN === " " ? "+" : "-"}
          {transaction.OUT_REC.TRN_AMT.toLocaleString()} 원
        </Typography>

        <Typography variant="body2" sx={{ color: "#555" }}>
          잔액: {transaction.OUT_REC.ACNT_BLNC.toLocaleString()} 원
        </Typography>
      </Box>
    </Box>
  );
};