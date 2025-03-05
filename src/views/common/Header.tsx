import { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "@assets/images/logo.svg";
import { doLogout, doActionURL, LoginType, doLogin, IS_LOGIN, GLog} from '@assets/js/common';
import { messageView } from '@src/components/Alert';
import DataSet from "@src/assets/io/DataSet";

const Header = () => {

  // 로그인 팝업 상태
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(""); // ID 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  GLog.d('IS_LOGIN : '+IS_LOGIN());
  // 로그인/로그아웃 버튼
  const handleOpen = async () => {
    //로그인 중일때는 로그아웃 처리
    if (IS_LOGIN()){
      doLogout();
    }
    //미 로그인시는 팝업 열기
    else{
      setOpen(true);
    }
  };

  // 팝업 닫기
  const handleClose = () => {
    setOpen(false);
  };

   // 로그인/로그아웃 버튼 이벤트
  const handleLogin = async () => {
    if (!id || !password) {
      messageView("아이디와 비밀번호를 입력하세요.", "확인");
      return;
    }

    //로그인 통신
    const loginResult = await doLogin(LoginType.ID,new DataSet({'ID':id,'PW':password}));
    
    //결과분기
    if(loginResult.result){
      handleClose(); // 로그인 성공 시 팝업 닫기
      doActionURL('/Mybanking.view');//메인페이지 이동
    }else{
      messageView(loginResult.msg,"확인");
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
              onClick={handleOpen}
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
