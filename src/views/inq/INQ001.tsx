import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// common
import { doAction, makeForm, addFormData, getCustDs, doActionView } from '@assets/js/common';

//components
import { Accordion01 } from "@src/components/Accordion";
import { messageView } from '@src/components/Alert';
import { MainBox, Box01 } from "@src/components/Box";
import { Card02 } from "@src/components/Card"; 
import { progressBar } from "@src/components/Loading"
import { TextBox01, TextBox02 } from "@src/components/Text";

const INQ001 = () => {

  // 계좌 정보 인터페이스
  interface Account {
    type: string;     // 계좌 타입
    acno: string;     // 계좌 번호
    balance: number;  // 계좌 잔액
    pdnm: string;     // 상품 이름
  }

  const navigate = useNavigate();
  const [accountList, setAccountList] = useState<Account[]>([]);    // 수신 계좌 List
  const [loanList, setLoanList] = useState<Account[]>([]);          // 여신 계좌 List
  const [expanded, setExpanded] = useState<string | false>(false);  // 토글 상태 여부
  const user = getCustDs(); // 로그인 사용자 정보 가져오기
  
  // 최초 화면 진입시 실행
  useEffect(() => {

    // 비로그인 상태로 화면 접속시 메세지와 함께 메인으로 돌려보낸다
    if (!user) {
      messageView("로그인이 필요합니다.", "확인", () => navigate("/"));
      return;
    }
    
    const fetchApiInqOvvi0100_01 = async () => { 
     
      // 폼 생성 및 파라미터 세팅
      const form = makeForm('INQ0000SC');
      addFormData(form, 'txGbnCd'   , 'A');         // 분기값
      addFormData(form, 'SBCD'      , "050");       // 은행코드
      addFormData(form, 'CSNO'      , user.CSNO);   // 사용자 고객번호  
      addFormData(form, 'USR_ID'    , user.USR_ID); // 사용자 아이디
      addFormData(form, 'ACCO_KNCD' , "9");         // 계좌구분값 (전계좌조회)

      // 로딩 ON
      progressBar(true, "통신중");

      try {
        const response = await doAction(form);

        // 로딩 OFF
        progressBar(false);
  
        // 서버 통신 실패시 return
        if (response.header.respCd !== "N00000") {
          messageView(`계좌 조회 실패: ${response.header.respMsg}`, "확인", () => navigate("/"));
          return;
        }
  
        // 서버와 통신으로 받아온 데이터
        const resData = response.data;

        // 여신 계좌
        const loanAccounts = resData.getList("REC4").map(acc => ({
          type: "여신",
          acno: acc.ACNO,
          balance: acc.ACNT_BLNC,
          pdnm: acc.PROD_NM,
        }));

        // 수신 계좌
        const depositAccounts = ["REC1", "REC2", "REC3"]
          .flatMap(key => resData.getList(key))
          .map(acc => ({
            type: "수신",
            acno: acc.ACNO,
            balance: acc.ACNT_BLNC,
            pdnm: acc.PROD_NM,
        }));
  
        // 서버에서 받아온 데이터 Set
        setAccountList(depositAccounts);
        setLoanList(loanAccounts);

      } catch (error) {
        progressBar(false);
        messageView("계좌 조회 중 오류 발생", "확인");
        console.error("계좌 조회 오류:", error);
      }
    };

    fetchApiInqOvvi0100_01(); 

  }, [user, navigate]);

  // 토글 상태값에 따른 열고 닫기
  const handleAccordionChange = (panel: string) => () => {
    setExpanded((prev) => (prev === panel ? false : panel));
  };

  {/* 개인적으로 css 적용한 부분은 추후에 컴포넌트에 맞춰 수정*/}
  
  return (

    <MainBox>
      <Box01>
        {/* 화면 타이틀 */}
        <TextBox01 text="전계좌조회"></TextBox01>

        {/* 수신 계좌 아코디언 */}
        <Accordion01 
          title="수신 계좌" 
          contents={
            accountList.length > 0 ? (
              accountList.map((account, index) => (
                <Card02 key={index} {...account} 
                  nFunc={(accountData) => {doActionView("/inq/INQ002.view", accountData);}}
                />
              ))
            ) : (
              <TextBox02 text="수신 계좌가 없습니다." />
            )
          }
          onChange={handleAccordionChange("deposit")}
          checked={expanded === "deposit"}
        />

        {/* 여신 계좌 아코디언 */}
        <Accordion01 
          title="여신 계좌" 
          contents={
            loanList.length > 0 ? (
              loanList.map((account, index) => (
                <Card02 key={index} {...account} />
              ))
            ) : (
              <TextBox02 text="여신 계좌가 없습니다." />
            )
          }
          onChange={handleAccordionChange("loan")}
          checked={expanded === "loan"}
        />
      </Box01>
    </MainBox>
  );
};

export default INQ001;
