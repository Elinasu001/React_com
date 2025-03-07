import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { ButtonFooter } from "@src/components/Button";
import { GLog, doAction,makeForm, addFormData } from '@assets/js/common';
import { TextBox, NumberBox, ResidentNumber, SelectInputBox} from "@src/components/InputType";
import DataSet from "@assets/io/DataSet";


const COM001 = ({ onClose }: { onClose: (data?: DataSet) => void }) => {
  const [telCdData, settelCdData] = useState<{ key: string; label: string }[]>([]); // 통신사코드리스트
  const [selectedCarrier, setSelectedCarrier] = useState("");                       // 선택한통신사코드
  const [mblCtfcNo, setmblCtfcNo] = useState("");                                   // 인증번호
  const [showVerificationInput, setShowVerificationInput] = useState(false);        // 인증번호입력필드 상태값
  const [isVerified, setIsVerified] = useState(false);                              // 인증번호받기 상태값 
  const [firstPart, setFirstPart] = useState("");                                   // 주민번호앞자리
  const [secondPart, setSecondPart] = useState("");                                 // 주민번호뒷자리
  const [custNm, setCustNm] = useState("");                                         // 고객명
  const [telNo, setTelNo] = useState("");                                           // 휴대폰번호
  
  useEffect(() => {
      fetchTest();
    
  }, []);

  useEffect(() => {
      console.log("선택통신사"+selectedCarrier)
    
  }, [selectedCarrier]);

    
  const mblCtfcNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setmblCtfcNo(event.target.value);
  }

  // 입력값 초기화 함수
  const resetForm = () => {
    setmblCtfcNo("");
    setSelectedCarrier("");
    setCustNm("");
    setTelNo("");
    setFirstPart("");
    setSecondPart("");
    
    setShowVerificationInput(false);
    setIsVerified(false);
  };

  // 닫기 버튼 클릭 시 입력값 초기화 후 팝업 닫기
  const handleClose = () => {
    resetForm(); // 입력값 초기화
  };
    
  const fetchTest = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0001SC');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'CD_DMN_ID','TEL_CD');

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    const list = (resDs.data.getList('list') as { CD: string; CD_NM: string }[]) ?? [];

    const formattedList = list.map(item => ({
      key: item.CD,
      label: item.CD_NM
    }));
    settelCdData(formattedList);
   
  };
  
  // 인증번호받기 이벤트 
  const userAuth = async () => { 

    setShowVerificationInput(true);
    //폼생성,데이터 주입
    const form = makeForm('COM0001SC');
    addFormData(form,'txGbnCd','A01');
    addFormData(form,'CUSTNM', custNm);
    addFormData(form,'TELNO', telNo);
    addFormData(form,'RSR_RG_NO', firstPart+secondPart);
    addFormData(form,'TELCD', selectedCarrier);

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
        setIsVerified(true);
        setShowVerificationInput(true); // 인증번호 입력 필드 표시
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
        () => { 
          resetForm(); // 입력값 초기화 
          const selectedData = new DataSet({'USER_AUTH': 'false'});
          onClose(selectedData)
        }
    )
    return;
    }

    //정상
    messageView(
    '정상처리 되었습니다.',
    '확인',
    (() => {
        const selectedData = new DataSet({ 'USER_AUTH': 'true' , 'HNPH_TSCO_DV_CD': selectedCarrier, 'CUST_NM': custNm, 'HNPH_NO': telNo, 'RBRNO': firstPart+secondPart});
        resetForm(); // 입력값 초기화
        onClose(selectedData);
    })
    )
    
  };

  return (
    
    <>
     <Box className="content">
    
          
          <TextBox label="이름 입력" onChange={(e) => setCustNm(e.target.value)}  name="custNm" value={custNm}></TextBox>
          <ResidentNumber label="주민등록번호 입력" firstValue={firstPart} secondValue={secondPart} 
              onFirstChange={(e) => setFirstPart(e.target.value)} onSecondChange={(e) => setSecondPart(e.target.value)}/>

          <SelectInputBox selectLabel='통신사' selectOptions={telCdData} 
          selectValue={selectedCarrier} onSelectChange={(e) => setSelectedCarrier(e.target.value as string)}  
          inputValue={telNo} onInputChange={(e) => setTelNo(e.target.value)}/>
          
            {showVerificationInput && (       
            <>
                <NumberBox label="인증번호 입력" onChange={mblCtfcNoChange} value={mblCtfcNo ?? ""}></NumberBox>
                
            </>
            )}
      </Box>
      
      <ButtonFooter
        buttons={[
          {
            name: !isVerified ? "인증번호받기" : "인증확인",
            className: "btn-primary",
            onClick: !isVerified ? userAuth :userConfirmAuth ,
          },
        ]}
    />
              
    </>
         
      
 
  );
};

export default COM001;