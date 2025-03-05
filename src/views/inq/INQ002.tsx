/**
 * @fileoverview [조회] 
 *
 * @author 
 * @version 1.0.0
 */

import { Box, Typography } from "@mui/material";
import { useEffect ,useState } from "react";

import { GLog, doAction,makeForm, addFormData, getParameter } from '@assets/js/common';
import { messageView } from "@src/components/Alert";
import { progressBar } from "@src/components/Loading";
import { Button01 } from "@src/components/Button";
import { Card06 } from "@src/components/Card";
import DataSet from "@src/assets/io/DataSet";
import POP003 from "@src/views/pop/POP003";
import { openBottomPopup } from "@src/components/Popup";
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [showBalance] = useState(true);
  const [tradeList, settradeList] = useState<TradeListProps[]>([]);
  const fetchTradeList = async (acno:string): Promise<TradeListProps[]> =>{ 


    //폼생성,데이터 주입
    const form = makeForm('INQ0002SC');
    addFormData(form,'txGbnCd','TL');
    addFormData(form, 'acno', acno); // 계좌번호를 폼에 추가
   

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
        return[];
      }

      // 거래내역 리스트 가져오기
      const resData = new DataSet(response.data);
      const tradeList = resData.getList("OUT_REC");
      console.log("resData +++ " + resData.getString("ACNO"));
      const formattedData: TradeListProps[] = tradeList.map((item) => ({
        ACNO: resData.getString("ACNO") || "",  
        DEPR_NM: resData.getString("DEPR_NM") || "", 
        NEXT_TRAN_YN: resData.getString("NEXT_TRAN_YN") || "N",  
        DTA_NCNT: Number(resData.getString("DTA_NCNT")) || 0,  
        OUT_REC: [{
          TRN_DT: item.TRN_DT || "",  // 거래일자
          TRN_TKTM: item.TRN_TKTM || "",  // 거래시각
          TRAN_AMT_SIGN: item.TRAN_AMT_SIGN || "",  // 거래금액 부호
          TRN_AMT: Number(item.TRN_AMT),  // 거래금액
          TRNF_AF_BLNC_SIGN: item.TRNF_AF_BLNC_SIGN || "",  // 거래후잔액 부호
          ACNT_BLNC: Number(item.ACNT_BLNC),  // 계좌잔액
          OUTL: item.OUTL || ""  // 거래자명
        }],
        NEXT_DATA_XN: resData.getString("NEXT_DATA_XN") || "",  
        API_RS_MSG: resData.getString("API_RS_MSG") || ""  
      }));
     
      return formattedData;  // 반환값 추가

    } catch (error) {
        GLog.e("거래내역 조회 중 오류 발생:", error);
        messageView("거래내역 조회 중 오류가 발생했습니다.", "확인");
        progressBar(false);
        return [];  // 오류 발생 시 빈 배열 반환
    }
  };

  useEffect(() => {
    const param = getParameter(location);

    const account = param.getString('acno');
    if (account) {
      const fetchData = async () => {
        const data = await fetchTradeList(account);
        settradeList(data);
      };
      fetchData();
    }
  }, [location]);

  
  useEffect(() => {
    console.log(tradeList); // tradeList가 제대로 업데이트되는지 확인
  }, [tradeList]);
  

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
      {/* 페이지 메인 제목 */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>거래내역조회</Typography>

      {/* 계좌정보 */}
      {tradeList.map((transaction, index) => (
        <Card06
        key={transaction.ACNO}
        type="입출금"
        acno={transaction.ACNO || "123-456-789012"}
        balance={transaction.OUT_REC[0]?.ACNT_BLNC || 0}
        pdnm="보통예금(예스뱅킹)"
      />
      ))}
      
      {/* 조회기간 설정 */}
      <Button01 
        btnName="조회기간TEST"
        clickFunc={() => {
          openBottomPopup({
            component:POP003
            ,title:'조회기간 설정',nFunc:(data?)=>{
            if(data){
              GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
            }else{
              GLog.d('팝업 취소 닫힘');
            }
          }});
        }}
      />
      {/* <Button01 
        btnName="계좌가져오기 TEST"
        clickFunc={() => {
          useEffect(() => {
            if (account?.acno) {
              // fetchTradeList 호출
              const fetchData = async () => {
                const data = await fetchTradeList(account.acno); // 계좌번호를 fetchTradeList에 전달
                settradeList(data);
              };
              fetchData();
            }
          }, [account]);
        }}
      /> */}

      
      {/* 거래내역 */}
      {tradeList.map((transaction, index) => (
        transaction.OUT_REC.map((outRec, outRecIndex) => (
          <Box
            key={`${transaction.ACNO}-${outRecIndex}`}
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

