import { Box, TextField, Typography } from '@mui/material';
import DataSet from "@src/assets/io/DataSet";
import { PopupViewProps } from '@src/assets/js/props/PopupViewProps';
import { ButtonFooter } from "@src/components/Button";
import { useState } from 'react';

const POP004 = (prop: PopupViewProps) => {
  const [nickname, setNickname] = useState("");

  const handleSave = () => {
    if (!nickname.trim()) {
      alert("별칭을 입력해주세요!");
      return;
    }

    // 별칭 데이터 생성
    const result = new DataSet({ nickname });

    // 부모 컴포넌트 (`nFunc`)로 별칭 전달 & 팝업 닫기
    prop.onClose?.(result);

    // 입력 필드 초기화
    setNickname("");
  };

  return (
    <>
      <Box className="content">
        <Typography variant="h6">자주쓰는 계좌 별칭 설정</Typography>
        <TextField
          fullWidth
          placeholder="자주쓰는계좌별칭입력 (최대10자)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value.slice(0, 10))}
          inputProps={{ maxLength: 10 }}
          sx={{ mt: 2 }}
        />
      </Box>

      {/* 버튼 UI */}
      <ButtonFooter
        buttons={[
          { name: "취소", className: "btn-secondary", onClick: () => prop.onClose?.() },
          { name: "저장", className: "btn-primary", onClick: handleSave },
        ]}
      />
    </>
  );
};

export default POP004;
