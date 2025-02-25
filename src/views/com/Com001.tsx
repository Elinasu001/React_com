import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { GLog, Common } from '@assets/js/common';
import { progressBar } from "@src/components/loading";
import { messageView } from '@src/components/alert';


interface MobileAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileAuth: React.FC<MobileAuthProps> = ({ isOpen, onClose }) => {
  const { doAction, makeForm, addFormData } = Common();
  const [testData, setTestData] = useState<any>(null);

  if (!isOpen) return null; // 팝업이 닫혀 있으면 렌더링하지 않음

  const fetchTest = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('https://jsonplaceholder.typicode.com/posts');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'telNo','01041778316');

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const test01 = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    //결과실패
    if(test01.header.respCd != 'N00000'){
    GLog.e('에러발생 !!!');
    messageView(
        '통신 실패 : '+test01.header.respMsg,
        '확인',
        () => GLog.d('확인 클릭')
    )
    return;
    }

    //정상
    messageView(
    '통신완료 : '+JSON.stringify(test01.data),
    '확인',
    () => GLog.d('확인 클릭')
    )
   
  };

  return (
    
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            width: "90vw",
            maxWidth: "500px",
            height: "80vh",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
          }}
        >

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">휴대폰 본인인증</Typography>
            <Button onClick={onClose}>X</Button>
          </Box>

        
          <Box mt={3}>
            <Typography variant="body1"><strong>본인인증을 진행해주세요.</strong></Typography>
          </Box>

     
          <Box mt={3}>
            <Typography variant="body2">이름</Typography>
            <TextField 
              fullWidth
              id="A_CUST_NM"
              name="A_CUST_NM"
              placeholder="이름 입력"
              variant="outlined"
              required
            />
          </Box>

          <Box mt={3}>
            <Typography variant="body2">통신사</Typography>
            <TextField 
              fullWidth
              id="A_CUST_"
              name="A_CUST_NM"
              placeholder="이름 입력"
              variant="outlined"
              required
            />
          </Box>

     
          <Box mt="auto" display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={fetchTest}>
              테스트 실행
            </Button>
            <Button variant="outlined" onClick={onClose}>
              닫기
            </Button>
          </Box>
        </Box>
      </Box>
 
  );
};

export default MobileAuth;
