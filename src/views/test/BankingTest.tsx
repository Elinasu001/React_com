import React, { Suspense } from 'react';

import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import { GLog } from '@assets/js/common';

import { TextBox01 } from "@src/components/Text";
import { Common } from '@assets/js/common';
import { Button01 } from "@src/components/Button";
import { openFullPopup, openBottomPopup } from "@src/components/Popup";

/**
 * 메뉴별 버튼 목록 정의
 */
const menuItems: Record<string, { text: string; path: string }[]> = {
  com: [
    { text: "휴대폰본인인증", path: "@src/views/tnf/COM001" },
    { text: "약관화면", path: "@src/views/tnf/COM002" },
    { text: "타행본인계좌인증(이기종)", path: "@src/views/tnf/COM003" },
    { text: "타행본인계좌인증(중앙회)", path: "@src/views/tnf/COM004" },
    { text: "계좌리스트", path: "@src/views/tnf/COM005" },
    { text: "은행리스트", path: "@src/views/tnf/COM006" },
    { text: "주소검색", path: "@src/views/tnf/COM007" },
    { text: "OCR인증", path: "@src/views/tnf/COM008" },
    { text: "직종선택", path: "@src/views/tnf/COM009" },
    { text: "CDD/EDD", path: "@src/views/tnf/COM010" },
    { text: "보안카드", path: "@src/views/tnf/COM011" },
    { text: "OTP인증", path: "@src/views/tnf/COM012" },
  ],
  inq: [
    { text: "전계좌조회", path: "/inq/INQ001.view" },
    { text: "거래내역조회", path: "/inq/INQ002.view" }
  ],
  tnf: [
    { text: "이체", path: "/tnf/TNF001.view" },
    { text: "이체결과조회", path: "/tnf/TNF002.view" },
    { text: "자동이체", path: "/tnf/TNF003.view" },
    { text: "자동이체관리", path: "/tnf/TNF004.view" },
    { text: "자동이체결과조회", path: "/tnf/TNF005.view" }
  ],
  dep: [
    { text: "상품안내/신청", path: "/dep/DEP001.view" },
    { text: "입출금계좌신청", path: "/dep/DEP002.view" },
    { text: "예적금해지", path: "/dep/DEP003.view" },
    { text: "예적금해지예상조회", path: "/dep/DEP004.view" },
    { text: "만기자동재예치/만기해지송금", path: "/dep/DEP005.view" },
    { text: "적금납입일변경", path: "/dep/DEP006.view" },
  ],
  lon: [
    { text: "상품안내/신청", path: "/lon/LON001.view" },
    { text: "간편한도조회", path: "/lon/LON002.view" },
    { text: "전자약정", path: "/lon/LON003.view" },
    { text: "신용조회동의", path: "/lon/LON004.view" },
    { text: "온라인서류제출", path: "/lon/LON005.view" },
    { text: "대출상환신청", path: "/lon/LON006.view" },
    { text: "대출연장신청", path: "/lon/LON007.view" },
    { text: "대출철회신청", path: "/lon/LON008.view" },
    { text: "대출진행상태조회", path: "/lon/LON009.view" }
  ],
  efc: [
    { text: "고객정보변경", path: "/efc/EFC001.view" },
    { text: "계좌비밀번호변경", path: "/efc/EFC002.view" },
    { text: "계좌비밀번호오류해제", path: "/efc/EFC003.view" },
    { text: "자주쓰는계좌관리", path: "/efc/EFC004.view" },
    { text: "지연이체관리", path: "/efc/EFC005.view" },
    { text: "출금지정계좌관리", path: "/efc/EFC006.view" },
    { text: "입금지정계좌관리", path: "/efc/EFC007.view" },
    { text: "이체한도관리", path: "/efc/EFC008.view" },
    { text: "한도제한해제", path: "/efc/EFC009.view" },
    { text: "해지계좌조회", path: "/efc/EFC010.view" },
    { text: "거래중지좌", path: "/efc/EFC011.view" },
    { text: "비과세종합저축한도", path: "/efc/EFC012.view" },
    { text: "비과세종합저축증빙자료제출", path: "/efc/EFC013.view" },
    { text: "전자금융가입", path: "/efc/EFC014.view" }
  ]
};

/**
 * 일반 테스트 화면 드로잉
 */
const BankingTest = () => {
  const { doActionURL } = Common();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const txGbnCd = queryParams.get("txGbnCd") || "com"; // 기본값: "com"

  console.log("전체 URL:", window.location);

  const modules = import.meta.glob('../views/**/*.tsx');

  // txGbnCd에 해당하는 버튼 목록 가져오기
  const buttons = menuItems[txGbnCd] || [];

  return (
    <Box sx={{
          display: 'flex',
          flexWrap: 'wrap', // 자동 줄바꿈
          justifyContent: 'space-between', // 좌우 정렬
          gap: 1, // 버튼 간의 간격
        }}>

      <TextBox01 text="업무 테스트"/>

      {/* 버튼 컨테이너 */}
      

      {buttons.map((item, index) => {
        // "휴대폰본인인증" 버튼이면 handleOpenAuth, 아니면 기본 doActionURL 사용
        return (
          <Button01
            key={index}
            btnName={item.text}
            fontSize="15px"

            width="100%"

            clickFunc={() => {
              // "com" 그룹의 경우 팝업 호출
              if (txGbnCd === 'com') {

                
                // // 특정 바텀 팝업업
                // if(item.path.split('/')[2] === 'COM005.view' || item.path.split('/')[2] === 'COM006.view'){
                //    openBottomPopup({component:POP001,title:'풀 테스트',nFunc:(data?)=>{
                //     if(data){
                //       GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                //     }else{
                //       GLog.d('팝업 취소 닫힘');
                //     }
                //   }});
                // }else {
                //   openFullPopup({component:POP001,title:'풀 테스트',nFunc:(data?)=>{
                //     if(data){
                //       GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                //     }else{
                //       GLog.d('팝업 취소 닫힘');
                //     }
                //   }});
                // }
              } else {
                // 그 외는 일반 페이지 이동
                doActionURL(item.path);
              }
            }}

          />
        );
      })}
    </Box>

  );
};

export default BankingTest;
