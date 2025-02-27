import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Box01 } from "@src/components/Box";
import { Card04 } from "@src/components/Card";
import { Accordion01 } from "@src/components/Accordion";

export const COM002 = () => {
  const [agreements, setAgreements] = useState([
    { title: "금융상품 중요사항 안내", checked: false, contents: "금융상품 중요사항 안내 상세 내용입니다." },
    { title: "E-RUN패킹통장 상품설명서", checked: false, contents: "E-RUN패킹통장 상품설명서 상세 내용입니다." },
    { title: "E-RUN 패킹통장 특약", checked: false, contents: "E-RUN 패킹통장 특약 상세 내용입니다." },
    { title: "전자금융서비스 이용약관", checked: false, contents: "전자금융서비스 이용약관 상세 내용입니다." },
  ]);

  const handleAgreementChange = (index: number) => {
    setAgreements((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <Box01>
      {/* 헤더 */}
      <Typography variant="h5" sx={{ mb: 3 }}>계좌 개설을 위해 약관에 동의해 주세요</Typography>

      {/* 필수 약관 카드 */}
      <Card04 title="필수 약관">
        {agreements.map((agreement, index) => (
          <Accordion01 key={index} {...agreement} onChange={() => handleAgreementChange(index)} />
        ))}
      </Card04>

      {/* 이메일 입력 */}
      <Typography variant="h6" sx={{ mt: 3 }}>이메일</Typography>
      <TextField fullWidth variant="outlined" placeholder="abc@example.com" sx={{ mt: 1, mb: 3 }} />

      {/* 제출 버튼 */}
      <Button variant="contained" fullWidth>계좌 개설 진행</Button>
    </Box01>
  );
};

export default COM002;
