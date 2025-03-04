import { progressBar } from "@src/components/Loading";
import axios from 'axios';
import DataSet from "@assets/io/DataSet";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { logout,login, convertUserData } from '@assets/js/redux/authSlice';
import { AppDispatch } from "@assets/js/redux/store";

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

//Data Type : 데이터 폼
// export type DataSet = Record<string,string|number|boolean|JSON|unknown>;


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

export const addFormData = (form: ApiReq, name: string, value: string): void => {
  form.param.putString(name,value);
};


axios.defaults.withCredentials = true;// axios 설정: 쿠키를 포함하여 요청하기 위해 withCredentials 옵션을 true로 설정
axios.defaults.timeout = 15000;// 기본 타임아웃 설정 (예: 15000ms = 15초)

/**
 * gp_backend 서비스랑 통신하는 함수 입니다.
 * @param req 서비스명,파라미터
 */
export const doAction = async (req: ApiReq): Promise<ApiRes> => {
  try {

    //axios 통신
    const response = await axios.post('/api/' + req.serviceCd + '.act', req.param, {
      headers: { 'Content-Type': 'application/json' }
    });
    // const response = await axios.post(API_URL + '/' + req.serviceCd + '.act', req.param, {
    //   headers: { 'Content-Type': 'application/json' }
    // });

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
 */

export const useAppNavigator = () => {
  const navigate = useNavigate();

  //`doActionURL()`을 navigate에 추가하여 반환
  const doActionURL = (uri: string) => {
    progressBar(true);
    setTimeout(() => {
      navigate(uri);
      progressBar(false);
    }, 500);
  };

  return Object.assign(navigate, { doActionURL });
};


/**
 * 로그인 처리
 */
export const doIdLogin = async (dispatch:AppDispatch,id:string,pwd:string) => {
  //OPEN API 로그인 요청
  const form = makeForm("COM0000SC");
  addFormData(form, "txGbnCd", "LOGIN");
  addFormData(form, "loginType", "I");
  addFormData(form, "USER_ID_12", id);
  addFormData(form, "USR_PWD", pwd);

  progressBar(true);

  //OPEN API 전자뱅킹 아이디 조회
  const response = await doAction(form);

  progressBar(false);

  GLog.d('로그인 결과 : '+response.data.toString());

  const { respCd } = response.header;                     //통신결과
  const apiRsMsg = response.data.getString("API_RS_MSG",'E00000,처리중 오류가 발생했습니다.') //OPEN API 전문결과

  //로그인 성공 처리
  if (respCd == "N00000" && apiRsMsg == "SUCCESS")
  {
      //로그인처리
      dispatch(login(convertUserData(response.data)));
      return "OK";
  }
  //로그인 에러 처리
  else
  {
    return apiRsMsg.split(',')[1];//OPEN API 로그인 실패 메세지는 , 구분으로 내려옴
  }
};

/**
 * 로그아웃 처리
 */
export const doLogout = async (dispatch: AppDispatch, navigate: NavigateFunction) => {
  progressBar(true);
  setTimeout(() => {
    dispatch(logout());
    navigate('/');
    progressBar(false);
  }, 1000);
  
}


// 세션 체크
export const sessionCheck = async () => {
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
    return true;
  }else{
    return false;
  }
}

export default { 
  GLog, 
  APP_ENV, 
  API_URL, 
  headerHeight, 
  bottomNavHeight, 
  makeForm, 
  addFormData, 
  doAction,
  doIdLogin,
  doLogout,
  useAppNavigator
};