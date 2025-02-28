import { useState, useEffect } from "react";
import { Box01 } from "@src/components/Box";
import { Card06 } from "@src/components/Card"; 
import { progressBar } from "@src/components/Loading"
import { messageView } from '@src/components/Alert';
import { TextBox01, TextBox02 } from "@src/components/Text";
import { GLog, doAction, makeForm, addFormData } from '@assets/js/common';

const INQ001 = () => {

  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const fetchApiInqOvvi0100_01 = async () => { 

      // 폼 생성 및 데이터 주입
      const form = makeForm('INQ0000SC');
      addFormData(form, 'txGbnCd'   , 'TEST3'     );
      addFormData(form, 'SBCD'      , "050"       );
      addFormData(form, 'CSNO'      , "12345679"  );
      addFormData(form, 'USR_ID'    , "cjh"       );
      addFormData(form, 'ACCO_KNCD' , "9"         );

      // 로딩 ON
      progressBar(true, "통신중");

      // 통신
      const response = await doAction(form);

      // 로딩 OFF
      progressBar(false);
      
      // 결과 실패 처리
      if (response.header.respCd !== 'N00000') {
        GLog.e('에러발생 !!!');
        messageView(
          '통신 실패 : ' + response.header.respMsg,
          '확인',
          () => GLog.d('확인 클릭')
        );
        return;
      }

      // 정상 응답 처리
      messageView(
        '통신완료 : ' + JSON.stringify(response.data),
        '확인',
        () => {
          if (Array.isArray(response.data.OUT_REC)) {
            setAccounts(response.data.OUT_REC);
            console.log("setAccounts 업데이트됨 ■■■■■", response.data.OUT_REC);
          }else {
            console.error("OUT_REC 데이터 확인 ■■■■■", response.data.OUT_REC);
          }
        }
      );
    };

    fetchApiInqOvvi0100_01(); 
  }, []);

  return (
    <Box01>

      <TextBox01 text="전계좌조회"></TextBox01>

        <TextBox02 text="계좌 목록"></TextBox02>
          {accounts.length > 0 ? (
            accounts.map((account, index) =>
            account ? <Card06 key={index} {...account} /> : null
            )
          ) : (
            <TextBox02 text="계좌 정보가 없습니다."></TextBox02>
          )}

    </Box01>
  );
};

export default INQ001;
