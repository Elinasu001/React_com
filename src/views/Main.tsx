import { Typography } from "@mui/material";
import NativeUtil from '@assets/js/common_native'

const Main = () => {
  return (
    <Typography variant="h4" gutterBottom>
      메인 컨텐츠 영역
    </Typography>
  );
};

export default Main;

//네이티브 브릿지
(window as any).NativeUtil = NativeUtil