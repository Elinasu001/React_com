import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { GLog,doAction, makeForm, addFormData  } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { NumberBox } from "@src/components/Input";
import { Button01 } from "@src/components/Button";

import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Logo from "@assets/images/com/svg/img_accountCrtf.png";

interface DataSet {
  bankCode: string; 
  bankName: string;  
}

const COM004_2 = () => {
  
  const [number, setNumber] = useState('');
  const [selectedBankCd, setSelectedBankCd] = useState<string>("");
  const [selectedBankNm, setSelectedBankNm] = useState<string>("");
  const [formData, setFormData] = useState("");

  
  function selectBankCd(data?: DataSet) {
    if (!data || !("bankCode" in data)) {
      setSelectedBankCd(""); 
      setSelectedBankNm(""); 
      return;
    }else {
      setSelectedBankCd(data.bankCode as string);
      setSelectedBankNm(data.bankName as string);
    }
  };
  

    
  // 인증번호받기 이벤트 
  const fsbAcnoConfirmAuth = async () => { 
    
    //폼생성,데이터 주입
    const form = makeForm('COM0004SC');
    addFormData(form,'txGbnCd','A02');
    addFormData(form,'CUSTNM', "");
    
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
    '정상처리되었습니다',
    '확인',
    (() => {
        // TODO컨펌화면으로 이동
    })
    
    )
    

  };
  

  return (
    
      <Box sx={{}}>
 
          <Box mt={3}>
            <Typography variant="body1"><strong>입력하신 계좌로<br/>
                                            1원을 보내드렸어요<br/>
                                            입금자명 뒤쪽 4자리 숫자를<br/>
                                            입력해 주세요</strong></Typography>
          </Box>

          <Box component="img" src={Logo} alt="Logo"  sx={{ maxWidth: "320px" }} />
          <InputLabel id="demo-simple-select-helper-label"><strong>입금자명 뒤쪽 4자리 숫자 입력하세요</strong></InputLabel>
          <Box mt={3}>
             <NumberBox label="숫자 입력" value={number} onChange={(e) => setNumber(e.target.value)} />
          </Box>

          <InputLabel id="demo-simple-select-helper-label"><strong>입금자명 뒤쪽 4자리 숫자 입력하세요</strong></InputLabel>
            <Button01 btnName = '계좌인증'clickFunc={fsbAcnoConfirmAuth}/>
      </Box>
 
  );
};

export default COM004_2;