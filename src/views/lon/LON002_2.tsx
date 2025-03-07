/**
 * @fileoverview [여신] 적합성정보입력
 *
 * @author 
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { GLog, doAction,makeForm, addFormData, getParameter } from '@assets/js/common';
import { ContentTitle } from "@src/components/Text";
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { Button04, ButtonFooter } from "@src/components/Button";
import { TextBox, NumberBox, EmailBox, PwdBox, CheckBox, RadioBox } from "@src/components/Input";
import { SelectBox01 } from '@src/components/SelectBox';
import { useLocation } from "react-router-dom";
import DataSet from '@src/assets/io/DataSet';

const LON002_2 = () => {

  const getSafeObj = (obj: unknown, key: string): any => {
    return typeof obj === "object" && obj !== null ? (obj as Record<string, any>)[key] : undefined;
  };

  const param = getParameter(useLocation()).getObj('form');
  const data01 = new DataSet(getSafeObj(param, 'param'));

  // const hnphTscoDvCd = data01.getString('HNPH_TSCO_DV_CD');
  // const custNm = data01.getString('CUST_NM');
  // const prdctCd = data01.getString('PRDCT_CD')?? "760198";
  // const loanCnsltAmt = data01.getString('LOAN_CNSLT_AMT')?? "0";
  // const hnphNo = data01.getString('HNPH_NO');
  // const rbrNo = data01.getString('RBRNO');
  const [hnphTscoDvCd, setHnphTscoDvCd] = useState("");   // 통신사구분코드
  const [custNm, setCustNm] = useState("");               // 고객명
  const [prdctCd, setPrdctCd] = useState("");             // 상품코드
  const [loanCnsltAmt, setLoanCnsltAmt] = useState("");   // 대출희망금액
  const [hnphNo, setHnphNo] = useState("");               // 휴대폰번호
  const [rbrNo, setRbrNo] = useState("");                 // 주민등록번호


  useEffect(()=>{
    setHnphTscoDvCd(data01.getString('HNPH_TSCO_DV_CD'));
    setCustNm(data01.getString('CUST_NM'));
    setHnphNo(data01.getString('HNPH_NO'));
    setRbrNo(data01.getString('RBRNO'));
    setPrdctCd(data01.getString('PRDCT_CD'));
    setLoanCnsltAmt(data01.getString('LOAN_CNSLT_AMT'));

  }, [data01]);

  const loanNff01 = async () => {

      //폼생성,데이터 주입
      const form = makeForm('LON0002SC');
      addFormData(form,'txGbnCd','A01');
      addFormData(form,'HNPH_TSCO_DV_CD', hnphTscoDvCd);
      addFormData(form,'CUST_NM', custNm);
      addFormData(form,'PRDCT_CD', prdctCd);
      addFormData(form,'LOAN_CNSLT_AMT', loanCnsltAmt);
      addFormData(form,'HNPH_NO', hnphNo);
      addFormData(form,'RBRNO', rbrNo);

      // TODO 적합성정보데이터 추가
  
      //로딩 ON
      progressBar(true, "통신중");
  
      try {
        //통신
        const response = await doAction(form);
        //로딩 OFF
        progressBar(false);
  
        if (response.header.respCd !== "N00000") {
          GLog.e("통신 실패:", response.header.respMsg);
          messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
          return;
        }else {
          if(response.data.ERR_CODE !== 'B0000000'){
            messageView(`통신 실패 : ${response.data.ERR_MSG}`, "확인", () => GLog.d("확인 클릭"));
          }else {
            // 정상 다음단계
          }

          
        }
  
  
      } catch (error) {
        progressBar(false);
        GLog.e("한도조회 중 오류 발생:", error);
        messageView("한도조회 중 오류가 발생했습니다.", "확인", () => {return;});
      }
    };
    


  return (
    <>
      
      <ContentTitle title="대출 한도 조회" />

        <p className="txt"><strong>적합성&#183;적정성 정보</strong>를<br/> 확인할게요</p>
        {/* <SelectBox01 label="연령" ></SelectBox01> */}
        <ButtonFooter 
                  buttons={[
                    {
                      name: "확인",
                      className: "btn-primary",
                      onClick: loanNff01,
                    },
                  ]}              
          />
    </>
  );
};

export default LON002_2;
