/**
 * @file EFC014.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Worklist = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // App.tsx에 정의된 라우트 경로로 이동
    navigate("/html/Layout.html");
  };

  return (
    <Button onClick={handleClick}>
      test
    </Button>
  );
};

export default Worklist;