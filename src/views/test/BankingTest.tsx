import { Button, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { GButtonTest } from '@src/components/button';
import { TextBox01 } from "@src/components/text";
import { GLog, Common } from '@assets/js/common';

/**
 * 테스트 버튼
 */
const TestButton = ({ btnName, clickFunc }: {
  btnName: string;
  clickFunc: () => void;
}) => {
  return (
    <Button 
      variant="contained" 
      onClick={clickFunc}
      sx={{
        width: "40%",
        fontFamily: "SCDream",
        fontWeight: 800,
        mb: 3,
        px: 2, 
        py: 0.75, 
        fontSize: '14px',
        borderRadius: '8px',
        boxShadow: 3,
        backgroundColor: 'primary.main',
        ':hover': {
          backgroundColor: 'primary.dark'
        }
      }}
    >
      {btnName}
    </Button>
  );
};

/**
 * 메뉴별 버튼 목록 정의
 */
const menuItems: Record<string, { text: string; path: string }[]> = {
  com: [
    { text: "휴대폰본인인증", path: "/COM001.view" },
    { text: "약관화면", path: "/COM002.view" },
    { text: "타행본인계좌인증(이기종)", path: "/COM003.view" },
    { text: "타행본인계좌인증(중앙회)", path: "/COM004.view" },
    { text: "계좌리스트", path: "/COM005.view" },
    { text: "은행리스트", path: "/COM006.view" },
    { text: "주소검색", path: "/COM007.view" },
    { text: "OCR인증", path: "/COM008.view" },
    { text: "직종선택", path: "/COM009.view" },
    { text: "CDD/EDD", path: "/COM010.view" },
    { text: "보안카드", path: "/COM011.view" },
    { text: "OTP인증", path: "/COM012.view" }
  ],
  inq: [
    { text: "전계좌조회", path: "/INQ001.view" },
    { text: "거래내역조회", path: "/INQ002.view" }
  ],
  tnf: [
    { text: "이체", path: "/TNF001.view" },
    { text: "이체결과조회", path: "/TNF002.view" },
    { text: "자동이체", path: "/TNF003.view" },
    { text: "자동이체관리", path: "/TNF004.view" },
    { text: "자동이체결과조회", path: "/TNF005.view" }
  ],
  dep: [
    { text: "상품안내/신청", path: "/DEP001.view" },
    { text: "입출금계좌신청", path: "/DEP002.view" },
    { text: "예적금해지", path: "/DEP003.view" },
    { text: "예적금해지예상조회", path: "/DEP004.view" },
    { text: "만기자동재예치/만기해지송금", path: "/DEP005.view" },
    { text: "적금납입일변경", path: "/DEP006.view" },
  ],
  lon: [
    { text: "상품안내/신청", path: "/LON001.view" },
    { text: "간편한도조회", path: "/LON002.view" },
    { text: "전자약정", path: "/LON003.view" },
    { text: "신용조회동의", path: "/LON004.view" },
    { text: "온라인서류제출", path: "/LON005.view" },
    { text: "대출상환신청", path: "/LON006.view" },
    { text: "대출연장신청", path: "/LON007.view" },
    { text: "대출철회신청", path: "/LON008.view" },
    { text: "대출진행상태조회", path: "/LON009.view" }
  ],
  efc: [
    { text: "고객정보변경", path: "/EFC001.view" },
    { text: "계좌비밀번호변경", path: "/EFC002.view" },
    { text: "계좌비밀번호오류해제", path: "/EFC003.view" },
    { text: "자주쓰는계좌관리", path: "/EFC004.view" },
    { text: "지연이체관리", path: "/EFC005.view" },
    { text: "출금지정계좌관리", path: "/EFC006.view" },
    { text: "입금지정계좌관리", path: "/EFC007.view" },
    { text: "이체한도관리", path: "/EFC008.view" },
    { text: "한도제한해제", path: "/EFC009.view" },
    { text: "해지계좌조회", path: "/EFC010.view" },
    { text: "거래중지좌", path: "/EFC011.view" },
    { text: "비과세종합저축한도", path: "/EFC012.view" },
    { text: "비과세종합저축증빙자료제출", path: "/EFC013.view" },
    { text: "전자금융가입", path: "/EFC014.view" }
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

  // txGbnCd에 해당하는 버튼 목록 가져오기
  const buttons = menuItems[txGbnCd] || [];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <TextBox01 text="업무 테스트"/>

      {/* 버튼 컨테이너 */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {buttons.map((item, index) => (
          <TestButton 
            key={index}
            btnName={item.text}
            clickFunc={() => doActionURL(item.path)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BankingTest;
