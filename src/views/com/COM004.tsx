import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import { GLog, Common } from '@assets/js/common';
import { progressBar } from "@src/components/loading";
import { messageView } from '@src/components/alert';
import { NumberBox } from "@src/components/input";
import { Button01 } from "@src/components/button";
import { openBottomPopup } from "@src/components/popup";
 

const COM004 = () => {
  const { doAction, makeForm, addFormData } = Common();
  const [number, setNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>("");
  

  const [mblCtfcNo, setmblCtfcNo] = useState("");                                   /** 인증번호*/

  // 1. 초기 상태 정의
  const initialFormData = {
    custNm: "",
    telNo: "",
    rsrNo: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
      
    
  }, []);



  // 입력값 초기화 함수
  const resetForm = () => {
    
  };

    
  // 인증번호받기 이벤트 
  const fsbAcnoAuth = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0004SC');
    addFormData(form,'txGbnCd','A01');
    addFormData(form,'CUSTNM', formData.custNm);
    
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
    (() => {
        // TODO컨펌화면으로 이동
    })
    
    )
    

  };
  
  // 인증번호 확인 이벤트 TODO 인증번호체크인터페이스 필요
  const userConfirmAuth = async () => {
    console.log("인증 확인!");

    //폼생성,데이터 주입
    const form = makeForm('COM0001SC');
    addFormData(form,'txGbnCd','A02');
    addFormData(form,'MBL_CTFC_NO', mblCtfcNo);
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
    '정상처리 되었습니다.',
    '확인',
    (() => {
        resetForm(); // 입력값 초기화
    })
    )
    
  };

  return (
    
      <Box sx={{}}>
       
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">타행본인계좌인증</Typography>
            
          </Box>

        
          <Box mt={3}>
            <Typography variant="body1"><strong>타행 본인 계좌 인증으로 본인 확인을 진행해요</strong></Typography>
          </Box>

     
          <Box mt={3}>
            <Typography variant="body2">입금은행</Typography>
              <Button01 
                fontSize="15px"
                btnName="입금은행"
                width="100%"
                clickFunc={() => {
                  openBottomPopup({url: '/com/COM006.view',
                    nFunc: (selectedBankCode: string) => { 
                      console.log("선택된 은행 코드:", selectedBankCode); // 선택된 은행 코드 확인
                      setSelectedBank(selectedBankCode);  }
                    });
                }}
              />
          </Box>
          <Box mt={3}>
            <Typography variant="body2">계좌번호</Typography>
            <NumberBox label="숫자 입력" value={number} onChange={(e) => setNumber(e.target.value)} />
          </Box>


          <Box mt="auto" display="flex" justifyContent="space-between" >
            <Button variant="contained" color="primary" onClick={fsbAcnoAuth}>
              계좌인증
            </Button>
          </Box>
      </Box>
 
  );
};

export default COM004;