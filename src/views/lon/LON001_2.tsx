/**
 * @fileoverview [여신] 대출상품 상세
 *
 * @author 
 * @version 1.0.0
 */
import { useState, useEffect } from "react";
import { GLog, getParameter, doAction,makeForm, addFormData, doActionURL } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { MainBox, Box01 } from "@src/components/Box";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { decode } from "html-entities";
import { Box03 } from "@src/components/Box";
import { ButtonFooter } from "@src/components/Button";
import { TextList } from "@src/components/TextList";
import { openFullPopup } from "@src/components/Popup";
import LON001_3 from "../../views/lon/LON001_3";

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
  PRDCT_CNTN: string;         // 상품내용 (HTML 가능)
  STDR_DT: Date;              // 기준일자
  LWST_INRT: number;          // 최저금리
  HST_INRT: number;           // 최대금리
  MIN_AMT: number;            // 최소금액
  MAX_AMT: number;            // 최대한도
  ATCH_FLE_NM: string;        // 첨부파일명
}

const LON001_2 = () => {

  const [productDetails, setProductDetails] = useState<LoanPdRes[]>([]);    // 대출상품 상세조회
  const param = getParameter(useLocation());    // LON001_1(대출상품 목록조회)에서 넘겨받은 param

  /**
  * 대출상품 상세조회
  */
  const fetchLoanPrdDtail = async () => {
    //폼생성,데이터 주입
    const form = makeForm("LON0000SC");
    addFormData(form, "txGbnCd", "S02");
    addFormData(form, "PRDCT_CD", param.getString("pdcd"));

    //로딩 ON
    progressBar(true, "통신중");

    try {
      //통신
      const response = await doAction(form);
      //로딩 OFF
      progressBar(false);

      if (response.header.respCd !== "N00000") {
        GLog.e("대출상품 상세조회 실패:", response.header.respMsg);
        messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
        return;
      }

      // 대출상품 상세조회
      const prdDetails = response.data.getObj<LoanPdRes>("prdDetails"); 
      if (prdDetails) {
        setProductDetails([prdDetails]);
      }

    } catch (error) {
        GLog.e("대출상품 상세조회 중 오류 발생:", error);
        messageView("대출상품 상세조회 중 오류가 발생했습니다.", "확인");
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

  // 상품분류코드를 한글로 변환   
  const convert = (categoryCode: string | undefined) => {
    switch (categoryCode) {
      case "11":
        return "신용대출";
      case "12":
        return "정책자금대출";
      case "13":
        return "대환대출";
      case "14":
        return "담보대출";
      case "15":
        return "기타";
      case "16":
        return "외국인대출";
      case "20":
        return "직원대출";
      default:
        return "기타";
    }
  };

  // 전화상담 버튼
  const telcounseling = async () => { 
    // TODO 전화상담 버튼 클릭 시 이벤트
    messageView("전화상담 버튼 클릭", "확인");
  }

  // 대출신청 버튼
  const loanApply = async () => {
    // TODO 다른 페이지에서 사용할 예정
    // 대출관련 보이스피싱 안내 Popup
    openFullPopup({
      component: LON001_3,
      title: "대출관련 보이스피싱 안내",
      nFunc: (data) => {
        if (data) {
          doActionURL("/lon/LON002_1.view");  // 간편한도조회 페이지로 이동
        }
      },
    });
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
          <Box01>
            <TextList 
              title="대출대상"
              items={[productDetails[0].SBSCRB_TRGET_CNTN]}
            />
            <TextList 
              title="대출한도"
              items={[`최대 ${formatAmount(productDetails[0].MAX_AMT)}만원`]}
            />
            <TextList 
              title="대출금리"
              items={[
                `연 ${productDetails[0].LWST_INRT}%~${productDetails[0].HST_INRT}%대`,
                "연체이율 : 약정이율 + 연3% (단, 법정최고금리 이내 : 20%)",
                "대출금리 : 기준금리 + 가산금리",
                "기준금리 : 조달원가 + 업무원가 + 신용원가 등",
                "가산금리 : **저축은행 신용평가평점 기준에 따라 차등 적용"
              ]}
            />
            <TextList 
              title="대출기간"
              items={[productDetails[0].SBSCRB_PRD]}
            />
            <TextList 
              title="상환방법"
              items={["원금균등분할상환"]}
            />
            <TextList 
              title="상품내용"
              items={[decode(productDetails[0].PRDCT_CNTN || "").replace(/<\/?[^>]+(>|$)/g, "")]}
            />
          </Box01>
          <ButtonFooter
            buttons={[
              { name: "전화상담", className: "btn-outlined", onClick: telcounseling },
              { name: "대출신청", className: "btn-primary", onClick: loanApply },
            ]}
          />
        </>
      ) : (
        <Typography>대출상품에 상세 데이터가 없습니다.</Typography>
      )}

    </MainBox>
  );
};
export default LON001_2;