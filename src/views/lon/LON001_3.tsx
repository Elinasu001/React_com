/**
 * @fileoverview [여신] 대출관련 보이스피싱 안내
 *
 * @author 
 * @version 1.0.0
 */
import { useState } from "react";
import { messageView } from "@src/components/Alert";
import { Button01 } from "@src/components/Button";
import { Box, Typography } from "@mui/material";
import DataSet from "@src/assets/io/DataSet";
import { RadioBox } from "@src/components/Input";

interface VoicePhishingCheckProps {
  onClose: (data?: DataSet) => void;
}

// 보이스피싱 점검 문항 목록
const questions = [
  { id: "q1", text: "1. 지금 진행하시는 대출이 금융회사 직원이라며 전화나 문자를 받아 진행하고 계신가요?" },
  { id: "q2", text: "2. 신용등급 상향, 대출보증비 등의 수수료라며 돈을 먼저 입금하라고 하던가요?" },
  { id: "q3", text: "3. 고금리 대출을 받아 상환하면 저금리로 대출이 가능하다는 얘기를 하던가요?" },
];

const LON001_3 = ({ onClose }: VoicePhishingCheckProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(questions.map((q) => [q.id, ""]))  // 초기화
  );

  // 라디오 버튼 선택 시 상태 변경
  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // 확인 버튼 클릭
  const handleSubmit = () => {
    if (questions.some((q) => !answers[q.id])) {
      messageView("선택하지 않은 문항이 남아있습니다.", "확인");
      return;
    }

    if (Object.values(answers).some((answer) => answer === "예")) {
      messageView("보이스피싱 예방 문진에 '예'를 선택하여 보이스피싱 피해가 의심됩니다. 보이스피싱 여부를 확인한 후 다시 거래하시기 바랍니다.", "확인");
      return;
    }

    onClose(new DataSet({ success: true }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 질문 리스트 */}
      {questions.map((question) => (
        <Box key={question.id} sx={{ mt: 3, mb: 7 }}>
          <Typography>{question.text}</Typography>
          <RadioBox
            label=""
            options={["예", "아니오"]}
            value={answers[question.id]}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        </Box>
      ))}

      {/* 보이스피싱 주의 안내문 */}
      <Typography sx={{ mb: 2 }}>
        위 항목 중 한 개라도 해당된다면 금융사기(보이스피싱)가 의심돼요!
      </Typography>
      <Typography>
        금융사기 예방을 위해 지인에게 금융사기(보이스피싱) 여부를 확인받거나 은행 콜센터로 연락하여 직원에게 상담을 요청하거나 즉시 112로 신고하세요.
      </Typography>

      {/* 확인 버튼 */}
      <Button01 btnName="확인" clickFunc={handleSubmit} />
    </Box>
  );
};

export default LON001_3;