/**
 * @fileoverview [여신] 대출상품 목록
 *
 * @author
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { GLog, doAction,makeForm, addFormData, doActionURL, doActionView } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { Card03 } from "@src/components/Card";
import { Tab01 } from "@src/components/Tab";
import { Box02 } from "@src/components/Box";

/**
 * 대출상품 응답
 */
interface LoanPdRes {
  PRDCT_CD: string;       // 상품코드
  PRDCT_NM: string;       // 상품명
  PRDCT_CLS_CD: string;   // 상품분류코드
  SMR_DC_CNTN: string;    // 요약설명내용
  MAX_AMT: number;        // 최대한도
  LWST_INRT: number;      // 최소금리
  HST_INRT: number;       // 최대금리
}

/**
 * 추천 상품 인터페이스
 */
interface LoanPd {
  pdcd: string;             // 상품코드
  pdnm: string;             // 상품명
  categoty: string;         // 카테고리
  pdDesc: string;           // 상품설명
  keyword: string[];        // 키워드
  contents1: string;        // 내용1
  contents2: string;        // 내용2
  onClick?: () => void;
}

/**
 * 탭 항목 정의
 */
const tabItems = [
  { label: "전체", value: "10" },
  { label: "신용대출", value: "신용대출" },
  { label: "담보대출", value: "담보대출" },
  { label: "정책자금대출", value: "정책자금대출" },
  { label: "외국인대출", value: "외국인대출" }
];

const LON001_1 = () => {
  const [selectedTab, setSelectedTab] = useState("10");
  const [loanPdList, setLoanPdList] = useState<LoanPd[]>([]);

  /**
  * 대출상품 목록조회
  */
  const fetchLoanProducts = async () => {
    //폼생성,데이터 주입
    const form = makeForm("LON0000SC");
    addFormData(form, "txGbnCd", "S01");
    addFormData(form, "PRDCT_DV_CD", "02"); // 상품구분코드(02:대출상품)

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

      // 대출상품 리스트 가져오기
      const resData = response.data;
      const loanPdResList: LoanPdRes[] = resData.getList<LoanPdRes>("prdList");
      const products = loanPdResList.map(prod => ({
        pdcd: prod.PRDCT_CD,            // 상품코드
        pdnm: prod.PRDCT_NM,            // 상품명
        categoty: convert(prod.PRDCT_CLS_CD),                     // 상품분류코드
        pdDesc: prod.SMR_DC_CNTN,       // 요약설명내용
        keyword: ["추천", "금융상품"],   // 추천어
        contents1: `최대한도 ${formatAmount(prod.MAX_AMT)}만원`,   // 최대한도
        contents2: `연 ${prod.LWST_INRT}~${prod.HST_INRT}%`       // 금리
      }));
  
      setLoanPdList(products);

    } catch (error) {
        GLog.e("대출상품 목록조회 중 오류 발생:", error);
        messageView("대출상품 목록조회 중 오류가 발생했습니다.", "확인");
        progressBar(false);
    }
  };

  // 최초 조회
  useEffect(() => {
    fetchLoanProducts();
  }, []);

  // 탭 변경 시 이벤트
  const handleTabChange = (value: string | number) => {
    setSelectedTab(value.toString());
  };

  // 탭 - 카테고리에 따라서 필터링
  const filteredProducts =
  selectedTab === "10"
    ? loanPdList
    : loanPdList.filter((product) => product.categoty === selectedTab);

  /**
  * 대출상품 상세조회
  */
  const handleProductClick = async (pdcd: string) => {
    //폼생성,데이터 주입
    const form = makeForm("LON0000SC");
    addFormData(form, "txGbnCd", "S02");
    addFormData(form, "PRDCT_CD", pdcd);

    progressBar(true, "통신중");
    try {
      const response = await doAction(form);
      progressBar(false);

      if (response.header.respCd !== "N00000") {
        GLog.e("대출상품 상세조회 실패:", response.header.respMsg);
        messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
        return;
      }

      // 대출상품 상세 DataSet을 가지고 상세 페이지로 이동
      doActionView("/lon/LON001_2.view", response.data, false);
    
    } catch (error) {
      GLog.e("대출상품 상세조회 중 오류:", error);
      messageView("대출상품 상세조회 중 오류가 발생했습니다.", "확인");
      progressBar(false);
    }
  };

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
    <>
      {/* 대출 탭 컴포넌트 */}
      <Tab01 items={tabItems} initialValue="10" onChange={handleTabChange} />

      {/* 대출 한도 조회 컴포넌트 */}
      <Box02
        title="내 대출한도가 궁금하세요?"
        description="신용평점에 영향 없이 대출한도를 알아보세요."
        buttonText="간편대출한도조회"
        onButtonClick={() => doActionURL("/")}
      />

      {/* 대출 상품 컴포넌트 */}
      {filteredProducts.map((product) => (
        <Card03 
          key={product.pdcd}     
          {...product}                     
          onClick={() => handleProductClick(product.pdcd)}
        />
      ))}
    </>
  );
};

export default LON001_1;