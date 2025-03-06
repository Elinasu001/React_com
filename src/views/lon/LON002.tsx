/**
 * @fileoverview [여신] 한도조회화면
 *
 * @author 
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { GLog, doAction,makeForm, addFormData } from '@assets/js/common';
import { openFullPopup, openBottomPopup, openFullPopup2 } from "@src/components/Popup";
import { MainBox } from "@src/components/Box";
import DataSet from '@src/assets/io/DataSet';

import COM001 from "@src/views/com/COM001";


const LON002 = () => {

  const [userAuth, setUserAuth] = useState(false); // 본인인증상태값
  GLog.d('본인인증 전 '+userAuth);

  useEffect(() => {
    if(!userAuth){
      openFullPopup({
        component: COM001,
        title: '본인인증',
        nFunc: (data?) => {
          if (data) {
            GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
            if(data.getString('USER_AUTH') === 'true'){
              setUserAuth(true);
            }else {
              setUserAuth(false);
            } 
            GLog.d('본인인증 후1111'+userAuth);
          } else {
            GLog.d('본인인증 후2222');
          }
        }
      });
    }
  
}, [userAuth])
  
  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    <MainBox>
      <h1>타이틀~</h1>
      <p>개발중</p>
    </MainBox>
  );
};

export default LON002;
