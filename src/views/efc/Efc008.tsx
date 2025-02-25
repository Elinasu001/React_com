import { Box, Typography, TextField, List, ListItem, ListItemText, Divider } from "@mui/material";


const Efc008 = () => {
  return (

    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3}}> {/* 타이틀 위치 조정 */}

        {/* 페이지 메인 제목 */}
        <Typography variant="h5" sx={{ marginBottom: 3 }}>이체한도관리</Typography>

            <Box 
                sx={{
                    border: "1px solid black",  
                    borderRadius: "12px",       
                    padding: "25px",     
                }}>
                    
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>{/* gap: 2 -> box간 거리 조절*/}

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid lightgray", pb:"20px", width: "100%" }}>
                        <Typography>1회 이체한도</Typography>
                        <TextField
                            variant="standard"
                            type="number"
                            defaultValue={500000} // 해당 계좌의 1회 이체한도 받아와야 함
                            sx={{ flexGrow: 1, width: "150px", textAlign: "right" }}
                            inputProps={{ style: { textAlign: "right", fontWeight: "bold" } }}
                            InputProps={{ disableUnderline: true, readOnly: true }} // standard 아래 라인 없애기, 읽기 전용
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Typography>1일 이체한도</Typography>
                        <TextField
                            variant="standard"
                            type="number"
                            defaultValue={1000000} // 해당 계좌의 1일 이체한도 받아와야 함
                            sx={{ flexGrow: 1, width: "150px", textAlign: "right" }}
                            inputProps={{ style: { textAlign: "right", fontWeight: "bold" } }}
                            InputProps={{ disableUnderline: true, readOnly: true }} // standard 아래 라인 없애기, 읽기 전용
                        />
                    </Box>

                </Box>

            </Box>

            <Box sx={{ textAlign: "start"}}> {/* 타이틀 위치 조정 */}

                <Typography variant="h6" sx={{ mb: 1, mt: 3, fontWeight: "bold" }}>변경이체한도</Typography>

                {/* 변경이체한도 - 1회 이체한도 */}
                <Box sx={{ mb: 3 }}> {/* 1일 이체한도 box와 아래 여백 3 */}
                    <Typography variant="body1" sx={{color : "gray"}}>1회 이체한도</Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TextField
                            variant="standard"
                            type="number"
                            placeholder="1회이체한도입력"
                            // sx={{ width: "100%" }}
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-input::placeholder": {
                                color: "lightgray"
                                },
                            }}
                            inputProps={{ style: { textAlign: "left", fontWeight: "bold", color: "lightgray" }, }}
                        />
                        
                        <Typography sx={{ fontWeight: "bold" }}>원</Typography>
                    </Box>
                </Box>

                {/* 변경이체한도 - 1일 이체한도 */}
                <Box sx={{ mb: 7 }}> {/* 보안매체에 따른 최대 이체한도 box와 아래 여백 7 */}
                    <Typography variant="body1" sx={{color : "gray"}}>1일 이체한도</Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TextField
                            variant="standard"
                            type="number"
                            placeholder="1일이체한도입력"
                            // sx={{ width: "100%" }}
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-input::placeholder": {
                                color: "lightgray"
                                },
                            }}
                            inputProps={{ style: { textAlign: "left", fontWeight: "bold", color: "black" }, }}
                        />
                        <Typography sx={{ fontWeight: "bold" }}>원</Typography>
                    </Box>
                </Box>

            </Box>
            
            {/* 보안매체에 따른 최대 이체한도 */}
            <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "start"}}>

                <Typography variant="h6" sx={{ fontWeight: "bold" }}>보안매체에 따른 최대 이체한도</Typography>

                <List sx={{ listStyleType: "disc", pl: 2 }}>
                    
                    {/* OTP */}
                    <ListItem sx={{ display: "list-item", pl: 0 }}>
                    <Typography sx={{ fontWeight: "bold"}}>OTP</Typography>
                    </ListItem>
                    <Typography variant="body2" color="textSecondary" sx={{ }}>1일 5억원, 1회 1억원</Typography>

                    {/* 보안카드/mOTP */}
                    <ListItem sx={{ display: "list-item", pl: 0 }}>
                    <Typography sx={{ fontWeight: "bold" }}>보안카드/mOTP</Typography>
                    </ListItem>
                    <Typography variant="body2" color="textSecondary" sx={{ }}>1일 5천만원, 1회 1천만원</Typography>

                    {/* 보안카드/mOTP+SMS */}
                    <ListItem sx={{ display: "list-item", pl: 0 }}>
                    <Typography sx={{ fontWeight: "bold" }}>보안카드/mOTP+SMS</Typography>
                    </ListItem>
                    <Typography variant="body2" color="textSecondary" sx={{ }}>1일 2억5천만원, 1회 5천만원</Typography>

                </List>
            </Box>

            <Divider sx={{ borderColor: "lightgray", borderBottomWidth: 1, my: 3 }} /> {/* my값에 따라 구분선 기준 위아래 여백 */}

            {/* 알아두세요 */}
            <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "start"}}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>알아두세요</Typography>

                <List sx={{ listStyleType: "disc", pl: 2 }}>
                    
                    <ListItem sx={{ display: "list-item", pl: 0 }}>{/* pl: 0 listStyle :disc의 기본마커와 text의 거리 */}
                    <Typography variant="body2" color="textSecondary">비대면한도 계좌 또는 금융거래한도제한계좌 등 계좌별 제한이 있는 경우 이체한도가 제한돼요
                    </Typography>
                    </ListItem>

                    <ListItem sx={{ display: "list-item", pl: 0 }}>
                    <Typography variant="body2" color="textSecondary">인터넷뱅킹과 텔레뱅킹 서비스도 함께 적용돼요</Typography>
                    </ListItem>

                </List>

            </Box>
    </Box>

  );
};

export default Efc008;
