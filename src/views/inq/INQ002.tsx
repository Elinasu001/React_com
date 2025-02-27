/**
 * @fileoverview [조회] 
 *
 * @author 
 * @version 1.0.0
 */

import { Box, Typography } from "@mui/material";
import { AccountTransactions } from "@src/components/Display";
import { useEffect ,useState } from "react";
import { GLog, doAction, makeForm, addFormData } from "@src/assets/js/common";
import { messageView } from "@src/components/Alert";
import { progressBar } from "@src/components/Loading";

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
  const [accountData, setAccountData] = useState({
    ACNO: "123-456-789012",  // 초기값 설정
    ACNT_BLNC: 98750000,
  });
  const [transactionData, setTransactionData] = useState([
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
  ]);

  useEffect(() => {
    const fetchData = async () => {
      //Form 생성 및 데이터 셋팅
      const form = makeForm("INQ002SC");
      addFormData(form, "acno", "123-456-789012"); // 계좌번호 추가

      //로딩 시작
      progressBar(true, "");

      //API 호출
      const resDs = await doAction(form);

      //로딩 끝
      progressBar(false);

      //응답값 확인
      if (resDs.header.respCd !== "N00000") {
        messageView(`통신 실패 : ${resDs.header.respMsg}`, "확인", () =>
          console.log("확인 클릭")
        );
        return; 
      }

      //응답값 세팅 TODO INQ002SC 완성하면 데이터 셋팅 해줘야함함
      setAccountData(accountData);
      setTransactionData(transactionData);
      GLog.d(`${JSON.stringify(resDs)}`)

      
    };

    fetchData();
  }, []);
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

