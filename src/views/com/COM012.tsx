/**
 * @fileoverview [공통] OTP 입력 화면
 *
 * @author 
 * @version 1.0.0
 */
import { addFormData, doAction, GLog, makeForm } from "@src/assets/js/common";
import { PopupViewProps } from "@src/assets/js/props/PopupViewProps";
import { messageView } from "@src/components/Alert";
import { MainBox } from "@src/components/Box";
import { progressBar } from "@src/components/Loading";
import { showKeypad } from "@src/components/Popup";
import { useEffect } from "react";

const COM012 = (prop: PopupViewProps) => {

  useEffect(() => {
    const loadData = async () => {
      const result = await showKeypad('OTP비밀번호를 입력해주세요',6);
      const secuNum = result.getString('num');

      if(secuNum.length>1){
        progressBar(true);
        const form = makeForm('COM0012SC');
        addFormData(form,'txGbnCd','S');
        addFormData(form,'OTP_OTPT_VAL',secuNum);  // OTP출력값1(보정전 입력값)
        const response = await doAction(form);
  
        const { respCd , respMsg} = response.header;                     //통신결과
        const apiRsMsg = response.data.getString("API_RS_MSG",'E00000,처리중 오류가 발생했습니다.') //OPEN API 전문결과
      
        GLog.d('OTP 검증 결과 : '+JSON.stringify(response));
    
        progressBar(false);
  
        if (respCd == "N00000" && apiRsMsg == "SUCCESS"){
          messageView('OTP 검증 성공','확인',()=>{
            prop.onClose?.(response.data);
          });
        }else{
          messageView(respMsg,'확인',()=>{
            prop.onClose?.();
          });
        }
      }else{
        prop.onClose?.();
      }
      
    };

    loadData();

  }, []);
  return (
    <MainBox>
    </MainBox>
  );
};

export default COM012;
