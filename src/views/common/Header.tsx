import { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "@assets/images/logo.svg";
import { GLog, doAction, makeForm, addFormData, useAppNavigator } from '@assets/js/common';
import { messageView } from '@src/components/Alert';
import { progressBar } from "@src/components/Loading";
import DataSet from '@src/assets/io/DataSet';

const Header = () => {
  // 로그인 팝업 상태
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(""); // ID 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const navigator = useAppNavigator();

  // 팝업 열기
  const handleOpen = () => {
    setOpen(true);
  };

  // 팝업 닫기
  const handleClose = () => {
    setOpen(false);
  };

   // 로그인 요청 함수
  const handleLogin = async () => {
    if (!id || !password) {
      messageView("아이디와 비밀번호를 입력하세요.", "확인");
      return;
    }

    const form = makeForm("COM0000SC");
    addFormData(form, "txGbnCd", "LOGIN");
    addFormData(form, "loginType", "I");
    addFormData(form, "USER_ID_12", id);
    addFormData(form, "USR_PWD", password);

    progressBar(true);

    try {
      const response = await doAction(form);
      progressBar(false);

      if (response.header.respCd !== "N00000" || response.data.getString("API_RS_MSG") !== "SUCEESS") {
        GLog.e("로그인 실패:", response.data.getString("API_RS_MSG"));
        messageView(`${response.data.getString("API_RS_MSG")}`, "확인");
        return;
      }

      const resData = new DataSet(response.data);

      if (resData) {
        messageView("로그인 성공!", "확인", () => {
          sessionStorage.setItem("custInfo", JSON.stringify(resData));          // 고객정보저장
          sessionStorage.setItem("loginTime", Date.now().toString());           // 현재시간저장
  
          // 고객정보 불러오기
          const storedCustInfo = new DataSet(JSON.parse(sessionStorage.getItem("custInfo") || "{}"));
          console.log(storedCustInfo);
          handleClose(); // 로그인 성공 시 팝업 닫기
          navigator.doActionURL('/Mybanking.view');
        });
      } else {
        messageView("로그인 정보가 없습니다.", "확인");
      }

    } catch (error) {
      GLog.e("로그인 중 오류 발생:", error);
      messageView("로그인 중 오류가 발생했습니다.", "확인");
      progressBar(false);
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
              로그인 &gt;
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
