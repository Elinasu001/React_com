/**
 * @fileoverview [전자금융관리] 
 *
 * @author 
 * @version 1.0.0
 */

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// common
import { addFormData, doAction, getCustDs, getParameter, GLog, IS_LOGIN, makeForm } from "@src/assets/js/common";

// components
import { Accordion01 } from "@src/components/Accordion";
import { messageView } from '@src/components/Alert';
import { MainBox, Box01 } from "@src/components/Box";
import { Button01, Button04 } from "@src/components/Button";
import { Card02, Card04 } from "@src/components/Card"; 
import { progressBar } from "@src/components/Loading"
import { TextBox01, TextBox02 } from "@src/components/Text";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Card, CardContent, Box, Typography, Button, IconButton, Switch, List, ListItem, ListItemText, Tooltip } from "@mui/material";

// icon
import StarBorderIcon from "@mui/icons-material/StarBorder";    // 즐겨찾기 아이콘
import StarIcon from "@mui/icons-material/StarBorder";          // 즐겨찾기 아이콘
import ContentCopyIcon from "@mui/icons-material/ContentCopy";  // 복사 아이콘


const EFC004 = () => {

  // 페이지 이동 함수
  const navigate = useNavigate();

  // 로그인 사용자 정보 가져오기
  const user = getCustDs(); 
  
  const param = getParameter(useLocation()); // EFC001(전계좌조회)화면에서 넘겨받은 param

  const [isRepAccount, setIsRepAccount] = useState(false);
  const [isWithdrawLimit, setIsWithdrawLimit] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [nickname, setNickname] = useState("");


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
        txGbnCd = "I";
      } else {
        if (!als) {
          als = "";
          if (obj?.classList?.contains("on")) {
            txGbnCd = "D";
            msgTxt = "해제";
          } else {
            txGbnCd = "R"; 
            msgTxt = "등록";
          }
        } else {
          txGbnCd = "R";
          msgTxt = "별칭 설정";
          addFormData(form, "ALS", als);
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
        
        GLog.d("txGbnCd □■□■□■□■□■□■ " + txGbnCd);

        // 조회
        if(txGbnCd === "I"){

          // 서버에서 받아온 데이터 Set
          if (txGbnCd === "I" && Array.isArray(resData.REC)) {
            const isFav = resData.REC.some((rec: any) => rec.WB_ACNO === param.getString("acno"));
            setIsFavorite(isFav);
          }

        } else {

          var msg = resData.API_RS_MSG;
          if (msg === "SUCCESS") {

            if (als) {
              setIsFavorite(true);
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
        
        <Card sx={{ borderRadius: "12px", p: 2, boxShadow: 2 }}>
          <CardContent>
            {/* 상단 영역 (입출금 타입 & 즐겨찾기 아이콘) */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography>
                {param.getString("type") === "1" && "입출금"}
                {param.getString("type") === "2" && "정기적금"}
                {param.getString("type") === "3" && "정기예금"}
              </Typography>
              <IconButton 
                onClick={(e) => fetchFavoriteStatus(e.currentTarget)} 
                className={isFavorite ? "on" : ""}
              >
                {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
              </IconButton>


            </Box>

            {/* 계좌명 및 별칭 변경 버튼 */}
            <Typography sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              {param.getString("pdnm")} {param.getString("nick")}
              {/* {accountData.ACCO_NICK && ` (${accountData.ACCO_NICK})`} */}
              <Button size="small" onClick={() => console.log("별칭 변경 팝업 열기")}>
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