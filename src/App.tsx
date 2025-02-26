// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@views/common/Layout";
import PopupLayout from "@views/common/PopupLayout";
import Main from "@views/Main";
import NativeTest from "@src/views/test/NativeTest";
import Test from "@src/views/test/Test";
import BankingTest from "@src/views/test/BankingTest";

import InputTest from "@src/views/test/InputTest";
import Com001 from "@src/views/com/Com001";
import COM011 from "@src/views/com/COM011";
import COM012 from "@src/views/com/COM012";



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
        </Route>
        
        <Route path="/inq">
        </Route>
        
        <Route path="/com" element={<PopupLayout />}>
          <Route path="com001.view" element={<Com001 />} />
          <Route path="com011.view" element={<COM011 />} />
          <Route path="com012.view" element={<COM012 />} />
        </Route>

        <Route path="/popup">
        </Route>

      </Routes>
    </Router>
  );
};

export default App;