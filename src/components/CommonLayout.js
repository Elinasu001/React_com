import { Helmet } from "react-helmet-async";
import { useEffect, useState, useCallback } from "react";


const CommonLayout = ({ serverTime, appMode, menuId, frameId, ipAddr, errorProcess, logoutProcess, children }) => {
  const memoizedErrorProcess = useCallback(errorProcess, []);

  // ✅ 오류 메시지 상태 추가
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Native 관련 기능 적용
  useEffect(() => {
    window.scrollTo({ top:0, left:0 });                   // 스크롤 초기화
    if (errorProcess) {
      const errorMsg = errorProcess();
      console.log('[errorMsg] :', errorMsg);
      if (errorMsg) setErrorMessage(errorMsg);
    }
  }, [memoizedErrorProcess]);

  

  return (
    <>
      <Helmet>
      <meta name="keywords" content="SI, SM, ASP, 스탁론, NPL, 온라인대출, FEP, 중소형금융기관, 코어뱅킹시스템, 스마트뱅킹, 금융it, 개발자" />
      </Helmet>

      {/* ✅ 오류 메시지 표시 */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* ✅ `MainPage` 같은 하위 콘텐츠가 렌더링될 부분 */}
      <main>{children}</main>
    </>
  );
};

export default CommonLayout;
