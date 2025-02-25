// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@views/common/Layout";
import Main from "@views/Main";
import NativeTest from "@src/views/test/NativeTest";
import Test from "@src/views/test/Test";
import BankingTest from "@src/views/test/BankingTest";
import Popup001 from "@src/views/popup/Popup001";


const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="nativeTest.view" element={<NativeTest />} />
          <Route path="test.view" element={<Test />} />
          <Route path="bankingtest.view" element={<BankingTest />} />
        </Route>


        <Route path="/popup">
          <Route path="popup001.view" element={<Popup001 />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;