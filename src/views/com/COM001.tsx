import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { TextBox } from '@src/components/Input';
import { SelectBox01 } from '@src/components/SelectBox';
import { ButtonFooter } from "@src/components/Button";
import { GLog, doAction,makeForm, addFormData } from '@assets/js/common';
import DataSet from "@assets/io/DataSet";


const COM001 = ({ onClose }: { onClose: (data?: DataSet) => void }) => {
  const [telCdData, settelCdData] = useState<{ key: string; label: string }[]>([]); /** 통신사코드리스트 */
  const [selectedCarrier, setSelectedCarrier] = useState("");                       /** 선택한통신사코드 */
  const [mblCtfcNo, setmblCtfcNo] = useState("");                                   /** 인증번호*/
  const [showVerificationInput, setShowVerificationInput] = useState(false);        /** 인증번호입력필드 상태값 */
  const [isVerified, setIsVerified] = useState(false);                              /** 인증번호받기 상태값 */
  
  
  // 1. 초기 상태 정의
  const initialFormData = {
    custNm: "",
    telNo: "",
    rsrNo: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
      fetchTest();
    
  }, []);

  useEffect(() => {
      console.log("선택통신사"+selectedCarrier)
    
  }, [selectedCarrier]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // 입력 필드의 name과 value 가져오기
          setFormData((prevData) => ({
              ...prevData,
              [name]: value, // 해당 name에 해당하는 값 업데이트
        }));
    };

    const mblCtfcNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setmblCtfcNo(event.target.value);
    }

  // 입력값 초기화 함수
  const resetForm = () => {
    setmblCtfcNo("");
    setSelectedCarrier("");
    setFormData(initialFormData);
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
    const test01 = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    const list = (test01.data.getList('list') as { CD: string; CD_NM: string }[]) ?? [];

    const formattedList = list.map(item => ({
      key: item.CD,
      label: item.CD_NM
    }));
    settelCdData(formattedList);
   
  };
  
  // 인증번호받기 이벤트 
  const userAuth = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0001SC');
    addFormData(form,'txGbnCd','A01');
    addFormData(form,'CUSTNM', formData.custNm);
    addFormData(form,'TELNO', formData.telNo);
    addFormData(form,'RSR_RG_NO', formData.rsrNo);
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
        // setmblCtfcNo(test01.data.MBL_CTFC_NO);
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
        () => { resetForm(); // 입력값 초기화 
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
        resetForm(); // 입력값 초기화
        const selectedData = new DataSet({ 'USER_AUTH': 'true'});
        onClose(selectedData);
    })
    )
    
  };

  return (
    
    <>
     <Box className="content">
          <Typography variant="body1"><strong>본인인증을 진행해주세요.</strong></Typography>
          
          <TextBox label="이름 입력" onChange={handleChange}  name="custNm" value={formData.custNm}></TextBox>
          <TextBox label="주민등록번호 입력" onChange={handleChange} name="rsrNo" value={formData.rsrNo}></TextBox>
          <SelectBox01 label="통신사" items={telCdData}  onChange={setSelectedCarrier} />
          <TextBox label="휴대폰번호 입력" onChange={handleChange} name="telNo" value={formData.telNo}></TextBox>
          
            {showVerificationInput && (       
            <>
                <Typography variant="body2">인증번호</Typography>
                <TextBox label="인증번호 입력" onChange={mblCtfcNoChange} value={mblCtfcNo ?? ""}></TextBox>
                
            </>
            )}
      </Box>
      
      <ButtonFooter
        buttons={[
          {
            name: isVerified ? "인증번호받기" : "인증확인",
            className: "btn-primary",
            onClick: isVerified ? userConfirmAuth : userAuth ,
          },
        ]}
    />
              
    </>
         
      
 
  );
};

export default COM001;