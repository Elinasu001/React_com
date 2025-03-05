import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainBox, Box01 } from "@src/components/Box";
import { Card02 } from "@src/components/Card"; 
import { progressBar } from "@src/components/Loading"
import { messageView } from '@src/components/Alert';
import { TextBox01, TextBox02 } from "@src/components/Text";
import { GLog, doAction, makeForm, addFormData, getCustDs } from '@assets/js/common';
import { Accordion01 } from "@src/components/Accordion";


const INQ001 = () => {

  // ✅ 계좌 정보 인터페이스
  interface Account {
    type: string;
    acno: string;
    balance: number;
    pdnm: string;
  }

  const navigate = useNavigate();
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [loanList, setLoanList] = useState<Account[]>([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const user = getCustDs();
  
  useEffect(() => {

    if (!user) {
      messageView("로그인이 필요합니다.", "확인", () => navigate("/"));
      return;
    }
    
    const fetchApiInqOvvi0100_01 = async () => { 
     
      // 폼 생성 및 데이터 주입
      const form = makeForm('INQ0000SC');
      addFormData(form, 'txGbnCd'   , 'A');
      addFormData(form, 'SBCD'      , "050");
      addFormData(form, 'CSNO'      , user.CSNO);   
      addFormData(form, 'USR_ID'    , user.USR_ID); 
      addFormData(form, 'ACCO_KNCD' , "9"); // 전계좌조회

      // 로딩 ON
      progressBar(true, "통신중");

      try {
        const response = await doAction(form);
        progressBar(false);
  
        if (response.header.respCd !== "N00000") {
          messageView(`계좌 조회 실패: ${response.header.respMsg}`, "확인", () => navigate("/"));
          return;
        }
  
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


  const handleAccordionChange = (panel: string) => () => {
    setExpanded((prev) => (prev === panel ? false : panel));
  };
  

  return (

    <MainBox>
      <Box01>
        <TextBox01 text="전계좌조회"></TextBox01>

        {/* ✅ 수신 계좌 아코디언 */}
        <Accordion01 
          title="수신 계좌" 
          contents={
            accountList.length > 0 ? (
              accountList.map((account, index) => (
                <Card02 key={index} {...account} />
              ))
            ) : (
              <TextBox02 text="수신 계좌가 없습니다." />
            )
          }
          onChange={handleAccordionChange("deposit")}
          checked={expanded === "deposit"}
        />

        {/* ✅ 여신 계좌 아코디언 */}
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
