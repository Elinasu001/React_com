// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@views/common/Layout";
import Main from "@views/Main";
import NativeTest from "@src/views/test/NativeTest";
import Test from "@src/views/test/Test";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="nativeTest.view" element={<NativeTest />} />
          <Route path="test.view" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;