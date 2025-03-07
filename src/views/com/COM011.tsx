/**
 * @fileoverview [공통] 보안카드 입력 화면
 *
 * @author 
 * @version 1.0.0
 */
import { Box, Input, Typography } from "@mui/material";
import { addFormData, doAction, GLog, makeForm } from "@src/assets/js/common";
import { ButtonFooter } from "@src/components/Button";
import { progressBar } from "@src/components/Loading";
import { ContentTitle } from "@src/components/Text";
import { InfoList } from "@src/components/TextList";
import { useEffect, useState } from "react";
import { messageView } from "@src/components/Alert";
import { PopupViewProps } from "@src/assets/js/props/PopupViewProps";

const COM011 = (prop: PopupViewProps) => {

  // 로그인 팝업 상태
  const [secunoIdx1, setSecunoIdx1] = useState(""); // 보안카드 첫번째 자리
  const [secunoIdx2, setSecunoIdx2] = useState(""); // 보안카드 두번째 자리

  const [inputIdx11, setInputIdx11] = useState(""); // 보안카드 입력 첫번째 첫번째 자리
  const [inputIdx12, setInputIdx12] = useState(""); // 보안카드 입력 첫번째 두번째 자리

  const [inputIdx21, setInputIdx21] = useState(""); // 보안카드 입력 두번째 첫번째 자리
  const [inputIdx22, setInputIdx22] = useState(""); // 보안카드 입력 두번째 두번째 자리

  useEffect(() => {
    progressBar(true);
    
    //보안카드 전 조회
    const loadData = async () => {
      const form = makeForm('COM0011SC');
      addFormData(form,'txGbnCd','S');
      const response = await doAction(form);

      GLog.d('보안코드 지수 요청 결과 : '+JSON.stringify(response));

      const { respCd , respMsg } = response.header;                     //통신결과
      const apiRsMsg = response.data.getString("API_RS_MSG",'E00000,처리중 오류가 발생했습니다.') //OPEN API 전문결과

      if (respCd == "N00000" && apiRsMsg == "SUCCESS"){
        setSecunoIdx1(response.data.getString('SECUNO_IDX1'));
        setSecunoIdx2(response.data.getString('SECUNO_IDX2'));
      }else{
        messageView(respMsg,'확인');
      }
      GLog.d('data : '+JSON.stringify(response));
    };

    loadData();
    setTimeout(() => {
      progressBar(false);
    }, 500);
  }, []); // 빈 배열을 추가하면 마운트 시 한 번만 실행됩니다.


  //전송 액션
  const secuNumSend = async () => {
    const form = makeForm('COM0011SC');
    addFormData(form,'txGbnCd','R');
    addFormData(form,'SECU_CARD_INDC_NO1',secunoIdx1);  // 보안카드 지시번호#1
    addFormData(form,'SECU_CARD_PWD1_700',inputIdx11+inputIdx12);        // 보안카드 비밀번호1
    addFormData(form,'SECU_CARD_INDC_NO2',secunoIdx2);  // 보안카드 지시번호#2
    addFormData(form,'SECU_CARD_PWD2_700',inputIdx21+inputIdx22);        // 보안카드 비밀번호2
    addFormData(form,'ATSH_ISS_YN','');                 // 인증서발급여부
    addFormData(form,'SECU_CARD_SRNO','');              // 보안카드일련번호 
    const response = await doAction(form);

    const { respCd } = response.header;                     //통신결과
    const apiRsMsg = response.data.getString("API_RS_MSG",'E00000,처리중 오류가 발생했습니다.') //OPEN API 전문결과
  
    GLog.d('보안코드 검증 결과 : '+JSON.stringify(response));

    //로그인 인증성공
    if (respCd == "N00000" && apiRsMsg == "SUCCESS"){
      prop.onClose?.(response.data);
    }
    else{
      messageView(apiRsMsg.split(',')[1],'확인',()=>{
        prop.onClose?.();
      });
    }
  }

  return (
    // ** 팝업에서 불러오는 화면은 <> 묵어준 뒤 content 태그와 ButtonFooter 태그로 구분 지어 주세요.
    <>
    <Box className="content">
      
      {/* 컨텐츠 상단 타이틀 */}
      <ContentTitle
        title={
          <>
            <strong>출금계좌번호</strong>의
            <br />
            <strong>보안카드 번호</strong>를 입력해 주세요
          </>
        }
      />

      {/* 보안카드 입력 영역 */}
      <Box className="security-input-wrap flex-col gap40">

        {/* 앞 두 자리 입력 */}
        <Box>
          <Typography className="numeric-info">
            <span id="SECUNO_IDX1_text">{secunoIdx1}</span> 앞 두자리
          </Typography>
          <Box className="numeric-box flex-row gap10">
            <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx11(e.target.value)}/>
            <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx12(e.target.value)}/>
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
          </Box>
        </Box>

        {/* 뒤 두 자리 입력 */}
        <Box>
          <Typography className="numeric-info">
            <span id="SECUNO_IDX2_text">{secunoIdx2}</span> 뒤 두자리
          </Typography>
          <Box className="numeric-box flex-row gap10">
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
            <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx21(e.target.value)}/>
            <Input type="tel" inputProps={{ maxLength: 1 }} onChange={(e) => setInputIdx22(e.target.value)}/>
          </Box>
        </Box>
      </Box>

      {/* 정보 */}
      <InfoList
          title="보안카드 입력 안내"
          items={[
            "5회 오류 시 서비스 이용이 중단되고 메인으로 이동해요",
            "오류 해제를 원하실 경우 영업점에 방문해 이용제한 해제를 하셔야 해요"
          ]}
          listIcon={true}
          hideTitle={true} // titleIcon 사용시 삭제
        />
    </Box>
    <ButtonFooter
      buttons={[
        {
          name: "인증",
          className: "btn-primary",
          disabled: !(inputIdx11 && inputIdx12 && inputIdx21 && inputIdx22),
          onClick: secuNumSend,
        },
      ]}
    />
    </>
  );
};

export default COM011;