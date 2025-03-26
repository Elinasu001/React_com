/**
 * @file Header.tsx
 * @description 공통 헤더 컴포넌트
 * @author
 * @version 1.0.0
 */

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ButtonContent } from "@src/assets/html/00_common/Button";



const MainFotter = () => {
  return (
      <Box component="section" className="btmWrap">
            
      </Box>
  );
};

const BtnFotter = () => {
  return (
      <Box component="section" className="btmWrap">
           <ButtonContent name="확인" />
    </Box>
  );
};

export { MainFotter, BtnFotter };
   