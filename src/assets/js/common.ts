/**
 * @fileoverview [공통] 기능 함수 모음음
 *
 * 사용 예시:
 * import CommonFORM from '@assets/js/common_form';
 *
 * @file common.ts
 * @author GNB
 * @version 1.0.0
 */
import { progressBar } from "@src/components/Loading";
import { logout,login, convertUserData, CustDs } from '@src/assets/js/redux/slice/custDs';
import axios from 'axios';
import DataSet from "@assets/io/DataSet";
import { getNavigation } from '@assets/js/service/navigationService'; // 전역 네비게이션 ref
import { messageView } from "@src/components/Alert";
import { store } from "@assets/js/redux/store";
import { Location } from 'react-router-dom';


//앱 실행 환경
export enum AppEnvType {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  LOCAL = 'local'
}

export const APP_ENV = (import.meta.env.VITE_APP_ENV as AppEnvType) || AppEnvType.LOCAL;
export const API_URL = import.meta.env.VITE_APP_API_BASE_URL;

//상단 헤더 높이
export const headerHeight = 50;
//하단 헤더 높이
export const bottomNavHeight = 60;


//로그인 상태 값
export const IS_LOGIN = (): boolean => {
  return Boolean(store.getState().custDs.user);
};

//Data Type : 데이터 전송 요청 폼
export type ApiReq  = {
  serviceCd: string;
  param: DataSet;
}

//Data Type : 데이터 전송 응답 폼
export type ApiRes  = {
  header: {
    respCd: string;
    respMsg: string;
  };
  data: DataSet;
}

export const GLog = (() => {
  const _debug = (logMessage: string): void => {
    if (APP_ENV != AppEnvType.PRODUCTION)console.log("[DEBUG]:" + logMessage);
  };

  const _info = (logMessage: string): void => {
    if (APP_ENV != AppEnvType.PRODUCTION)console.info("[INFO]:" + logMessage);
  };
  
  const _warn = (logMessage: string): void => {
    if (APP_ENV != AppEnvType.PRODUCTION)console.warn("[WARN]:" + logMessage);
  };

  // 에러 익셉션 객체(error)를 선택적 매개변수로 추가
  const _error = (msg: string, error?: unknown): void => {
    if (APP_ENV != AppEnvType.PRODUCTION) {
      if (error == null) {
        console.error("[ERROR]:" + msg);
      } else {
        console.error("[ERROR]:" + msg, error);
      }
    }
  };

  return {
    d: _debug,
    i: _info,
    w: _warn,
    e: _error
  };
})();


/**
 * 공통 함수 모음
 */

export const makeForm = (serviceCd:string): ApiReq => ({
  serviceCd,
  param: new DataSet({})
});

// export const addFormData = (form: ApiReq, name: string, value: string): void => {
//   form.param.putString(name,value);
// };

export const addFormData = (form: ApiReq, name: string, value: string | number): void => {
  if (typeof value === "number") {
    form.param.putNumber(name, value);
  } else {
    form.param.putString(name, value);
  }
};


axios.defaults.withCredentials = true;// axios 설정: 쿠키를 포함하여 요청하기 위해 withCredentials 옵션을 true로 설정
axios.defaults.timeout = 60000;// 기본 타임아웃 설정 (예: 15000ms = 15초)

/**
 * gp_backend 서비스랑 통신하는 함수 입니다.
 * @param req 서비스명,파라미터
 */
export const doAction = async (req: ApiReq, isLogin = false): Promise<ApiRes> => {

  // if(isLogin){
  //   const loginChk = await loginCheck();
  //   if(!loginChk){
  //     messageView('로그인이 필요합니다','확인',()=>{
  //       //페이지 이어하기 작업중
  //     });
  //   }
  // }
  try {
    //axios 통신
    const response = await axios.post('/api/' + req.serviceCd + '.act', req.param, {
      headers: { 'Content-Type': 'application/json' }
    });

    // 응답 데이터 분리
    const { APP_HEADER: appHeader, ...data } = response.data;

    return {
      header: {
        respCd: appHeader?.respCd || "N00000", // 성공 코드
        respMsg: appHeader?.respMsg || "성공적으로 처리되었습니다."
      },
      data: new DataSet(data) // 성공 시 반환 데이터
    };
  } catch (error: any) {
    // 내부 에러 상세 정보는 서버 로그로 남기고, 클라이언트에는 일반 메시지만 전달하는 것이 좋습니다.
    GLog.e("API 호출 에러:", error);
    return {
      header: {
        respCd: "E00000", // 에러 코드
        respMsg: error.response?.data?.message || error.message || "처리 중 오류가 발생하였습니다." // 안전하게 문자열로 변환
      },
      data: new DataSet({}) // 실패 시 빈 데이터셋 반환
    };
  }
};


/**
 * 페이지 전환 전 로딩을 켜고, 일정 시간 후 uri로 navigate 합니다.
 * @param uri 이동할 페이지의 경로
 * @param isLogin 로그인 필수 여부부
 */
export const doActionURL = async (uri: string, isLogin = false) =>{
  
  progressBar(true); //로딩 열기

  if(isLogin){
    const loginChk = await loginCheck();
    if(!loginChk){
      progressBar(false);
      messageView('로그인이 필요합니다','확인',()=>{
        doLogout(false);
      });
    }
  }

  const navigate = getNavigation();
  if (!navigate) {
    messageView("처리중 오류 발생했습니다.","확인");
    return;
  }
  
  setTimeout(() => {
    navigate(uri);
    logout();
    progressBar(false);
  }, 500);
}


/**
 * 페이지 전환 전 로딩을 켜고, 일정 시간 후 uri로 navigate 합니다.
 * @param uri 이동할 페이지의 경로
 * @param isLogin 로그인 필수 여부부
 */
export const doActionView = async (uri: string,param: DataSet = new DataSet({}), isLogin = false) =>{

  progressBar(true); //로딩 열기

  if(isLogin){
    const loginChk = await loginCheck();
    if(!loginChk){
      progressBar(false);
      messageView('로그인이 필요합니다','확인',()=>{
        doLogout(false);
      });
    }
  }

  const navigate = getNavigation();
  if (!navigate) {
    messageView("처리중 오류 발생했습니다.","확인");
    return;
  }

  setTimeout(() => {
    navigate(uri, { state: param.toString() });
    progressBar(false);
  }, 500);
}

/**
 * 넘긴 페이지 파라미터 불러오기
 */
export const getParameter = (location: Location): DataSet => {
  GLog.d('location : '+JSON.stringify(location));
  if(typeof(location.state)=='string'){
    return new DataSet(JSON.parse(location?.state));
  }
  return new DataSet({});
};


export enum LoginType{
  PIN,      //간편비밀번호
  BIO,      //생체인증
  PATTERN,  //패턴
  COM,      //공동인증서
  FIN,      //금융인증서
  ID        //전자금융아이디
}


export const doLogin = async (loginType:LoginType, data : DataSet) => {
  progressBar(true);

  //OPEN API 로그인 요청
  const form = makeForm("COM0000SC");
  addFormData(form, "txGbnCd", "LOGIN");

  switch (loginType) {
    case LoginType.PIN:
    case LoginType.BIO:
    case LoginType.PATTERN:
    case LoginType.COM:
    case LoginType.FIN:
      break;
    case LoginType.ID:
      addFormData(form, "loginType", "I");
      addFormData(form, "USER_ID_12", data.getString('ID'));
      addFormData(form, "USR_PWD", data.getString('PW'));
      break;
  }

  //OPEN API 로그인전문 송신
  const response = await doAction(form);
  // const response: ApiRes = {
  //   header: {
  //     respCd: "N00000",
  //     respMsg: "성공적으로 처리되었습니다.",
  //   },
  //   data: new DataSet({'API_RS_MSG':'SUCCESS','USR_ID':'hipen8','USR_NM':'김남교'})
  // };

  progressBar(false);

  if(response.data.getString('API_RS_MSG') == ''){
    return {result:false,msg:"서버와의 통신 오류입니다."};//서버 재기동 필요
  }

  GLog.d('로그인 결과 : '+response.data.toString());

  const { respCd } = response.header;                     //통신결과
  const apiRsMsg = response.data.getString("API_RS_MSG",'E00000,처리중 오류가 발생했습니다.') //OPEN API 전문결과

  //로그인 성공 처리
  if (respCd == "N00000" && apiRsMsg == "SUCCESS")
  {
      //로그인처리
      store.dispatch(login(convertUserData(response.data)));
      return {result:true,msg:"정상로그인"};
  }
  //로그인 에러 처리
  else
  {
    return {result:false,msg:apiRsMsg.split(',')[1]};//OPEN API 로그인 실패 메세지는 , 구분으로 내려옴
  }
}

/**
 * 로그아웃 처리
 */
export const doLogout = (isMessage : Boolean = true) => {
  if(isMessage){
    messageView('로그아웃 하시겠습니까?','예',() => {
      store.dispatch(logout());
      doActionURL('/');
    },'아니요');
  }else{
    store.dispatch(logout());
    doActionURL('/');
  }
}

export const getCustDs = (): CustDs | null => {
  return store.getState().custDs.user;
}


/**
 * 로그인 세션 여부 체크
 */
export const loginCheck = async (): Promise<boolean> => {

  //쿠키 체크
  if(!IS_LOGIN())
    {
    return false;
  }

  //세션 체크
  const form = makeForm("COM0000SC");
  addFormData(form, "txGbnCd", "LOGIN");
  addFormData(form, "loginType", "SC");
  const response = await doAction(form);
  const isLogin = response.data.getBoolean('IS_LOGIN',false);
  GLog.d('로그인 세션 확인 + '+isLogin);
  if(isLogin){
    addFormData(form, "txGbnCd", "LOGIN");
    addFormData(form, "loginType", "R");
    const response2 = await doAction(form);
    GLog.d('로그인 세션 갱신 + '+response2.data.toString());
  }
  else
  {
    return false;
  }

  return true;
}

// 세션 체크
// export const sessionCheck = async () => {
//   const form = makeForm("COM0000SC");
//   addFormData(form, "txGbnCd", "LOGIN");
//   addFormData(form, "loginType", "SC");
//   const response = await doAction(form);
//   const isLogin = response.data.getBoolean('IS_LOGIN',false);
//   GLog.d('로그인 세션 확인 + '+isLogin);
//   if(isLogin){
//     addFormData(form, "txGbnCd", "LOGIN");
//     addFormData(form, "loginType", "R");
//     const response2 = await doAction(form);
//     GLog.d('로그인 세션 갱신 + '+response2.data.toString());
//     return true;
//   }else{
//     return false;
//   }
// }

export default { 
  GLog, 
  APP_ENV, 
  API_URL, 
  headerHeight, 
  bottomNavHeight, 
  makeForm, 
  addFormData, 
  doAction,
  doActionURL,
  doActionView,
  doLogin,
  doLogout,
  getCustDs,
  getParameter
};