import { useState, useEffect } from "react";
import { Box, Typography, Input } from "@mui/material";
import { GLog,doAction, makeForm, addFormData  } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { Button04, ButtonFooter } from "@src/components/Button";
import InputLabel from '@mui/material/InputLabel';
import Logo from "@assets/images/com/svg/img_accountCrtf.png";
import DataSet from "@assets/io/DataSet";

const COM004_2 = ({ param, onClose }: { param: DataSet; onClose: (data?: DataSet) => void }) => {
  
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);   // 버튼상태
  const [seconds, setSeconds] =  useState<number>(180);                       // 타이머시작
  const [isRunning, setIsRunning] = useState<boolean>(true);                  // 타이머상태
  const [inputIdx1, setInputIdx1] = useState("");
  const [inputIdx2, setInputIdx2] = useState("");
  const [inputIdx3, setInputIdx3] = useState("");
  const [inputIdx4, setInputIdx4] = useState("");

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);       // 타이머 정리
          setIsRunning(false);        // 시간이 다 지나면 자동으로 멈춤
          setIsButtonDisabled(true);  // 버튼상태
          return 0;                   // 0초 유지
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  // 초기화
  // { setSeconds(180); setIsRunning(true); }


  if(!isRunning){

  }

  // 인증번호확인 이벤트 
  const fsbAcnoConfirmAuth = async () => { 
    

    if (isButtonDisabled){
      messageView(
        '입력시간이 초과되었습니다',
        '확인',
        () => GLog.d('확인 클릭')
      )
      return;
    }
    

    //폼생성,데이터 주입
    const form = makeForm('COM0004SC');
    addFormData(form,'txGbnCd','A02');
    addFormData(form,'AUTN_STR', inputIdx1+inputIdx2+inputIdx3+inputIdx4);
    addFormData(form,'BKCD', param.getString("BKCD"));
    addFormData(form,'ACNO', param.getString("ACNO"));
    addFormData(form,'PROD_KNCD', param.getString("PROD_KNCD"));
    
    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    //결과실패
    if(resDs.header.respCd != 'N00000'){
    GLog.e('에러발생 !!!');
    messageView(
        '통신 실패 : '+resDs.header.respMsg,
        '확인',
        () => GLog.d('확인 클릭')
    )
    return;
    }

    //정상
    if(resDs.data.getString('AUTH_SUCC_YN') === 'N'){
      messageView(
        '입력하신 인증번호가 일치하지 않아요',
        '확인',
        (() => {
            // TODO 팝업닫기
        })
        
        )
    }else {
      messageView(
        '계좌인증을 완료했어요',
        '확인',
        (() => {
            // TODO 팝업닫기
            onClose();
        })
        
        )
    }

  };
  

  return (
    
      <>    
        <Box className="content">
          <Typography variant="body1"><strong>입력하신 계좌로<br/>
                                        1원을 보내드렸어요<br/>
                                        입금자명 뒤쪽 4자리 숫자를<br/>
                                        입력해 주세요</strong></Typography>

          <Box component="img" src={Logo} alt="Logo"  sx={{ maxWidth: "320px" }} />

          <Box>
            <Typography className="numeric-info"><strong>입금자명 뒤쪽 4자리 숫자 입력하세요</strong></Typography>
            
            <Box className="security-input-wrap flex-col gap40">
              <Box className="numeric-box flex-row gap10">
                <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx1(e.target.value)}/>
                <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx2(e.target.value)}/>
                <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx3(e.target.value)}/>
                <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx4(e.target.value)}/>

              </Box>
            </Box>
          </Box>

          <InputLabel id="demo-simple-select-helper-label"><strong>입력시간:  {minutes}:{displaySeconds.toString().padStart(2, "0")}</strong></InputLabel>
          {/* <Button04 btnName = '확인'clickFunc={fsbAcnoConfirmAuth} disabled={isButtonDisabled}/> */}
        </Box>
        <ButtonFooter 
                  buttons={[
                    {
                      name: "확인",
                      className: "btn-primary",
                      disabled:isButtonDisabled,
                      onClick: fsbAcnoConfirmAuth,
                    },
                  ]}              
          />
      </>
 
  );
};

export default COM004_2;