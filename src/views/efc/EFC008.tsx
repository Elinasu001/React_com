import { Box, Typography, Divider } from "@mui/material";
import {LimitDisplay} from "@src/components/Display";
import {TextList} from "@src/components/TextList";
import { TextBox01, TextBox02 } from "@src/components/Text";
import { MainBox, Box01 } from "@src/components/Box";
import { NumberBox, LimitInput } from "@src/components/Input";
import { useState } from "react";

const EFC008 = () => {

    const [oneTimeAmount, setOneTimeAmount] = useState<number>();
    const [dailyAmount, setDailyAmount] = useState<number>();


    const handleOneTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setOneTimeAmount(value);
    };
    
    const handleDailyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setDailyAmount(value);
    };


  return (
        <>
        <MainBox>
            <Box01>
            {/* 페이지 메인 제목 */}
            <TextBox01 text="이체한도관리"></TextBox01>

                {/* 현재 이체 한도 정보 */}
                <Box flexDirection="column" gap={3}>
                    <LimitDisplay label="1회 이체한도" value={500000} />
                    <LimitDisplay label="1일 이체한도" value={1000000} />
                </Box>

                {/* 변경 이체 한도 입력 */}
                <Box sx={{ textAlign: "start" }}>
                    <TextBox02 text="변경이체한도"></TextBox02>
                    <LimitInput label="1회 이체한도" placeholder="1회 이체한도를 입력하새요" value={oneTimeAmount} onChange={handleOneTimeChange} ></LimitInput>
                    <LimitInput label="1일 이체한도" placeholder="1일 이체한도를 입력하새요" value={dailyAmount} onChange={handleDailyChange} ></LimitInput>
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
            </Box01>
        </MainBox>
        </>
  );
};

export default EFC008;
