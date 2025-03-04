/**
 * @fileoverview [조회] 
 *
 * @author 
 * @version 1.0.0
 */

import { Box, Typography } from "@mui/material";
import { useEffect ,useState } from "react";

import { GLog, doAction,makeForm, addFormData } from '@assets/js/common';
import { messageView } from "@src/components/Alert";
import { progressBar } from "@src/components/Loading";
import { Button01 } from "@src/components/Button";
import { Card06 } from "@src/components/Card";
import DataSet from "@src/assets/io/DataSet";


const accountData = {
  ACNO: "123-456-789012",
  ACNT_BLNC: 98750000,
};

interface Card06Props {
  type: string;
  acno: string;
  balance: number;
}

interface TradeListProps {
  ACNO?: string;
  DEPR_NM?: string;
  NEXT_TRAN_YN?: string;
  DTA_NCNT?: number;
  OUT_REC: {
    TRN_DT: String;                 //거래일자
    TRN_TKTM : string;              //거래시각
    TRAN_AMT_SIGN: string;          //거래금액부호
    TRN_AMT: number;                //거래금액
    TRNF_AF_BLNC_SIGN: string;      //거래후잔액부호
    ACNT_BLNC: number;              //계좌잔액
    OUTL : string                   //거래자명
  }[];
  NEXT_DATA_XN?: string;
  API_RS_MSG?: string;
}

const INQ002 = () => {
  const [showBalance] = useState(true);
  const [accountData, setAccountData] = useState({
    ACNO: "123-456-789012",  // 초기값 설정
    ACNT_BLNC: 98750000,
  });
  const [tradeList, settradeList] = useState<TradeListProps[]>([
    {
      ACNO: "123-456-789012",
      DEPR_NM: "홍길동",
      NEXT_TRAN_YN: "Y",
      DTA_NCNT: 1,
      OUT_REC: [{
        TRN_DT: "2024-02-26",
        TRN_TKTM: "14:30",
        TRAN_AMT_SIGN: " ",
        TRN_AMT: 50000,
        TRNF_AF_BLNC_SIGN: "+",
        ACNT_BLNC: 98700000,
        OUTL: "스타벅스",
      },{
        TRN_DT: "2024-02-27",
        TRN_TKTM: "14:40",
        TRAN_AMT_SIGN: " ",
        TRN_AMT: 50000,
        TRNF_AF_BLNC_SIGN: "+",
        ACNT_BLNC: 98700000,
        OUTL: "구내식당",
      }],
      NEXT_DATA_XN: "N",
      API_RS_MSG: "정상 처리되었습니다.",
    }
  ]);
  const fetchTradeList = async () => { 


    //폼생성,데이터 주입
    const form = makeForm('INQ0002SC');
    addFormData(form,'txGbnCd','TL');

    //로딩 ON
    progressBar(true, "통신중");

    try {
      //통신
      const response = await doAction(form);
      //로딩 OFF
      progressBar(false);

      if (response.header.respCd !== "N00000") {
        GLog.e("거래내역 조회 실패:", response.header.respMsg);
        messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
        return;
      }

      // 거래내역 리스트 가져오기
      const resData = new DataSet(response.data);
      const tradeList = resData.getList<Record<string, unknown>>("LIST");

      const formattedData: TradeListProps[] = tradeList.map((item) => ({
        ACNO: (item.ACNO as string) || "", // 계좌번호 (예제 값)
        DEPR_NM: (item.DEPR_NM as string) || "", // 예금주명 (예제 값)
        NEXT_TRAN_YN: (item.NEXT_TRAN_YN as string) || "N", // 다음 거래 여부
        DTA_NCNT: (item.DTA_NCNT as number) || 0, // 데이터 개수
        OUT_REC:[
          {
            TRN_DT: String(item.TRN_DT) || "",
            TRN_TKTM: String(item.TRN_TKTM) || "",
            TRAN_AMT_SIGN: String(item.TRAN_AMT_SIGN) || "",
            TRN_AMT: Number(item.TRN_AMT),
            TRNF_AF_BLNC_SIGN: String(item.TRNF_AF_BLNC_SIGN) || "",
            ACNT_BLNC: Number(item.ACNT_BLNC),
            OUTL: String(item.OUTL) || ""
          }
          
        ],
        NEXT_DATA_XN: (item.NEXT_DATA_XN as string) || "", // 예제 값
        API_RS_MSG: (item.API_RS_MSG as string) || "" // 예제 값
        
      }));
      
      settradeList(formattedData);  

    } catch (error) {
        GLog.e("거래내역 조회 중 오류 발생:", error);
        messageView("거래내역 조회 중 오류가 발생했습니다.", "확인");
        progressBar(false);
    }
  };

  useEffect(() => {
    fetchTradeList();
  }, []);

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
      {/* 페이지 메인 제목 */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>거래내역조회</Typography>

      {/* 계좌정보 */}
      {tradeList.map((transaction, index) => (
        <Card06
        type="입출금"    // 계좌 타입 (예금, 대출 등)
        acno="123-456-789012" // 계좌 번호
        balance={1000000} // 계좌 잔액
        pdnm="보통예금(예스뱅킹)"
      />
      ))}
      
      
      {/* 거래내역 */}
      {tradeList.map((transaction, index) => (
        transaction.OUT_REC.map((outRec, outRecIndex) => (
          <Box
            key={`${index}-${outRecIndex}`}
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
            {/* 첫 번째 Box (거래 정보) */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" sx={{ color: "#888", marginBottom: "4px" }}>
                {outRec.TRN_DT} <span>{outRec.TRN_TKTM}</span>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {outRec.OUTL}
              </Typography>
            </Box>

            {/* 두 번째 Box (금액 정보) */}
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: outRec.TRAN_AMT_SIGN === " " ? "#1976D2" : "#000",
                }}
              >
                {outRec.TRAN_AMT_SIGN === " " ? "+" : "-"}
                {outRec.TRN_AMT.toLocaleString()} 원
              </Typography>

              <Typography variant="body2" sx={{ color: "#555" }}>
                잔액: {outRec.ACNT_BLNC.toLocaleString()} 원
              </Typography>
            </Box>
          </Box>
        ))
      ))}
      

      
    </Box>
   
  );
};

export default INQ002;

