import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "@assets/images/logo.svg";
import { doActionURL, doLogout,GLog,IS_LOGIN} from '@assets/js/common';
import { loginPopup } from "@src/components/Popup";

const Header = () => {

  // 로그인/로그아웃 버튼
  const loginPopupOpen = async () => {
    //로그인 중일때는 로그아웃 처리
    if (IS_LOGIN()){
      doLogout();
    }
    //미 로그인시는 팝업 열기
    else{
      
      const login = await loginPopup();
      
      if(login.getBoolean("result")){
        doActionURL('/Mybanking.view');   
      }else{
        GLog.e('로그인 취소');
      }
    }
  };

  return (
    <>
      {/* 헤더 */}
      <AppBar position="fixed" color="inherit" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* 왼쪽 로고 */}
          <Box component="img" src={Logo} alt="Logo" sx={{ height: 20 }} />

          {/* 오른쪽 로그인 + 돋보기 아이콘 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* 로그인 버튼 (클릭 시 팝업 열림) */}
            <Button
              color="inherit"
              onClick={loginPopupOpen}
              sx={{
                fontFamily: "SCDream",
                fontWeight: 500, // SCDream5 적용
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              {IS_LOGIN() ? "로그아웃" : "로그인"} &gt;
            </Button>

            {/* 돋보기 아이콘 */}
            <IconButton edge="end" color="inherit" aria-label="검색" sx={{ fontSize: 28 }}>
                <SearchIcon fontSize="inherit" aria-hidden="true" />
              </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
