import { Typography } from "@mui/material";
import NativeUtil from '@assets/js/common_native'
import MobileAuth from "./com/Com001"
import { useState } from "react";
import { Button, Box } from "@mui/material";

const Main = () => {

  const [isAuthOpen, setAuthOpen] = useState(false);
  const handleOpenAuth = () => {
    setAuthOpen(true);
  };
  const handleCloseAuth = () => {
    setAuthOpen(false);
  };


  return (
    <> 
    <Typography variant="h4" gutterBottom>
      메인 컨텐츠 영역
    </Typography>

    <Button variant="contained" color="primary" onClick={handleOpenAuth}>
    본인인증 열기
    </Button>


    <MobileAuth isOpen={isAuthOpen} onClose={handleCloseAuth} />
    </> 
  );
};

export default Main;

//네이티브 브릿지
(window as any).NativeUtil = NativeUtil