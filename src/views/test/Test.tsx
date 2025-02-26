import { Box } from "@mui/material";
import { messageView } from '@src/components/alert';
import { TextBox01, TextBox02 } from "@src/components/text";
import { progressBar } from "@src/components/loading";
import { Button01 } from "@src/components/button";

import { GLog, Common, API_URL, APP_ENV } from '@assets/js/common';
import { toast } from "@src/components/toast";
import NativeUtil from '@assets/js/common_native';
import { openPopup , openBottomPopup , openFullPopup } from "@src/components/popup";


/**
 * 일반 테스트 화면 드로잉
 */
const Test = () => {
  const { doAction, makeForm, addFormData } = Common();
  const isApp = NativeUtil.isApp() ? "앱" : "웹"
  return (
    <Box sx={{textAlign: 'center'}}>
      {/* 
        타이틀
      */}
      <TextBox01 text="내부 기능 테스트"/>

      <TextBox02 text={`앱 환경 : ${isApp}`}/>

      {/* 
        네이티브 테스트 버튼 모음
      */}

      <Button01 
        btnName="로딩 테스트"
        clickFunc={async () => {
          progressBar(true, "로딩중");
          setTimeout(() => {
            progressBar(false);
          }, 3000); // 3초 후에 로딩 종료
        }}
      />

      <Button01 
        btnName="로그 테스트"
        clickFunc={async () => {
          GLog.d('로그테스트1  debug');
          GLog.i('로그테스트2  info');
          GLog.w('로그테스트3  wran');
          GLog.e('로그테스트4  error');
          GLog.d('==환경변수==');
          GLog.d('VITE_APP_API_BASE_URL : ' + API_URL);
          GLog.d('VITE_APP_ENV : ' + APP_ENV);
        }}
      />

      
      <Button01 
        btnName="Toast 테스트"
        clickFunc={async () => {
          toast('테스트', () => {
          });
        }}
      />

      
      <Button01 
        btnName="Alert 테스트"
        clickFunc={async () => {
          messageView(
            '한 개 버튼 메시지',
            '확인',
            () => GLog.d('확인 클릭')
          )
        }}
      />


      <Button01 
        btnName="Confirm 테스트"
        clickFunc={async () => {
          messageView(
            '두 개 버튼 메시지',
            '확인',
            () => GLog.d('확인 클릭'),
            '취소',
            () => GLog.d('취소 클릭')
          )
        }}
      />


      <Button01 
        btnName="doAction 테스트"
        clickFunc={async () => {

          //폼생성,데이터 주입
          const form = makeForm('COM0001SC');
          addFormData(form,'txGbnCd','S01');

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
            '통신완료 : '+JSON.stringify(test01),
            '확인',
            () => GLog.d('확인 클릭')
          )
        }}
      />

      <Button01 
        btnName="일반 팝업 테스트"
        clickFunc={() => {
          openPopup({url:'/popup/popup001.view',nFunc:()=>{
            GLog.d('일반 팝업 닫힘');
          }});
        }}
      />

      <Button01 
        btnName="바텀 팝업 테스트"
        clickFunc={() => {
          openBottomPopup({url:'/popup/popup001.view',nFunc:()=>{
            GLog.d('바텀 팝업 닫힘');
          }});
        }}
      />


      <Button01 
        btnName="풀 팝업 테스트"
        clickFunc={() => {
          openFullPopup({url:'/popup/popup001.view',nFunc:()=>{
            GLog.d('풀 팝업 닫힘');
          }});
        }}
      />


      <Button01 
        btnName="휴대폰 본인인증 테스트"
        clickFunc={() => {
          openFullPopup({url:'/com/com001.view',nFunc:()=>{
            GLog.d('풀 팝업 닫힘');
          }});
        }}
      />
    </Box>
  );
};

export default Test;
