/**
 * @fileoverview [여신] 대출상품 상세
 *
 * @author 
 * @version 1.0.0
 */
import { useState, useEffect } from "react";
import { GLog, getParameter, doAction,makeForm, addFormData } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { MainBox } from "@src/components/Box";
import { Typography, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Box03 } from "@src/components/Box";
import { Button04 } from "@src/components/Button";
import { openFullPopup } from "@src/components/Popup";
import COM001 from "@src/views/com/COM001";

/**
 * 대출상품 상세조회 응답
 */
interface LoanPdRes {
  PRDCT_CD: string;           // 상품코드
  PRDCT_NM: string;           // 상품명
  PRDCT_CLS_CD: string;       // 상품분류코드
  SMR_DC_CNTN: string;        // 요약설명내용
  SBSCRB_TRGET_CNTN: string;  // 가입대상내용
  SBSCRB_PRD: string;         // 가입기간
  PRDCT_CNTN: string;         // 상품내용
  STDR_DT: Date;              // 기준일자
  LWST_INRT: number;          // 최저금리
  HST_INRT: number;           // 최대금리
  MIN_AMT: number;            // 최소금액
  MAX_AMT: number;            // 최대한도
  ATCH_FLE_NM: string;        // 첨부파일명
}

const LON001_2 = () => {

  const [productDetails, setProductDetails] = useState<LoanPdRes[]>([]);  // 대출상품 상세조회
  const param = getParameter(useLocation()); // LON001_1(대출상품 목록조회)에서 넘겨받은 param
  const prdctCd = param.getString("pdcd");

  /**
  * 대출상품 상세조회
  */
  const fetchLoanPrdDtail = async () => {
    //폼생성,데이터 주입
    const form = makeForm("LON0000SC");
    addFormData(form, "txGbnCd", "S02");
    addFormData(form, "PRDCT_CD", prdctCd);

    //로딩 ON
    progressBar(true, "통신중");

    try {
      //통신
      const response = await doAction(form);
      //로딩 OFF
      progressBar(false);

      if (response.header.respCd !== "N00000") {
        GLog.e("대출상품 목록조회 실패:", response.header.respMsg);
        messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
        return;
      }

      // 대출상품 상세조회
      const prdDetails = response.data.getObj<LoanPdRes>("prdDetails"); 
      if (prdDetails) {
        setProductDetails([prdDetails]);
      }

    } catch (error) {
        GLog.e("대출상품 목록조회 중 오류 발생:", error);
        messageView("대출상품 목록조회 중 오류가 발생했습니다.", "확인");
        progressBar(false);
    }
  };
  
  // 최초 조회
  useEffect(() => {
    fetchLoanPrdDtail();
  }, []);

  // 금액 형식 지정
  const formatAmount = (amount: number) => {
    const amountInWan = amount / 10000;
    return new Intl.NumberFormat().format(amountInWan);
  };

  // 상품분류코드 한글로 변환   
  const convert = (categoryCode: string | undefined) => {
    switch (categoryCode) {
    case "11":
      return "신용대출";
    case "12":
      return "담보대출";
    case "13":
      return "정책자금대출";
    case "14":
      return "외국인대출";
    default:
      return "기타";
    }
  };

  return (
    <MainBox>
      {productDetails.length > 0 ? (
        <>
          {/* 상단 대출상품 설명 */}
          <Box03
            key={productDetails[0].PRDCT_CD}                      // 상품코드                          
            title={productDetails[0].PRDCT_NM}                    // 상품명
            categoty={convert(productDetails[0].PRDCT_CLS_CD)}    // 상품분류코드
            //keyword={productDetails[0].keyword}                 // 추천어
            subtitle1={"한도"}
            subtitle2={"대출금리"}
            contents1={`최대 ${formatAmount(productDetails[0].MAX_AMT)}만원`}                   // 최대한도
            contents2={`연 ${productDetails[0].LWST_INRT}%~${productDetails[0].HST_INRT}%대`}   // 금리
          />

          {/* 하단 대출상품 설명 */}
          <>
            <Typography variant="body1">대출대상</Typography>
            <Typography variant="body2">{productDetails[0].SBSCRB_TRGET_CNTN}</Typography>
            <Divider></Divider>

            <Typography variant="body1">대출기간</Typography>
            <Typography variant="body2">{productDetails[0].SBSCRB_PRD}</Typography>
            <Divider></Divider>

            <Typography variant="body1">대출상품내용</Typography>
            <Typography variant="body2">{productDetails[0].PRDCT_CNTN}</Typography>
            <Divider></Divider>

            <Typography variant="body1">대출한도</Typography>
            <Typography variant="body2">{`최대 ${formatAmount(productDetails[0].MAX_AMT)}만원`}</Typography>
            <Divider></Divider>

            <Typography variant="body1">대출금리</Typography>
            <Typography variant="body2">{`연 ${productDetails[0].LWST_INRT}%~${productDetails[0].HST_INRT}%대`}</Typography>
            <Divider></Divider>
          </>
        </>
      ) : (
        <Typography>대출상품에 상세 데이터가 없습니다.</Typography>
      )}

    </MainBox>
  );
};
export default LON001_2;