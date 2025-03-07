/**
 * @fileoverview [공통] 타행본인계좌인증(중앙회)
 *
 * 호출방법 PROD_KNCD : 10:보통예금, 20:정기예금, 30:적금, 40:BC카드, 41:롯데카드, 
50:사잇돌, 60:신용, 70:종합통장, 80:햇살론, EL:전자금융, LR:대출철회, IR:금리인하요구, CF:제증명, EN:계좌비밀번호3회오류해제, TI:이체한도증액, CD:재수행주기도래(CDD), AS: API앱 재설정 및 재설치
 * 
  openFullPopup({
    component: COM004_1,
    title: item.text,
    param: new DataSet({'PROD_KNCD':'1'}),
    nFunc: (data?) => {
      if (data) {
        GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
      } else {
        GLog.d('팝업 취소 닫힘');
      }
    }
  });
 * @author 
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { GLog, doAction,makeForm, addFormData } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { NumberBox } from "@src/components/Input";
import { ButtonFooter } from "@src/components/Button";
import { TextBox02, ContentTitle } from "@src/components/Text";
import { SelectBox02 } from '@src/components/SelectBox';
import { openBottomPopup,openFullPopup } from "@src/components/Popup";
import COM006 from "@src/views/com/COM006";
import COM004_2 from "./COM004_2";
import DataSet from "@assets/io/DataSet";
import { PopupViewProps } from "@src/assets/js/props/PopupViewProps";

const COM004_1 = (prop: PopupViewProps) => {
  const [inputAcno, setinputAcno] = useState('');
  const [selectedBankCd, setSelectedBankCd] = useState<string>("");
  const [selectedBankNm, setSelectedBankNm] = useState<string>("");
  const form = makeForm('COM0004SC');
  
  // 은행선택 콜백
  function selectBankCd(data?: DataSet) {
    GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
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
  const fsbAcnoAuth = async () => { 

    try {

      //폼생성,데이터 주입
    addFormData(form,'txGbnCd','A01');
    addFormData(form,'BKCD', selectedBankCd);                         // 은행코드
    addFormData(form,'ACNO', inputAcno);                              // 계좌번호
    addFormData(form,'PROD_KNCD', param.getString("PROD_KNCD"));      // 비대면상품종류코드
    
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
        () => {return;}
    )
      
    }else {
        
        if (resDs.data.getString('API_RS_MSG') != "SUCCESS") {
          messageView(resDs.data.getString('API_RS_MSG'), "확인", () => {return;});
        }else { 

          const prodKncd = prop.param?.getString('PROD_KNCD') ?? '';

          const bkData = new DataSet();
          bkData.putString('BKCD',selectedBankCd);
          bkData.putString('ACNO',inputAcno);
          bkData.putString('PROD_KNCD', prodKncd);

          openFullPopup({
            component: COM004_2,
            title: '타행계좌본인인증확인',
            param:new DataSet(bkData),
            nFunc: (data?) => {
              if (data) {
                GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
              } else {
                GLog.d('팝업 취소 닫힘');
              }
            }
          });

        }


    }

    }catch(error){
      progressBar(false);
      GLog.e("타행본인계좌인증 중 오류 발생:", error);
      messageView("타행본인계좌인증 중 오류가 발생했습니다.", "확인", () => {return;});
               
    }

  };

  return (
    
      <>
       <Box className="content">
           <ContentTitle
                   title={
                     <>
                       <strong>타행 본인 계좌 인증</strong>으로
                       <br />
                       <strong>본인 확인</strong>을 진행해요
                     </>
                   }
             />

              <SelectBox02 label="입금은행" value={selectedBankCd } text={selectedBankNm} 
                onClick ={() => {
                                openBottomPopup({
                                  component: COM006,
                                  title: "은행선택",
                                  nFunc: (data?) => {
                                    if (data) {
                                    
                                      selectBankCd(data);
                                    } else {
                                      GLog.d('팝업 취소 닫힘');
                                    }
                                  }
                                });

                                }}/>
              

    
            <TextBox02 text="계좌번호"/>
            <NumberBox label="계좌번호입력" value={inputAcno} onChange={(e) => setinputAcno(e.target.value)} />
        </Box>

        <ButtonFooter 
          buttons={[
            {
              name: "계좌인증",
              className: "btn-primary",
              onClick: fsbAcnoAuth,
            },
          ]}              
          />
          
      </>
 
  );
};

export default COM004_1;