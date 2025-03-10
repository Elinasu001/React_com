// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

// [메인]
import BankingTest from "@src/views/test/BankingTest";
import CheckboxUI from "@src/views/test/CheckboxUI";
import InputTest from "@src/views/test/InputTest";
import InputUI from "@src/views/test/InputUI";
import NativeTest from "@src/views/test/NativeTest";
import Test from "@src/views/test/Test";
import Layout from "@views/common/Layout";
import Main from "@views/Main";
import Mybanking from "@views/Mybanking";

// INQ[조회]
import INQ001 from "@src/views/inq/INQ001";
import INQ002 from "@src/views/inq/INQ002";

// TNF[이체]
import TNF001 from "@src/views/tnf/TNF001";
import TNF002 from "@src/views/tnf/TNF002";
import TNF003 from "@src/views/tnf/TNF003";
import TNF004 from "@src/views/tnf/TNF004";
import TNF005 from "@src/views/tnf/TNF005";

// DEP[수신]
import DEP001 from "@src/views/dep/DEP001";
import DEP001_2 from "@src/views/dep/DEP001_2";
import DEP002 from "@src/views/dep/DEP002";
import DEP003 from "@src/views/dep/DEP003";
import DEP004 from "@src/views/dep/DEP004";
import DEP005 from "@src/views/dep/DEP005";
import DEP006 from "@src/views/dep/DEP006";

// LON[여신]
import LON001_1 from "@src/views/lon/LON001_1";
import LON001_2 from "@src/views/lon/LON001_2";
import LON001_3 from "@src/views/lon/LON001_3";
import LON002_1 from "@src/views/lon/LON002_1";
import LON002_2 from "@src/views/lon/LON002_2";
import LON003_1 from "@src/views/lon/LON003_1";
import LON003_2 from "@src/views/lon/LON003_2";
import LON004 from "@src/views/lon/LON004";
import LON005 from "@src/views/lon/LON005";
import LON006 from "@src/views/lon/LON006";
import LON007 from "@src/views/lon/LON007";
import LON008 from "@src/views/lon/LON008";
import LON009 from "@src/views/lon/LON009";

// EFC[전자금융관리]
import EFC001 from "@src/views/efc/EFC001";
import EFC002 from "@src/views/efc/EFC002";
import EFC003 from "@src/views/efc/EFC003";
import EFC004 from "@src/views/efc/EFC004";
import EFC005 from "@src/views/efc/EFC005";
import EFC006 from "@src/views/efc/EFC006";
import EFC007 from "@src/views/efc/EFC007";
import EFC008 from "@src/views/efc/EFC008";
import EFC008_1 from "@src/views/efc/EFC008_1";
import EFC009 from "@src/views/efc/EFC009";
import EFC010 from "@src/views/efc/EFC010";
import EFC011 from "@src/views/efc/EFC011";
import EFC012 from "@src/views/efc/EFC012";
import EFC013 from "@src/views/efc/EFC013";
import EFC014 from "@src/views/efc/EFC014";



//원본
import HTML_Footer from "@src/assets/html/00_common/Footer";
import HTML_Header from "@src/assets/html/00_common/Header";
import HTML_Layout from "@src/assets/html/00_common/Layout";
import HTML_Menu from "@src/assets/html/00_common/Menu";
import HTML_Popup_page from "@src/assets/html/00_common_page/Popup_page";
import HTML_MAIN000 from "@src/assets/html/00_main/MAIN000";
import HTML_MAIN001 from "@src/assets/html/00_main/MAIN001";
import HTML_POP001 from "@src/assets/html/00_pop/POP001";
import HTML_POP002 from "@src/assets/html/00_pop/POP002";
import HTML_POP003 from "@src/assets/html/00_pop/POP003";
import HTML_COM001 from "@src/assets/html/01_com/COM001";
import HTML_COM002 from "@src/assets/html/01_com/COM002";
import HTML_COM003 from "@src/assets/html/01_com/COM003";
import HTML_COM004_1 from "@src/assets/html/01_com/COM004_1";
import HTML_COM004_2 from "@src/assets/html/01_com/COM004_2";
import HTML_COM005 from "@src/assets/html/01_com/COM005";
import HTML_COM006 from "@src/assets/html/01_com/COM006";
import HTML_COM007 from "@src/assets/html/01_com/COM007";
import HTML_COM008 from "@src/assets/html/01_com/COM008";
import HTML_COM009 from "@src/assets/html/01_com/COM009";
import HTML_COM010 from "@src/assets/html/01_com/COM010";
import HTML_COM011 from "@src/assets/html/01_com/COM011";
import HTML_COM012 from "@src/assets/html/01_com/COM012";
import HTML_INQ001 from "@src/assets/html/02_inq/INQ001";
import HTML_INQ002 from "@src/assets/html/02_inq/INQ002";
import HTML_TNF001 from "@src/assets/html/03_tnf/TNF001";
import HTML_TNF002 from "@src/assets/html/03_tnf/TNF002";
import HTML_TNF003 from "@src/assets/html/03_tnf/TNF003";
import HTML_TNF004 from "@src/assets/html/03_tnf/TNF004";
import HTML_TNF005 from "@src/assets/html/03_tnf/TNF005";
import HTML_DEP001 from "@src/assets/html/04_dep/DEP001";
import HTML_DEP002 from "@src/assets/html/04_dep/DEP002";
import HTML_DEP003 from "@src/assets/html/04_dep/DEP003";
import HTML_DEP004 from "@src/assets/html/04_dep/DEP004";
import HTML_DEP005 from "@src/assets/html/04_dep/DEP005";
import HTML_DEP006 from "@src/assets/html/04_dep/DEP006";
import HTML_LON001_1 from "@src/assets/html/05_lon/LON001_1";
import HTML_LON001_2 from "@src/assets/html/05_lon/LON001_2";
import HTML_LON001_3 from "@src/assets/html/05_lon/LON001_3";
import HTML_LON002_1 from "@src/assets/html/05_lon/LON002_1";
import HTML_LON002_2 from "@src/assets/html/05_lon/LON002_2";
import HTML_LON003 from "@src/assets/html/05_lon/LON003";
import HTML_LON004 from "@src/assets/html/05_lon/LON004";
import HTML_LON005 from "@src/assets/html/05_lon/LON005";
import HTML_LON006 from "@src/assets/html/05_lon/LON006";
import HTML_LON007 from "@src/assets/html/05_lon/LON007";
import HTML_LON008 from "@src/assets/html/05_lon/LON008";
import HTML_LON009 from "@src/assets/html/05_lon/LON009";
import HTML_EFC001 from "@src/assets/html/06_efc/EFC001";
import HTML_EFC002 from "@src/assets/html/06_efc/EFC002";
import HTML_EFC003 from "@src/assets/html/06_efc/EFC003";
import HTML_EFC004 from "@src/assets/html/06_efc/EFC004";
import HTML_EFC005 from "@src/assets/html/06_efc/EFC005";
import HTML_EFC006 from "@src/assets/html/06_efc/EFC006";
import HTML_EFC007 from "@src/assets/html/06_efc/EFC007";
import HTML_EFC008 from "@src/assets/html/06_efc/EFC008";
import HTML_EFC008_1 from "@src/assets/html/06_efc/EFC008_1";
import HTML_EFC009 from "@src/assets/html/06_efc/EFC009";
import HTML_EFC010 from "@src/assets/html/06_efc/EFC010";
import HTML_EFC011 from "@src/assets/html/06_efc/EFC011";
import HTML_EFC012 from "@src/assets/html/06_efc/EFC012";
import HTML_EFC013 from "@src/assets/html/06_efc/EFC013";
import HTML_EFC014 from "@src/assets/html/06_efc/EFC014";
import HTML_Worklist from "@src/assets/html/work/Worklist";




// 확장 함수
import "@assets/extension/globalExtensions";
import NativeUtil from "@assets/js/common_native";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인,테스트 페이지 라우트 */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="Mybanking.view" element={<Mybanking/>} />
          <Route path="nativeTest.view" element={<NativeTest />} />
          <Route path="test.view" element={<Test />} />
          <Route path="bankingTest.view" element={<BankingTest />} />
          <Route path="inputTest.view" element={<InputTest />} />
          <Route path="inputUI.view" element={<InputUI />} />
          <Route path="CheckboxUI.view" element={<CheckboxUI />} />
          <Route path="Worklist.view" element={<HTML_Worklist />} />
        </Route>

        {/* 조회 페이지 라우트 */}
        <Route path="/inq" element={<Layout />}>
          <Route path="INQ001.view" element={<INQ001 />} />
          <Route path="INQ002.view" element={<INQ002 />} />
        </Route>

        {/* 이체 페이지 라우트 */}
        <Route path="/tnf" element={<Layout />}>
          <Route path="TNF001.view" element={<TNF001 />} />
          <Route path="TNF002.view" element={<TNF002 />} />
          <Route path="TNF003.view" element={<TNF003 />} />
          <Route path="TNF004.view" element={<TNF004 />} />
          <Route path="TNF005.view" element={<TNF005 />} />
        </Route>

        {/* 수신 페이지 라우트 */}
        <Route path="/dep" element={<Layout />}>
          <Route path="DEP001.view" element={<DEP001 />} />
          <Route path="DEP001_2.view" element={<DEP001_2 />} />
          <Route path="DEP002.view" element={<DEP002 />} />
          <Route path="DEP003.view" element={<DEP003 />} />
          <Route path="DEP004.view" element={<DEP004 />} />
          <Route path="DEP005.view" element={<DEP005 />} />
          <Route path="DEP006.view" element={<DEP006 />} />
        </Route>

        {/* 여신 페이지 라우트 */}
        <Route path="/lon" element={<Layout />}>
          <Route path="LON001_1.view" element={<LON001_1 />} />
          <Route path="LON001_2.view" element={<LON001_2 />} />
          <Route path="LON001_3.view" element={<LON001_3 />} />
          <Route path="LON002_1.view" element={<LON002_1 />} />
          <Route path="LON002_2.view" element={<LON002_2 />} />
          <Route path="LON003_1.view" element={<LON003_1 />} />
          <Route path="LON003_2.view" element={<LON003_2 />} />
          <Route path="LON004.view" element={<LON004 />} />
          <Route path="LON005.view" element={<LON005 />} />
          <Route path="LON006.view" element={<LON006 />} />
          <Route path="LON007.view" element={<LON007 />} />
          <Route path="LON008.view" element={<LON008 />} />
          <Route path="LON009.view" element={<LON009 />} />
        </Route>

        {/* 전자금융뱅킹 페이지 라우트 */}
        <Route path="/efc" element={<Layout />}>
          <Route path="EFC001.view" element={<EFC001 />} />
          <Route path="EFC002.view" element={<EFC002 />} />
          <Route path="EFC003.view" element={<EFC003 />} />
          <Route path="EFC004.view" element={<EFC004 />} />
          <Route path="EFC005.view" element={<EFC005 />} />
          <Route path="EFC006.view" element={<EFC006 />} />
          <Route path="EFC007.view" element={<EFC007 />} />
          <Route path="EFC008.view" element={<EFC008 />} />
          <Route path="EFC008_1.view" element={<EFC008_1 />} />
          <Route path="EFC009.view" element={<EFC009 />} />
          <Route path="EFC010.view" element={<EFC010 />} />
          <Route path="EFC011.view" element={<EFC011 />} />
          <Route path="EFC012.view" element={<EFC012 />} />
          <Route path="EFC013.view" element={<EFC013 />} />
          <Route path="EFC014.view" element={<EFC014 />} />
        </Route>


        {/* 퍼블 */}
        <Route path="/html">
          <Route path="COM008.html" element={<HTML_COM008 />} />
          <Route path="COM009.html" element={<HTML_COM009 />} />
          <Route path="COM007.html" element={<HTML_COM007 />} />
          <Route path="COM004_1.html" element={<HTML_COM004_1 />} />
          <Route path="COM006.html" element={<HTML_COM006 />} />
          <Route path="COM012.html" element={<HTML_COM012 />} />
          <Route path="COM010.html" element={<HTML_COM010 />} />
          <Route path="COM004_2.html" element={<HTML_COM004_2 />} />
          <Route path="COM011.html" element={<HTML_COM011 />} />
          <Route path="COM005.html" element={<HTML_COM005 />} />
          <Route path="COM001.html" element={<HTML_COM001 />} />
          <Route path="COM002.html" element={<HTML_COM002 />} />
          <Route path="COM003.html" element={<HTML_COM003 />} />
          <Route path="MAIN000.html" element={<HTML_MAIN000 />} />
          <Route path="MAIN001.html" element={<HTML_MAIN001 />} />
          <Route path="LON009.html" element={<HTML_LON009 />} />
          <Route path="LON001_1.html" element={<HTML_LON001_1 />} />
          <Route path="LON008.html" element={<HTML_LON008 />} />
          <Route path="LON001_2.html" element={<HTML_LON001_2 />} />
          <Route path="LON001_3.html" element={<HTML_LON001_3 />} />
          <Route path="LON002_1.html" element={<HTML_LON002_1 />} />
          <Route path="LON002_2.html" element={<HTML_LON002_2 />} />
          <Route path="LON003.html" element={<HTML_LON003 />} />
          <Route path="LON006.html" element={<HTML_LON006 />} />
          <Route path="LON007.html" element={<HTML_LON007 />} />
          <Route path="LON005.html" element={<HTML_LON005 />} />
          <Route path="LON004.html" element={<HTML_LON004 />} />
          <Route path="DEP005.html" element={<HTML_DEP005 />} />
          <Route path="DEP004.html" element={<HTML_DEP004 />} />
          <Route path="DEP006.html" element={<HTML_DEP006 />} />
          <Route path="DEP003.html" element={<HTML_DEP003 />} />
          <Route path="DEP002.html" element={<HTML_DEP002 />} />
          <Route path="DEP001.html" element={<HTML_DEP001 />} />
          <Route path="EFC008.html" element={<HTML_EFC008 />} />
          <Route path="EFC009.html" element={<HTML_EFC009 />} />
          <Route path="EFC007.html" element={<HTML_EFC007 />} />
          <Route path="EFC013.html" element={<HTML_EFC013 />} />
          <Route path="EFC012.html" element={<HTML_EFC012 />} />
          <Route path="EFC006.html" element={<HTML_EFC006 />} />
          <Route path="EFC010.html" element={<HTML_EFC010 />} />
          <Route path="EFC004.html" element={<HTML_EFC004 />} />
          <Route path="EFC008_1.html" element={<HTML_EFC008_1 />} />
          <Route path="EFC005.html" element={<HTML_EFC005 />} />
          <Route path="EFC011.html" element={<HTML_EFC011 />} />
          <Route path="EFC001.html" element={<HTML_EFC001 />} />
          <Route path="EFC014.html" element={<HTML_EFC014 />} />
          <Route path="EFC002.html" element={<HTML_EFC002 />} />
          <Route path="EFC003.html" element={<HTML_EFC003 />} />
          <Route path="TNF001.html" element={<HTML_TNF001 />} />
          <Route path="TNF003.html" element={<HTML_TNF003 />} />
          <Route path="TNF002.html" element={<HTML_TNF002 />} />
          <Route path="TNF005.html" element={<HTML_TNF005 />} />
          <Route path="TNF004.html" element={<HTML_TNF004 />} />
          <Route path="INQ001.html" element={<HTML_INQ001 />} />
          <Route path="INQ002.html" element={<HTML_INQ002 />} />
          <Route path="POP002.html" element={<HTML_POP002 />} />
          <Route path="POP003.html" element={<HTML_POP003 />} />
          <Route path="POP001.html" element={<HTML_POP001 />} />
          <Route path="Footer.html" element={<HTML_Footer />} />
          <Route path="Layout.html" element={<HTML_Layout />} />
          <Route path="Header.html" element={<HTML_Header />} />
          <Route path="Menu.html" element={<HTML_Menu />} />
          <Route path="Popup_page.html" element={<HTML_Popup_page />} />
          <Route path="Worklist.html" element={<HTML_Worklist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

//네이티브 호출용 함수 추가
(window as any).NativeUtil = NativeUtil;

export default App;
