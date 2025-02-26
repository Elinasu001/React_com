/**
 * @fileoverview [조회] 
 *
 * @author 
 * @version 1.0.0
 */
import { Box, Typography } from "@mui/material";
import { AccountTransactions } from "@src/components/Display";
import { useState } from "react";

const accountData = {
  ACNO: "123-456-789012",
  ACNT_BLNC: 98750000,
};
const transactionData = [
  {
    ACNO: "123-456-789012",
    DEPR_NM: "홍길동",
    NEXT_TRAN_YN: "Y",
    DTA_NCNT: 1,
    OUT_REC: {
      TRN_DT: "2024-02-26",
      TRN_TKTM: "14:30",
      TRAN_AMT_SIGN: " ",
      TRN_AMT: 50000,
      TRNF_AF_BLNC_SIGN: "+",
      ACNT_BLNC: 98700000,
      OUTL: "스타벅스",
    },
    NEXT_DATA_XN: "N",
    API_RS_MSG: "정상 처리되었습니다.",
  }
]


const INQ002 = () => {
  const [showBalance] = useState(true);
  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
      {/* 페이지 메인 제목 */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>거래내역조회</Typography>

      {/* 계좌정보, 거래내역 */}
      <Box sx={{ textAlign: "start" }}>
        <AccountTransactions account={accountData} transactions={transactionData} />
      </Box>

    </Box>
   
  );
};

export default INQ002;