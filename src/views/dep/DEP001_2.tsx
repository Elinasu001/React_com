/**
 * @fileoverview [수신] 예적금 상품설명 페이지
 *
 * @author 
 * @version 1.0.0
 */
import { addFormData, doAction, getParameter, GLog, makeForm } from "@src/assets/js/common";
import { messageView } from "@src/components/Alert";
import { MainBox } from "@src/components/Box";
import { progressBar } from "@src/components/Loading";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface DepRes {
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

const DEP002 = () => {

  const [productDetails, setProductDetails] = useState<DepRes[]>([]);    // 예적금상품 상세조회
  const param = getParameter(useLocation());

  const fetchDepDtail = async () => {
      //폼생성,데이터 주입
      const form = makeForm("DEP0001SC");
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
          GLog.e("예적금상품 상세조회 실패:", response.header.respMsg);
          messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
          return;
        }
  
        // 예적금상품 상세조회
        const prdDetails = response.data.getObj<DepRes>("prdDetails"); 
        if (prdDetails) {
          setProductDetails([prdDetails]);
        }
  
      } catch (error) {
          GLog.e("예적금상품 상세조회 중 오류 발생:", error);
          messageView("예적금상품 상세조회 중 오류가 발생했습니다.", "확인");
          progressBar(false);
      }
    };
    
    // 최초 조회
    useEffect(() => {
      fetchDepDtail();
    }, []);

  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    <MainBox>
      <h1>예적금상세보기</h1>
      <p>개발중</p>
    </MainBox>
  );
};

export default DEP002;