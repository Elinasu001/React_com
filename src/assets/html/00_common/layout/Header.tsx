/**
 * @file Header.tsx
 * @description 공통 헤더 컴포넌트
 * @author
 * @version 1.0.0
 */

import { AppBar, Box, Toolbar, Typography } from "@mui/material";


const MainHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box className="header">
          <h1>main</h1>
          <Box className="btn-group">
            <button className="alarm">
              알람
              <span className="new"></span>
            </button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

interface SubHeaderProps {
  title?: string;
}

const SubHeader = ({ title = '타이틀' }: SubHeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box className="header sub">
            <Box className="btn-group">
              <button className="prev">이전버튼</button>
            </Box>
          <Typography>{title}</Typography>
          <Box className="btn-group">
              <button className="menu">메뉴</button>
            </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { MainHeader, SubHeader };
   