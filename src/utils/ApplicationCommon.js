import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL2 = process.env.REACT_APP_API_BASE_URL2;


// ✅ ApplicationCommon Context 생성
const ApplicationCommonContext = createContext();

// ✅ 공통 로깅 함수
const LOG = {
  debug: (message, ...args) => console.log("[DEBUG]:", message, ...args),
  info: (message, ...args) => console.log("[INFO]:", message, ...args),
  error: (message, ...args) => console.error("[ERROR]:", message, ...args),
};

const getApiBaseUrl = () => {
  const currentDomain = window.location.hostname;
  if (currentDomain.includes("gnbsoftec")) {
    return API_BASE_URL; // gnbsoftec 도메인일 때
  } else if (currentDomain.includes("puresolution")) {
    return API_BASE_URL2; // puresolution 도메인일 때
  }
  return API_BASE_URL; // 기본값 (예외 처리)
};

// ✅ `ApplicationCommonProvider` (전역 상태 관리)
export const ApplicationCommonProvider = ({ children }) => {
  const [appMode] = useState("DEV");
  const [menuId] = useState("");
  const [frameId] = useState("MAIN_FRAME");
  const [serverTime] = useState(new Date().getTime());
  const [ipAddr] = useState("127.0.0.1");
  const [hostUrl] = useState(window.location.origin);

  useEffect(() => {
    LOG.debug("[ApplicationCommon] 환경 설정 완료", {
      appMode,
      menuId,
      frameId,
      serverTime,
      ipAddr,
      hostUrl,
    });
  }, [appMode, menuId, frameId, serverTime, ipAddr, hostUrl]);

  // ✅ 오류 처리 함수
  const errorProcess = useCallback((errMsg) => {
    if (!errMsg || typeof errMsg !== "string") {
      LOG.error("[ApplicationCommon] errorProcess에 잘못된 값 전달됨:", errMsg);
      errMsg = "알 수 없는 오류 발생";
    }
    LOG.error("[ApplicationCommon] 오류 발생:", errMsg);
    alert(errMsg);
  }, []);

  // ✅ 로그아웃 처리 함수
  const logoutProcess = useCallback(() => {
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  }, []);

  // ✅ 비동기 API 호출 함수 (기존 doAction)
  const doAction = useCallback(async (serviceCd, requestData, callbackFunc) => {
    try {
      const apiUrl = getApiBaseUrl();
      LOG.debug(`[doAction] 요청: ${serviceCd}`, requestData, `API: ${apiUrl}`);
  
      const response = await axios.post(`${apiUrl}/${serviceCd}.act`, requestData, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        withCredentials: true,
      });
  
      LOG.debug("[doAction] 성공 응답:", response.data);
      if (!response.data || !response.data.APP_HEADER) {
        LOG.error("[doAction] 응답 데이터가 유효하지 않음:", response.data);
        callbackFunc({
          APP_HEADER: { respCd: "E00000", respMsg: "유효하지 않은 응답 데이터입니다." },
        });
        return;
      }
  
      callbackFunc(response.data);
    } catch (error) {
      LOG.error("처리 중 오류 발생:", error);
      callbackFunc({ APP_HEADER: { respCd: "E00000", respMsg: "처리 중 오류가 발생하였습니다." } });
    }
  }, []);

  // ✅ 화면 이동이 필요한 요청 처리 함수 (doActionFrm)
  const doActionFrm = useCallback(async (serviceCd, requestData, targetUrl, navigate) => {
    try {
      LOG.debug(`[doActionFrm] 요청: ${serviceCd}`, requestData);
      const response = await axios.post(`${API_BASE_URL}/${serviceCd}.act`, requestData, {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        withCredentials: true,
      });

      LOG.debug("[doActionFrm] 성공 응답:", response.data);

      if (!response.data || !response.data.APP_HEADER) {
        LOG.error("[doActionFrm] 응답 데이터가 유효하지 않음:", response.data);
        alert("유효하지 않은 응답 데이터입니다.");
        return;
      }

      const { respCd, respMsg } = response.data.APP_HEADER;

      if (respCd === "N00001") {
        // ✅ 화면 이동 (menuId와 frameId를 포함하여 이동)
        LOG.info(`[doActionFrm] 화면 이동: ${targetUrl}`);
        //window.location.href = targetUrl;
        navigate(targetUrl, { state: { responseData: response.data, requestData } });
      } else {
        LOG.error(`[doActionFrm] 실패 응답: ${respMsg}`);
        alert(respMsg || "화면 이동 요청 실패");
      }
    } catch (error) {
      LOG.error("처리 중 오류 발생:", error);
      alert("처리 중 오류가 발생하였습니다.");
    }
  }, []);

  return (
    <ApplicationCommonContext.Provider
      value={{
        appMode,
        menuId,
        frameId,
        serverTime,
        ipAddr,
        hostUrl,
        errorProcess,
        logoutProcess,
        doAction,
        doActionFrm, // 추가된 함수
      }}
    >
      {children}
    </ApplicationCommonContext.Provider>
  );
};

// ✅ Custom Hook (useApplicationCommon)
export const useApplicationCommon = () => {
  return useContext(ApplicationCommonContext);
};
