import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApplicationCommonProvider } from "./utils/ApplicationCommon";  
import Main from "./pages/Main";

function App() {
  return (
    <ApplicationCommonProvider> {/* ✅ Provider로 감싸기 */}
      <Router>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
      </Router>
    </ApplicationCommonProvider>
  );
}

export default App;
