/**
 * @fileoverview [전자금융관리] 
 *
 * @author 
 * @version 1.0.0
 */

import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";


// common
import { addFormData, doAction, getCustDs, getParameter, GLog, IS_LOGIN, makeForm } from "@src/assets/js/common";

// components
import { messageView } from '@src/components/Alert';
import { MainBox, Box01 } from "@src/components/Box";
import { Button01 } from "@src/components/Button";
import { progressBar } from "@src/components/Loading"
import { TextBox01 } from "@src/components/Text";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Card, CardContent, Box, Typography, Button, IconButton, Switch, List, ListItem, ListItemText, Tooltip } from "@mui/material";

// icon
import StarBorderIcon from "@mui/icons-material/StarBorder";    // 즐겨찾기 아이콘
import ContentCopyIcon from "@mui/icons-material/ContentCopy";  // 복사 아이콘
import { openBottomPopup } from "@src/components/Popup";
import POP004 from "../pop/POP004";


const EFC004 = () => {

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 로그인 사용자 정보 가져오기
  const user = getCustDs(); 
  
  // EFC001(전계좌조회)화면에서 넘겨받은 param
  const param = getParameter(useLocation());

  // 대표계좌설정 상태
  const [isRepAccount, setIsRepAccount] = useState(false);

  // 출금중지설정 상태
  const [isWithdrawLimit, setIsWithdrawLimit] = useState(false);

  // 계좌별칭 상태
  const [nickName, setNickName] = useState("");

  // 즐겨찾기 상태
  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteButtonRef = useRef<HTMLButtonElement | null>(null);


  // 최초 진입시
  useEffect(() => {

    // 로그인 여부 확인
    if(!IS_LOGIN()){
      messageView("로그인이 필요합니다.", "확인", () => navigate("/"));
      return;
    }

    fetchFavoriteStatus();

  }, []);

  const fetchFavoriteStatus = async (obj?: any, als?: string) => {
      let txGbnCd = ""; // 거래구분코드 I.조회 R.등록 D.삭제
      let msgTxt = "";
    
      // 폼 생성
      const form = makeForm("EFC0004SC");
    
      if (!obj) {
        GLog.d("obj □■□■□■□■□■□■ " + obj);
        txGbnCd = "I";
      } else {
        if (!als) {
          als = "";
          if (isFavorite) {
            txGbnCd = "D";
            msgTxt = "해제";
          } else {
            txGbnCd = "R"; 
            msgTxt = "등록";
          }
        } else {
          txGbnCd = "R";
          msgTxt = "별칭 설정";
          addFormData(form, "ALS", als);  // 별칭
        }
      }
    
      // 폼 데이터 설정
      addFormData(form, "txGbnCd", txGbnCd);  // 거래구분코드
      addFormData(form, "MNRC_BANK", "049");  // 입금은행코드
      addFormData(form, "DEPR_NM_20", user?.USER_NM||"");       // 예금주명
      addFormData(form, "MNRC_ACCO", param.getString("acno"));  // 입금계좌번호

      // 로딩 ON
      progressBar(true, "통신중");

      try {
        const response = await doAction(form);

        // 로딩 OFF
        progressBar(false);
  
        // 서버 통신 실패시 return
        if (response.header.respCd !== "N00000") {
          messageView(`실패: ${response.header.respMsg}`, "확인");
          return;
        }
  
        // 서버와 통신으로 받아온 데이터
        const resData = response.data;

        if(txGbnCd === "R"){
          setNickName(als||"");
        } else {
          if (Array.isArray(resData?.REC) && resData.REC.length > 0) {
            setNickName(resData.REC[0].ACCO_ALS);
          }
        }
        
        GLog.d("nickName □■□■□■□■□■□■ " + nickName);
        

        // 조회
        if(txGbnCd === "I"){

          // 해당 계좌가 즐겨찾기 여부
          if (txGbnCd === "I" && Array.isArray(resData.REC)) {
            const isFav = resData.REC.some((rec: any) => rec.WB_ACNO === param.getString("acno"));
            setIsFavorite(isFav);
            GLog.d("isFavorite □■□■□■□■□■□■ " + isFavorite);
          }

        } else {

          var msg = resData.API_RS_MSG;
          if (msg === "SUCCESS") {

            if (als !== undefined) {
              setIsFavorite(true);
            }

            if(txGbnCd === "D" && isFavorite){
              setIsFavorite(false);
            }
            
            // 성공메세지 노출
            messageView("자주쓰는계좌를 "+ msgTxt +" 했어요");
            
          } else {
            messageView(" 조회 중 오류 발생", "확인");
            console.error(" 조회 오류:", msg);
          }

        }
      } catch (error) {
        messageView(" 조회 중 오류 발생", "확인");
        console.error(" 조회 오류:", error);
      }
    };
    
  return (
    <MainBox>
      <Box01>
        {/* 화면 타이틀 */}
        <TextBox01 text="계좌 관리"></TextBox01>

        <Card sx={{ borderRadius: "12px", p: 2, boxShadow: 2 }}>
          <CardContent>
            {/* 상단 영역 (입출금 타입 & 즐겨찾기 아이콘) */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography>
                {param.getString("type") === "1" && "입출금"}
                {param.getString("type") === "2" && "정기적금"}
                {param.getString("type") === "3" && "정기예금"}
              </Typography>
              <IconButton onClick={(e) => fetchFavoriteStatus(e.currentTarget)}>
                {isFavorite ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ) : (
                  <StarBorderIcon sx={{ color: "gray" }} />
                )}
              </IconButton>
            </Box>

            {/* 계좌명 및 별칭 변경 버튼 */}
            <Typography sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              {param.getString("pdnm")}
              {nickName && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "gray",
                    fontSize: "0.9rem",
                    ml: 0.5, 
                  }}
                  component="span"
                >
                  ({nickName})
                </Typography>
              )}
              <Button size="small" 
                ref={favoriteButtonRef}
                onClick={() => {
                  openBottomPopup({
                    component: POP004, 
                    title: "별칭 설정",
                    nFunc: (data?) => {
                      if (data) {
                        const nickname = data.getString("nickname") || "";
                        console.log("저장된 별칭:", nickname);
                        fetchFavoriteStatus(favoriteButtonRef.current, nickname);
                      } else {
                        console.log("팝업 닫힘 (취소)");
                      }
                    }
                  });
                }}
               >
                별칭 변경
              </Button>

            </Typography>

            {/* 계좌번호 & 복사 아이콘 */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {param.getString("acno")}
                <IconButton onClick={() => navigator.clipboard.writeText(param.getString("acno"))}>
                <ContentCopyIcon />
              </IconButton>
              </Typography>
            </Box>
          </CardContent>
        </Card>

      {/* 입출금계좌일 경우 정보 */}
        {param.getString("type") === "1" && (
          <>
            <Card sx={{ borderRadius: "12px", p: 2, boxShadow: 2, mt: 2 }}>
              <List>
                {/* 출금 가능 금액 */}
                <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: "bold" }}>출금가능금액</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {param.getString("wtchPosbAmt").toLocaleString()}원
                  </Typography>
                </ListItem>

                {/* 계좌 개설일 */}
                <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: "bold" }}>계좌개설일</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{param.getString("newDt") || "-"}</Typography>
                </ListItem>

                {/* 현재 적용 금리 */}
                <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>현재적용금리</Typography>
                    <Typography sx={{ fontSize: "small", color: "gray" }}>
                      (기준일자: {new Date().toLocaleDateString()})
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {param.getString("psntInrt")?.substring(0, 4)}%
                  </Typography>
                </ListItem>
              </List>
            </Card>

            <Card sx={{ borderRadius: "12px", p: 2, boxShadow: 2, mt:2}}>
              {/* 대표계좌 설정 */}
              <List>
                <ListItem>
                    <ListItemText primary="대표계좌설정" />
                    <Switch checked={isRepAccount} onChange={() => setIsRepAccount(!isRepAccount)} />
                    <Typography variant="body2" color="textSecondary">
                      {isRepAccount ? "ON" : "OFF"}
                    </Typography>
                </ListItem>

                {/* 출금중지 설정 */}
                <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemText primary="출금중지설정" />
                    <Tooltip title="출금중지 설정에 대한 설명">
                      <IconButton>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Switch checked={isWithdrawLimit} onChange={() => setIsWithdrawLimit(!isWithdrawLimit)} />
                    <Typography variant="body2" color="textSecondary">
                      {isWithdrawLimit ? "ON" : "OFF"}
                    </Typography>
                  </Box>
                </ListItem>

                {/* 종합통장대출 해지 */}
                <ListItem>
                  <ListItemText primary="종합통장대출 해지" />
                  <IconButton edge="end">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItem>

                {/* 계좌비밀번호 변경 */}
                <ListItem>
                  <ListItemText primary="계좌비밀번호 변경" />
                  <IconButton edge="end">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItem>

                {/* 통장사본 */}
                <ListItem>
                  <ListItemText primary="통장사본" />
                  <IconButton edge="end">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItem>
                
                {/* 수시이자지급 */}
                <ListItem>
                  <ListItemText primary="수시이자지급" />
                  <IconButton edge="end">
                    <ChevronRightIcon />
                  </IconButton>
                </ListItem>

              </List>
            </Card>

            {/* 계좌 해지 버튼 */}
            <Button01 btnName="계좌 해지" clickFunc={()=> console.log("계좌해지 service")} />
          </>
        )}


      </Box01>
    </MainBox>
  );
};

export default EFC004;