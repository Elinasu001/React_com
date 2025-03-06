import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import DataSet from "@src/assets/io/DataSet";

// common
import { doAction, makeForm, addFormData, doActionView, IS_LOGIN } from '@assets/js/common';

// components
import { messageView } from "@src/components/Alert";
import { MainBox, Box01 } from "@src/components/Box";
import { Button04 } from "@src/components/Button";
import { LimitDisplay } from "@src/components/Display";
import { LimitInput } from "@src/components/Input";
import { progressBar } from "@src/components/Loading";
import { TextBox01, TextBox02 } from "@src/components/Text";
import { TextList } from "@src/components/TextList";

const EFC008 = () => {

    // 페이지 이동 함수
    const navigate = useNavigate();

    // 현재 1회이체한도, 1일이체한도
    const [oneTimeAmount, setOneTimeAmount] = useState<number>(0);
    const [dailyAmount, setDailyAmount] = useState<number>(0);

    // 변경 1회이체한도, 1일이체한도
    const [oneTimeChangeAmount, setOneTimeChangeAmount] = useState<number | "">("");
    const [dailyChangeAmount, setDailyChangeAmount] = useState<number | "">("");

    // 이체한도변경 버튼 상태(기본값 true:비활성화)
    const [isSubmitting, setIsSubmitting] = useState(true);

    // 1회이체한도 변경시
    const handleOneTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: number | "" = e.target.value === "" ? "" : Number(e.target.value);
        setOneTimeChangeAmount(value);
        validateForm(value, dailyChangeAmount === "" ? "" : Number(dailyChangeAmount));
    };
    
    // 1일이체한도 변경시
    const handleDailyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: number | "" = e.target.value === "" ? "" : Number(e.target.value);
        setDailyChangeAmount(value);
        validateForm(oneTimeChangeAmount === "" ? "" : Number(oneTimeChangeAmount), value);
    };
    
    // 변경이체한도 입력에 따른 버튼 활성화 제어
    const validateForm = (oneTime: number | "", daily: number | "") => {
        if (oneTime !== "" && oneTime > 0 && daily !== "" && daily > 0) {
            setIsSubmitting(false);
        } else {
            setIsSubmitting(true);
        }
    };

    // 화면 첫 진입시 현재 1회,1일이체한도 조회
    useEffect(() => {

        // 로그인 여부 확인
        if(!IS_LOGIN()){
            messageView("로그인이 필요합니다.", "확인", () => navigate("/"));
            return;
        }
        
    const fetchApiIbaTlrdUpto = async () => { 

          // 폼 생성 및 파라미터 세팅
          const form = makeForm('EFC0008SC');
    
          // 로딩 ON
          progressBar(true, "통신중");
    
          try {
            const response = await doAction(form);

            // 로딩 OFF
            progressBar(false);
      
            // 서버 통신 실패시 return
            if (response.header.respCd !== "N00000") {
              messageView(`한도 조회 실패: ${response.header.respMsg}`, "확인");
              return;
            }
      
            // 서버와 통신으로 받아온 데이터
            const resData = response.data;

            // 서버에서 받아온 데이터 Set
            setOneTimeAmount(Number(resData.TI1_TRNF_LMIT || 0));   // 현재 1회이체한도
            setDailyAmount(Number(resData.DD1_TRNF_LMIT || 0));     // 현재 1일이체한도

          } catch (error) {
            progressBar(false);
            messageView("한도 조회 중 오류 발생", "확인");
            console.error("한도 조회 오류:", error);
          }
        };
    
        fetchApiIbaTlrdUpto(); 
    
    }, []);

    // 이체한도 변경 버튼 클릭시
    const handleSubmit = async () => {

        // 로딩 ON
        progressBar(true, "이체한도 변경 중...");
        
        // 폼 생성 및 파라미터 세팅
        const form = makeForm("EFC0008SC");
        addFormData(form, "TI1_TRNF_LMIT", oneTimeChangeAmount); // 변경1회 이체 한도
        addFormData(form, "DD1_TRNF_LMIT", dailyChangeAmount);   // 변경1일 이체 한도

        try {
            const response = await doAction(form);

            // 로딩 OFF
            progressBar(false);

            // 서버 통신 실패시 return
            if (response.header.respCd !== "N00000") {
                messageView(`이체한도 변경 실패: ${response.header.respMsg}`, "확인");
                return;
            }

            // 서버 통신 정상시 메세지알림
            messageView("이체한도가 성공적으로 변경되었습니다.", "확인", () => {
                const params = new DataSet({
                  API_RS_MSG: "SUCCESS",
                  BF_TI1_TRNF_LMIT: oneTimeAmount,      // 변경 전 1회 이체한도
                  BF_DD1_TRNF_LMIT: dailyAmount,        // 변경 전 1일 이체한도
                  TI1_TRNF_LMIT: oneTimeChangeAmount,   // 변경 후 1회 이체한도
                  DD1_TRNF_LMIT: dailyChangeAmount,     // 변경 후 1일 이체한도
                });
              
                // params와 함께 화면 이동
                doActionView("EFC008_1.view", params);
            });
              
        } catch (error) {
            progressBar(false);
            messageView("이체한도 변경 중 오류 발생", "확인");
            console.error("이체한도 변경 오류:", error);
        }
    };

    {/* 개인적으로 css 적용한 부분은 추후에 컴포넌트에 맞춰 수정*/}
    
  return (
        <>
        <MainBox>
            <Box01>
            {/* 화면 타이틀 */}
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

                {/* 이체한도 변경 버튼 */}
                <Button04 btnName="이체한도 변경" clickFunc={handleSubmit} disabled={isSubmitting} />

            </Box01>
        </MainBox>
        </>
  );
};

export default EFC008;
