/**
 * @fileoverview [공통] 푸터 하단 메뉴 화면면
 *
 * @file Footer.tsx
 * @author GNB
 * @version 1.0.0
 */
import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@views/common/Menu"
import { bottomNavHeight, doActionURL, IS_LOGIN } from "@assets/js/common"

const BottomNav = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: bottomNavHeight }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="홈"
          onClick={() => {
            if(IS_LOGIN()){
              doActionURL('/Mybanking.view');
            }else{
              doActionURL('/');
            }
          }}
          icon={<HomeIcon />}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <BottomNavigationAction
          label="대출"
          onClick={() => {
            doActionURL('/lon/LON001_1.view',false);
          }}
          icon={<AttachMoneyIcon />}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <BottomNavigationAction
          label="예/적금"
          onClick={() => {
            doActionURL('/dep/DEP001.view');
          }}
          icon={<SavingsIcon />}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <BottomNavigationAction
          label="전체메뉴"
          icon={<MenuIcon />}
          onClick={() => setMenuOpen(true)} // 여기서 바로 메뉴 열기
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </BottomNavigation>
    </Paper>
  );
};
export default BottomNav;