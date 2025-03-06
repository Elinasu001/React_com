/**
 * @fileoverview [여신] 한도조회화면
 *
 * @author 
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { GLog, doAction,makeForm, addFormData, doActionURL, doActionView } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { openFullPopup, openBottomPopup, openFullPopup2 } from "@src/components/Popup";
import { MainBox } from "@src/components/Box";
import { ContentTitle } from "@src/components/Text";
import { TextBox, NumberBox, EmailBox, PwdBox, CheckBox, RadioBox } from "@src/components/Input";
import DataSet from '@src/assets/io/DataSet';

import COM001 from "@src/views/com/COM001";
import COM002 from "@src/views/com/COM002";


const LON002_1 = () => {

  const [userAuth, setUserAuth] = useState(false);            // 본인인증상태값
  const [lonAgrCheck, setLonAgrCheck] = useState(false);      // 약관동의상태값
  const [radioValue, setRadioValue] = useState('요약동의서');  // 요약상세구분
  const [hnphTscoDvCd, setHnphTscoDvCd] = useState("");       // 통신사구분코드
  const [custNm, setCustNm] = useState("");                   // 고객명
  const [prdctCd, setPrdctCd] = useState("");                 // 상품코드
  const [loanCnsltAmt, setLoanCnsltAmt] = useState("");       // 대출희망금액
  const [hnphNo, setHnphNo] = useState("");                   // 휴대폰번호
  const [rbrNo, setRbrNo] = useState("");                     // 주민등록번호


  GLog.d('본인인증 전 '+userAuth+'::::'+lonAgrCheck+radioValue);

  // TODO 1.대출가능시간 먼저체크


  const loanStbt = () => { 
  
      //폼생성,데이터 주입
      const form = makeForm('LON002SC');
      addFormData(form,'HNPH_TSCO_DV_CD', hnphTscoDvCd);
      addFormData(form,'CUST_NM', custNm);
      addFormData(form,'PRDCT_CD', prdctCd);
      addFormData(form,'LOAN_CNSLT_AMT', loanCnsltAmt);
      addFormData(form,'HNPH_NO', hnphNo);
      addFormData(form,'RBRNO', rbrNo);
      
      doActionView("/lon/LON002_2.view", new DataSet({form}), false);

  };

  return (
    <>
      
      <ContentTitle title="대출 한도 조회" />
      
      {/* 본인인증 */}
      {!userAuth && (
          <COM001
            onClose={(data?) => {
              if (data && data.getString('USER_AUTH') === 'true') {
                setHnphTscoDvCd(data.getString('HNPH_TSCO_DV_CD'));
                setCustNm(data.getString('CUST_NM'));
                setHnphNo(data.getString('HNPH_NO'));
                setRbrNo(data.getString('RBRNO'));
                setUserAuth(true);
              } else {
                setUserAuth(false);
              }
            }}
          />
      )}
     
      {/* 약관동의 UI (본인인증 완료 후 표시) */}
      {userAuth && !lonAgrCheck && (
        <>
        <RadioBox label="" options={['요약동의서', '상세동의서']} value={radioValue} onChange={(e) => setRadioValue(e.target.value)}/>

        {radioValue === "요약동의서" &&(
          <COM002
            title='요약약관동의'
            buttonText="다음 버튼"
            stplatClsCd="O049001"
            nFunc={() => setLonAgrCheck(true)} // 약관 동의 후 처리
          />

        )}

        {radioValue === "상세동의서" &&(
          <COM002
            title='상세약관동의'
            buttonText="다음 버튼"
            stplatClsCd="O049001"
            nFunc={() => setLonAgrCheck(true)} // 약관 동의 후 처리
          />

        )}
          
        </>
      )}

      {/* 본인인증과 약관동의가 모두 완료된 경우 다음 화면 */}
      {userAuth && lonAgrCheck && (
        loanStbt()
      )}

    </>
  );
};

export default LON002_1;
