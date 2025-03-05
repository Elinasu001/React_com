/**
 * @fileoverview [여신] 대출상품 상세
 *
 * @author 
 * @version 1.0.0
 */
import { useState, useEffect } from "react";
import { GLog, getParameter } from '@assets/js/common';
import DataSet from '@assets/io/DataSet';
import { MainBox } from "@src/components/Box";
import { Typography, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Box03 } from "@src/components/Box";

const LON001_2 = () => {

  const location = useLocation();
  const [productDetails, setProductDetails] = useState<DataSet | null>(null);

  useEffect(() => {
    const param = getParameter(location);               // location에서 전달 받은 파라미터
    const prdDetails = param.getObj("prdDetails");      // prdDetails 데이터셋 추출
    
    if (prdDetails) {
      const dataSetDetails = new DataSet(prdDetails); // DataSet으로 변환
      setProductDetails(dataSetDetails);
    }
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
    {productDetails ? (
      <>
        {/* 상단 대출상품 설명 */}
        <Box03
          key={productDetails.getString("PRDCT_CD")}                      // 상품코드                          
          title={productDetails.getString("PRDCT_NM")}                    // 상품명
          categoty={convert(productDetails.getString("PRDCT_CLS_CD"))}    // 상품분류코드
          //keyword={productDetails.getNumber("")}                        // 키워드
          subtitle1={"한도"}
          subtitle2={"대출금리"}
          contents1={`최대 ${formatAmount(productDetails.getNumber("MAX_AMT"))}만원`}                             // 최대한도
          contents2={`연 ${productDetails.getNumber("LWST_INRT")}%~${productDetails.getNumber("HST_INRT")}%대`}   // 금리
        />

        {/* 하단 대출상품 설명 */}
        <>
          <Typography variant="body1">대출대상</Typography>
          <Typography variant="body2">{productDetails.getString("SBSCRB_TRGET_CNTN")}</Typography>
          <Divider></Divider>

          <Typography variant="body1">가입기간</Typography>
          <Typography variant="body2">{productDetails.getString("SBSCRB_PRD")}</Typography>
          <Divider></Divider>

          <Typography variant="body1">대출상품내용</Typography>
          <Typography variant="body2">{productDetails.getString("PRDCT_CNTN")}</Typography>
          <Divider></Divider>

          <Typography variant="body1">대출한도</Typography>
          <Typography variant="body2">{`최대 ${formatAmount(productDetails.getNumber("MAX_AMT"))}만원`}</Typography>
          <Divider></Divider>

          <Typography variant="body1">대출금리</Typography>
          <Typography variant="body2">{`연 ${productDetails.getNumber("LWST_INRT")}%~${productDetails.getNumber("HST_INRT")}%대`}</Typography>
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