/**
 * @fileoverview [여신] 대출상품 목록
 *
 * @author
 * @version 1.0.0
 */

import { useState } from "react";
import { Box } from "@mui/material";
import { Card03 } from "@src/components/Card";
import { Tab01 } from "@src/components/Tab";

/**
 * 대출 상품 데이터
 */

// PDCD "상품코드"
const loanProducts = [
  {
    pdcd: "pd001",
    pdnm: "온라인햇살론",
    cmmProdCategoty: "정책자금대출",
    pdDesc: "저신용 저소득 서민에게 보증지원을 통해 생활의 안정을 돕고자 지원하는 보증부 대출상품입니다.",
    keyword: ["저신용", "저소득", "보증부대출", "최대금리우대1.3%P"],
    maxLimit: "2000",
    minIntrate: "8",
    maxIntrate: "10"
  },
  {
    pdcd: "pd002",
    pdnm: "예스론",
    cmmProdCategoty: "신용대출",
    pdDesc: "비상금 신용대출 상품으로 간편하게 신청 가능",
    keyword: ["비대면", "신용", "대출", "예스"],
    maxLimit: "300",
    minIntrate: "8",
    maxIntrate: "10"
  },
  {
    pdcd: "pd003",
    pdnm: "담보론",
    cmmProdCategoty: "담보대출",
    pdDesc: "자산 담보를 통한 저금리 대출상품입니다.",
    keyword: ["담보", "저금리"],
    maxLimit: "8000",
    minIntrate: "4",
    maxIntrate: "6"
  }
];

/**
 * 탭 항목 정의
 */
const tabItems = [
  { label: "전체", value: "전체" },
  { label: "신용대출", value: "신용대출" },
  { label: "담보대출", value: "담보대출" },
  { label: "정책자금대출", value: "정책자금대출" },
  { label: "외국인대출", value: "외국인대출" }
];

const LON001 = () => {
  const [selectedTab, setSelectedTab] = useState("전체");

  // 탭 변경 시 이벤트
  const handleTabChange = (value: string | number) => {
    setSelectedTab(value.toString());
  };

  // 탭 - 카테고리에 따라서 필터링
  const filteredProducts =
  selectedTab === "전체"
    ? loanProducts
    : loanProducts.filter((product) => product.cmmProdCategoty === selectedTab);

  return (

    <Box sx={{ width: "95%" }}>
      {/* 대출 탭 컴포넌트 */}
      <Tab01 items={tabItems} initialValue="전체" onChange={handleTabChange} />

      {/* 대출 상품 컴포넌트 */}
      <Box sx={{ minHeight: "100vh", mx: 2, width: "95%", mt:3 }}>
        {filteredProducts.map((product) => (
          <Card03
            key={product.pdcd}                          
            pdcd={product.pdcd}                       // 상품코드
            pdnm={product.pdnm}                       // 상품명
            cmmProdCategoty={product.cmmProdCategoty} // 카테고리
            pdDesc={product.pdDesc}                   // 상품설명
            keyword={product.keyword}                 // 키워드
            maxLimit={product.maxLimit}               // 최대한도
            minIntrate={product.minIntrate}           // 최저금리
            maxIntrate={product.maxIntrate}           // 최대금리
          />
        ))}
      </Box>
    </Box>
  );
};


export default LON001;