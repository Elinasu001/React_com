import { Box, Divider } from "@mui/material";
import { LimitDisplay } from "@src/components/Display";
import { TextList } from "@src/components/TextList";
import { TextBox01, TextBox02 } from "@src/components/Text";
import { MainBox, Box01 } from "@src/components/Box";
import { LimitInput } from "@src/components/Input";
import { useEffect, useState } from "react";
import { progressBar } from "@src/components/Loading";
import { GLog, doAction, makeForm } from '@assets/js/common';
import { messageView } from "@src/components/Alert";
import { useNavigate } from "react-router-dom";
import { Button04 } from "@src/components/Button";

const EFC008 = () => {

    const navigate = useNavigate();
    const [oneTimeAmount, setOneTimeAmount] = useState<number>(0);
    const [dailyAmount, setDailyAmount] = useState<number>(0);

    const [oneTimeChangeAmount, setOneTimeChangeAmount] = useState<number | "">("");
    const [dailyChangeAmount, setDailyChangeAmount] = useState<number | "">("");
    const [isSubmitting, setIsSubmitting] = useState(true);

    const handleOneTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: number | "" = e.target.value === "" ? "" : Number(e.target.value);
        setOneTimeChangeAmount(value);
        validateForm(value, dailyChangeAmount === "" ? "" : Number(dailyChangeAmount));
    };
    
    const handleDailyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: number | "" = e.target.value === "" ? "" : Number(e.target.value);
        setDailyChangeAmount(value);
        validateForm(oneTimeChangeAmount === "" ? "" : Number(oneTimeChangeAmount), value);
    };
    
    const validateForm = (oneTime: number | "", daily: number | "") => {
        if (oneTime !== "" && oneTime > 0 && daily !== "" && daily > 0) {
            setIsSubmitting(false);
        } else {
            setIsSubmitting(true);
        }
    };

    useEffect(() => {
        
    const fetchApiIbaTlrdUpto = async () => { 

          // 폼 생성 및 데이터 주입
          const form = makeForm('EFC0008SC');
          //addFormData(form, 'txGbnCd'   , '');
          //addFormData(form, 'SBCD'      , "050");
          //addFormData(form, 'CSNO'      , user.CSNO);   
          //addFormData(form, 'USR_ID'    , user.USR_ID); 
          //addFormData(form, 'ACCO_KNCD' , "9"); // 전계좌조회
    
          // 로딩 ON
          progressBar(true, "통신중");
    
          try {
            const response = await doAction(form);
            progressBar(false);
      
            if (response.header.respCd !== "N00000") {
              messageView(`한도 조회 실패: ${response.header.respMsg}`, "확인");
              return;
            }
      
            const resData = response.data;
            setOneTimeAmount(Number(resData.TI1_TRNF_LMIT || 0)); 
            setDailyAmount(Number(resData.DD1_TRNF_LMIT || 0)); 

          } catch (error) {
            progressBar(false);
            messageView("한도 조회 중 오류 발생", "확인");
            console.error("한도 조회 오류:", error);
          }
        };
    
        fetchApiIbaTlrdUpto(); 
    
      }, []);

  return (
        <>
        <MainBox>
            <Box01>
            {/* 페이지 메인 제목 */}
            <TextBox01 text="이체한도관리"></TextBox01>

                {/* 현재 이체 한도 정보 */}
                <Box flexDirection="column" gap={3}>
                    <LimitDisplay label="1회 이체한도" value={oneTimeAmount} />
                    <LimitDisplay label="1일 이체한도" value={dailyAmount} />
                </Box>

                {/* 변경 이체 한도 입력 */}
                <Box sx={{ textAlign: "start" }}>
                    <TextBox02 text="변경이체한도"></TextBox02>
                    <LimitInput label="1회 이체한도" placeholder="1회 이체한도를 입력하새요" value={oneTimeChangeAmount} onChange={handleOneTimeChange}></LimitInput>
                    <LimitInput label="1일 이체한도" placeholder="1일 이체한도를 입력하새요" value={dailyChangeAmount} onChange={handleDailyChange}></LimitInput>
                </Box>

                {/* 보안매체에 따른 최대 이체한도 */}
                <TextList 
                    title="보안매체에 따른 최대 이체한도"
                    items={[
                    "OTP - 1일 5억원, 1회 1억원",
                    "보안카드/mOTP - 1일 5천만원, 1회 1천만원",
                    "보안카드/mOTP+SMS - 1일 2억5천만원, 1회 5천만원"
                    ]}
                />

                {/* 구분선 */}
                <Divider sx={{ borderColor: "lightgray", borderBottomWidth: 1, my: 1 }} />{/* my: 구분선을 기준으로 위아래 간격 1씩 */}

                {/* 알아두세요 */}
                <TextList 
                    title="알아두세요"
                    items={[
                    "비대면한도 계좌 또는 금융거래한도제한계좌 등 계좌별 제한이 있는 경우 이체한도가 제한돼요",
                    "인터넷뱅킹과 텔레뱅킹 서비스도 함께 적용돼요"
                    ]}
                />

                <Button04 btnName="이체한도 변경" clickFunc={() => console.log("전송 클릭됨")} disabled={isSubmitting} />

            </Box01>
        </MainBox>
        </>
  );
};

export default EFC008;
