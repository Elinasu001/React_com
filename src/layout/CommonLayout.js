import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useApplicationCommon } from "../utils/ApplicationCommon";
import CommonHeader from "./CommonHeader"; // ✅ 공통 헤더 추가
import CommonFooter from "./CommonFooter"; // ✅ 공통 푸터 추가

const CommonLayout = ({ children }) => {
  const { serverTime, appMode } = useApplicationCommon();
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ 페이지 로드 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <meta name="keywords" content="GP, GnB소프텍, 퓨어솔루션, 스마트뱅킹, 저축은행" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* ✅ 공통 헤더 포함 */}
      <CommonHeader />

      {/* ✅ 오류 메시지 표시 */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* ✅ 하위 콘텐츠 렌더링 */}
      <main>{children}</main>

      {/* ✅ 공통 푸터 포함 */}
      <CommonFooter />
    </>
  );
};

export default CommonLayout;
