import { useEffect, useState } from "react";
import useNativeBridge from "./NativeBridge"; // ✅ useNativeBridge 가져오기

// ✅ 공통 로깅 함수
const LOG = {
  debug: (message) => console.log("[DEBUG]:" + message),
  info: (message) => console.log("[INFO]:" + message),
  error: (message) => console.log("[ERROR]:" + message),
};

// ✅ 공통 Hook 정의
const useCommon = (systemMode, pushNotiYn) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIPhone, setIsIPhone] = useState(false);
  const [motpYn, setMotpYn] = useState("");
  const [smartAuthYn, setSmartAuthYn] = useState("");

  // ✅ useNativeBridge에서 필요한 함수 가져오기
  const { getAppData } = useNativeBridge();

  useEffect(() => {
    const mobileDevices = ["Android", "iPhone", "iPod", "iPad", "BlackBerry"];
    const isMobileDevice = mobileDevices.some((device) => navigator.userAgent.includes(device));
  
    setIsMobile(isMobileDevice);
    setIsIPhone(navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad"));
  
    console.log(`[useCommon] :: IS_MOBILE [${isMobileDevice}] IS_IPHONE [${navigator.userAgent.includes("iPhone")}]`);
  }, []); 

  // ✅ 디바이스 정보 조회 (getAppData 사용)
  const deviceAppDataInq = (callbackFunc) => {
    if (typeof getAppData !== "function") {
      LOG.error("❌ getAppData 함수가 정의되지 않았거나 함수가 아닙니다.");
      return;
    }

    getAppData(["mOTP", "smartAuth", "appVersion", "custNo"], (appResDs) => {
      if (appResDs?.params) {
        setMotpYn(appResDs.params.mOTP || "N");
        setSmartAuthYn(appResDs.params.smartAuth || "N");
        if (callbackFunc) {
          callbackFunc(appResDs);
        }
      }
    });
  };

  return { isMobile, isIPhone, motpYn, smartAuthYn, deviceAppDataInq };
};

export default useCommon;
