// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@views/common/Layout";
import PopupLayout from "@views/common/PopupLayout";
import Main from "@views/Main";
import NativeTest from "@src/views/test/NativeTest";
import Test from "@src/views/test/Test";
import BankingTest from "@src/views/test/BankingTest";

import InputTest from "@src/views/test/InputTest";
import Popup001 from "@src/views/popup/POPUP001";
        
// COM
import COM001 from "@src/views/com/COM001";
import COM004 from "@src/views/com/COM004";
import COM006 from "@src/views/com/COM006";
import COM011 from "@src/views/com/COM011";
import COM012 from "@src/views/com/COM012";

// EFC
import EFC001 from "@src/views/efc/TEMP_EFC001";
import EFC002 from "@src/views/efc/TEMP_EFC002";

import EFC008 from "@src/views/efc/EFC008";

// INQ
import Inq002 from "@src/views/inq/INQ002";

// LON
import LON001 from "@src/views/lon/LON001";


const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="nativeTest.view" element={<NativeTest />} />
          <Route path="test.view" element={<Test />} />
          <Route path="bankingTest.view" element={<BankingTest />} />
          <Route path="inputTest.view" element={<InputTest />} />
        </Route>


        <Route path="/efc">
          <Route path="EFC001.view" element={<EFC001 />} />
          <Route path="EFC002.view" element={<EFC002 />} />
          <Route path="EFC008.view" element={<EFC008 />} />
        </Route>
        
        <Route path="/inq">
          <Route path="Inq002.view" element={<Inq002 />} />
        </Route>
        
        <Route path="/com" element={<PopupLayout />}>
          <Route path="COM001.view" element={<COM001 />} />
          <Route path="COM004.view" element={<COM004 />} />
          <Route path="COM006.view" element={<COM006 />} />
          <Route path="COM011.view" element={<COM011 />} />
          <Route path="COM012.view" element={<COM012 />} />
        </Route>

        <Route path="/lon">
          <Route path="LON001.view" element={<LON001 />} />
        </Route>

        <Route path="/popup">
          <Route path="popup001.view" element={<Popup001 />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;