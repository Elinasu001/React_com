import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "@assets/images/logo.svg";
import { GLog, useAppNavigator, doLogout, doIdLogin } from '@assets/js/common';
import { messageView } from '@src/components/Alert';


import { useAppSelector, useAppDispatch } from '@src/assets/js/redux/hooks';

const Header = () => {

  //리덕스 상태 관련
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const isLogin = !!user;  // 로그인 상태: user가 null이 아니면 로그인한 상태

  // 로그인 팝업 상태
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(""); // ID 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const navigator = useAppNavigator();


  // 로그인/로그아웃 버튼
  const handleOpen = async () => {
    //로그인 중일때는 로그아웃 처리
    if (isLogin){
      await doLogout(dispatch,navigate);
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

    const result = await doIdLogin(dispatch,id,password);
    
    if(result == 'OK'){
      handleClose(); // 로그인 성공 시 팝업 닫기
      navigator.doActionURL('/Mybanking.view');
    }else{

      messageView(result,"확인");
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
              {isLogin ? "로그아웃" : "로그인"} &gt;
            </Button>

            {/* 돋보기 아이콘 */}
            <IconButton edge="end" color="inherit" aria-label="검색" sx={{ fontSize: 28 }}>
                <SearchIcon fontSize="inherit" aria-hidden="true" />
              </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 로그인 팝업 */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          임시로그인
          <IconButton edge="end" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField label="ID" fullWidth margin="dense" variant="outlined" value={id} onChange={(e) => setId(e.target.value)}/>
          <TextField label="Password" type="password" fullWidth margin="dense" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
          <Button onClick={handleLogin} color="inherit">로그인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
