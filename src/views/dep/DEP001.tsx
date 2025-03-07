/**
 * @fileoverview [수신] 
 *
 * @author 
 * @version 1.0.0
 */


import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Card05 } from "@src/components/Card";
import { Tab01 } from "@src/components/Tab";
import { addFormData, doAction, GLog, makeForm } from "@src/assets/js/common";
import { progressBar } from "@src/components/Loading";
import { messageView } from "@src/components/Alert";
interface DepPdResList{
  PRDCT_CD : string;        //상품코드
  PRDCT_NM : string;        //상품명
  PRDCT_CLS_CD : string;    //상품분류코드
  SMR_DC_CNTN : string;     //요약설명내용
  HST_INRT : number;        //최고금리
  LWST_INRT : number;       //최저금리
  MAX_AMT : number;         //최고가입금액

}


/**
 * 탭 항목 정의
 */
const tabItems = [
  { label: "전체", value: "전체" },
  { label: "창구전용", value: "창구전용" },
  { label: "온라인전용", value: "온라인전용" },

];

const DEP001 = () => {
  const [selectedTab, setSelectedTab] = useState("전체");
  const [depPdList, setDepPdList] = useState<DepPdResList[]>([]);

  const fetchDepProducts = async () => {
      //폼생성,데이터 주입
      const form = makeForm("DEP0001SC");
      addFormData(form, "txGbnCd", "S01");
      addFormData(form, "PRDCT_DV_CD", "01"); // 상품구분코드
  
      //로딩 ON
      progressBar(true, "통신중");
  
      try {
        //통신
        const response = await doAction(form);
        //로딩 OFF
        progressBar(false);
  
        if (response.header.respCd !== "N00000") {
          GLog.e("수신상품 목록조회 실패:", response.header.respMsg);
          messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
          return;
        }
  
        //상품 리스트 가져오기
        const resData = response.data;
        console.log("resData@@@@"+ resData.prdList)
        const depPdResList: DepPdResList[] = resData.getList<DepPdResList>("prdList");
        const products = depPdResList.map(prod => ({
          PRDCT_CD: prod.PRDCT_CD,              // 상품코드
          PRDCT_NM: prod.PRDCT_NM,              // 상품명
          PRDCT_CLS_CD: prod.PRDCT_CLS_CD,      // 상품유형명
          SMR_DC_CNTN: prod.SMR_DC_CNTN,        // 요약설명내용
          HST_INRT: prod.HST_INRT,              // 최고금리
          LWST_INRT : prod.LWST_INRT,           // 최저금리
          MAX_AMT : prod.MAX_AMT                // 최대가입금액
        }));

        setDepPdList(products);
  
      } catch (error) {
          GLog.e("예적금상품 목록조회 중 오류 발생:", error);
          messageView("예적금상품 목록조회 중 오류가 발생했습니다.", "확인");
          progressBar(false);
      }
    };
  
    // 최초 조회
    useEffect(() => {
      fetchDepProducts();
    }, []);

  // 탭 변경 시 이벤트
  const handleTabChange = (value: string | number) => {
    setSelectedTab(value.toString());
  };

  // 탭 - 카테고리에 따라서 필터링
   const filteredProducts =
   selectedTab === "전체"
     ? depPdList
     : depPdList.filter((depPdList) => depPdList.PRDCT_CLS_CD === selectedTab);

  return (

    <Box>
      {/* 예적금 탭 컴포넌트 */}
      <Tab01 items={tabItems} initialValue="전체" onChange={handleTabChange} />

      {/* 예적금 상품 컴포넌트 */}

       <Box className="card-list-wrap">
      
      </Box>
    </Box>
  );
};

export default DEP001;