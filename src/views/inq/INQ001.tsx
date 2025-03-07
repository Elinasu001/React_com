import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// common
import { doAction, makeForm, addFormData, getCustDs, doActionView, GLog } from '@assets/js/common';

// components
import { Accordion01 } from "@src/components/Accordion";
import { messageView } from '@src/components/Alert';
import { MainBox, Box01 } from "@src/components/Box";
import { Card02 } from "@src/components/Card"; 
import { progressBar } from "@src/components/Loading"
import { TextBox01, TextBox02 } from "@src/components/Text";

const INQ001 = () => {

  // 계좌 정보 인터페이스
  interface Account {
    type: string;         // 계좌 타입
    acno: string;         // 계좌 번호
    balance: number;      // 계좌 잔액
    pdnm: string;         // 상품 이름
    newDt: string;        // 개설일자
    wtchPosbAmt: number;  // 출금가능금액
    psntInrt: number;     // 현재적용금리
  }

  const navigate = useNavigate();
  const [accountList1, setAccountList1] = useState<Account[]>([]);    // 입출금 계좌 List
  const [accountList2, setAccountList2] = useState<Account[]>([]);    // 적금 계좌 List
  const [accountList3, setAccountList3] = useState<Account[]>([]);    // 예금 계좌 List
  const [loanList, setLoanList] = useState<Account[]>([]);            // 여신 계좌 List
  const [expanded, setExpanded] = useState<string | false>(false);    // 토글 상태 여부
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
      const form = makeForm('INQ0001SC');
      // addFormData(form, 'txGbnCd'   , 'A');         // 분기값
      // addFormData(form, 'SBCD'      , "050");       // 은행코드
      // addFormData(form, 'CSNO'      , user.CSNO);   // 사용자 고객번호  
      // addFormData(form, 'USR_ID'    , user.USR_ID); // 사용자 아이디
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

        const mapAccounts = (key: string) =>
          resData.getList(key).map(acc => ({
            type: acc.ACCO_KNCD,
            acno: acc.ACNO,
            balance: acc.ACNT_BLNC,
            pdnm: acc.PROD_NM,
            newDt:acc.NEW_DT,
            wtchPosbAmt:acc.WTCH_POSB_AMT,
            psntInrt:acc.PSNT_INRT,
          }));
          
          // 계좌 List set
          setAccountList1(mapAccounts("REC1")); // 입출금
          setAccountList2(mapAccounts("REC2")); // 적금
          setAccountList3(mapAccounts("REC3")); // 예금
          setLoanList(mapAccounts("REC4"));     // 대출

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

  // 수신 계좌
  const accountCategories = [
    { title: "입출금 계좌", list: accountList1, key: "deposit1" },
    { title: "적금 계좌", list: accountList2, key: "deposit2" },
    { title: "예금 계좌", list: accountList3, key: "deposit3" },
  ];
  
  {/* 개인적으로 css 적용한 부분은 추후에 컴포넌트에 맞춰 수정*/}
  
  return (

    <MainBox>
      <Box01>
        {/* 화면 타이틀 */}
        <TextBox01 text="전계좌조회"></TextBox01>

        {/* 수신 계좌 아코디언 */}
        {accountCategories.map(({ title, list, key }) => (
          <Accordion01 
            key={key}
            title={title}
            contents={
              list.length > 0 ? (
                list.map((account, index) => (
                  <Card02 key={index} {...account} 
                    nFunc={(accountData) => {doActionView("/inq/INQ002.view", accountData);}}
                  />
                ))
              ) : (
                <TextBox02 text={`${title}가 없습니다.`} />
              )
            }
            onChange={handleAccordionChange(key)}
            checked={expanded === key}
          />
        ))}

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
