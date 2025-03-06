/**
 * @fileoverview [전자금융관리] 
 *
 * @author 
 * @version 1.0.0
 */
import { GLog } from "@src/assets/js/common";

//components
import { Accordion01 } from "@src/components/Accordion";
import { messageView } from '@src/components/Alert';
import { MainBox, Box01 } from "@src/components/Box";
import { Card02, Card04 } from "@src/components/Card"; 
import { progressBar } from "@src/components/Loading"
import { TextBox01, TextBox02 } from "@src/components/Text";
import { Card, CardContent, Box, Typography, Button, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder"; // 즐겨찾기 아이콘
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // 복사 아이콘

const EFC004 = ({ accountData }: { accountData: any }) => {
  return (
    <MainBox>
      <Box01>
        
        <Card sx={{ borderRadius: "12px", p: 2, boxShadow: 2 }}>
        <CardContent>
          {/* 상단 영역 (입출금 타입 & 즐겨찾기 아이콘) */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography component="em">
              입출금
              {/* {accountData.KNCD === "1" && "입출금"}
              {accountData.KNCD === "2" && "정기적금"}
              {accountData.KNCD === "3" && "정기예금"} */}
            </Typography>
            <IconButton>
              <StarBorderIcon />
            </IconButton>
          </Box>

          {/* 계좌명 및 별칭 변경 버튼 */}
          <Typography component="strong" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            계좌명
            별칭통장
            {/* {accountData.AC_NM || "계좌명"} 
            {accountData.ACCO_NICK && ` (${accountData.ACCO_NICK})`} */}
            <Button size="small" onClick={() => console.log("별칭 변경 팝업 열기")}>
              별칭 변경
            </Button>
          </Typography>

          {/* 계좌번호 & 복사 아이콘 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {/* {accountData.ACNO || "020202020202020202"} */}
              020202020202020202
            {/* <IconButton onClick={() => navigator.clipboard.writeText(accountData.ACNO || "020202020202020202")}> */}
            <IconButton onClick={() => navigator.clipboard.writeText("020202020202020202")}>
              <ContentCopyIcon />
            </IconButton>
            </Typography>
          </Box>
        </CardContent>
      </Card>

        {/* 정기예금/적금 진행률 (PRGS_PERCENT 존재 시) */}
        {/* {accountData.KNCD !== "1" && accountData.PRGS_PERCENT && (
          <Box className="progress-area">
            <Box className="progress-wrap pb0">
              <Box className="progress-line">
                <Box
                  className="progress-bar"
                  sx={{ width: `${accountData.PRGS_PERCENT}%` }}
                >
                  <Typography component="em" className="current">
                    {accountData.PRGS_PERCENT}%
                  </Typography>
                </Box>
              </Box>
              <Box className="progress-message">
                {accountData.PRGS_PERCENT < 20 && <Typography>앞으로 화이팅 하세요</Typography>}
                {accountData.PRGS_PERCENT >= 20 && accountData.PRGS_PERCENT < 80 && <Typography>지금까지 잘하고 있어요</Typography>}
                {accountData.PRGS_PERCENT >= 80 && accountData.PRGS_PERCENT < 100 && <Typography>거의 다왔어요. 힘내세요</Typography>}
                {accountData.PRGS_PERCENT === 100 && (
                  <>
                    <Typography>성공했어요! 대단해요!</Typography>
                    <a href="tel:1877-7788">상담원연결 &gt;</a>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        )} */}


      </Box01>
    </MainBox>
  );
};

export default EFC004;