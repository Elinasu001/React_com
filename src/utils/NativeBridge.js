import { useEffect } from "react";

const useNativeBridge = () => {
  const isDevice = () => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const callNative = (message) => {
    try {
      const jsonMessage = JSON.stringify(message);
      console.log("📲 callNative:", jsonMessage);

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.gnb.postMessage(jsonMessage);
      } else if (/Android/i.test(navigator.userAgent)) {
        window.gnb[message.cmd](jsonMessage);
      }
    } catch (e) {
      console.error("❌ Native 통신 에러:", e);
    }
  };

  const makeMessage = (cmd, params = {}, callback) => {
    return {
      callback: "nativeCallbackHandler",
      cmd,
      ...params,
    };
  };

  const appClose = () => {
    if (!isDevice()) return;
    callNative(makeMessage("appClose"));
  };

  const setAppData = (data) => {
    if (!isDevice()) return;
    callNative(makeMessage("setLocalStorage", { data }));
  };

  const getAppData = (keys, callback) => {
    if (!isDevice()) return;
    callNative(makeMessage("getLocalStorage", { keys }, callback));
  };

  const getDeviceInfo = (callback) => {
    if (!isDevice()) return;
    callNative(makeMessage("getDeviceInfo", {}, callback));
  };

  const showToast = (msg) => {
    if (!isDevice()) return;
    callNative(makeMessage("showToast", { msg }));
  };

  const showNotification = (title, msg) => {
    if (!isDevice()) return;
    callNative(makeMessage("showNotification", { title, msg }));
  };

  // 백그라운드에서 앱이 포어그라운드로 올라왔을 때
  useEffect(() => {
    window.nativeCallbackHandler = (data) => {
      console.log("📲 Native Callback:", data);
    };

    return () => {
      delete window.nativeCallbackHandler;
    };
  }, []);

  return {
    isDevice,
    callNative,
    makeMessage,
    appClose,
    setAppData,
    getAppData,
    getDeviceInfo,
    showToast,
    showNotification,
  };
};

export default useNativeBridge;
