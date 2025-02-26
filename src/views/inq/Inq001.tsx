/**
 * @fileoverview [조회] 
 *
 * @author 
 * @version 1.0.0
 */
import { useState } from "react";
import { 
  Box, Typography, Button, Divider, ListItemButton, IconButton, Accordion, 
  AccordionSummary, AccordionDetails 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // 펼치기 아이콘
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // 복사 아이콘
import { Card01 } from "@src/components/Card";

const INQ001 = () => {

  // 사용자의 계좌 목록 testData
  const [accounts] = useState([
    { type: "입출금", number: "123-456-789012", balance: 3540000 },
    { type: "적금", number: "789-123-456789", balance: 23500000 },
    { type: "대출", number: "456-789-123456", balance: -5000000 },
    { type: "입출금", number: "321-654-098765", balance: 100000 },
    { type: "적금", number: "254-123-995152", balance: 12000000 },
    { type: "대출", number: "456-951-665423", balance: -4455000 },
  ]);

  // 총 자산 계산 testData
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const [isHidden, setIsHidden] = useState(false); // 총 자산 표시 여부

  // 각 계좌 타입별 토글 상태
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  // 토글 함수
  const handleToggle = (type: string) => {
    setExpanded((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // 계좌 타입별 그룹화 testdata
  const accountTypes = ["입출금", "적금", "대출"];

  return (
    <>
      <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
        {/* 페이지 메인 제목 */}
        <Typography variant="h5" sx={{ mb: 3, mt: 1 }}>전계좌조회</Typography>
      </Box>

      {/* 총 자산 표시 */}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", mb: 3 }}>
        자산 {isHidden ? "******" : `${totalBalance.toLocaleString()} 원`}
        <Button 
          variant="outlined" size="small" sx={{ ml: 2 }} 
          onClick={() => setIsHidden((prev) => !prev)}
        >
          {isHidden ? "보기" : "숨김"}
        </Button>
      </Typography>

      {/* 계좌 타입별 그룹화 및 토글 */}
      {accountTypes.map((type) => {
        const filteredAccounts = accounts.filter(account => account.type === type);
        if (filteredAccounts.length === 0) return null;

        return (
          <Box key={type} sx={{ mb: 3 }}>
            {/* 타입별 아코디언 (토글 버튼) */}
            <Accordion expanded={!!expanded[type]} onChange={() => handleToggle(type)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {type} 계좌 ({filteredAccounts.length}개)
                </Typography>
              </AccordionSummary>

              {/* 펼쳐진 경우에만 계좌 목록 표시 */}
              <AccordionDetails>
                {filteredAccounts.map((account, index) => (
                  <Card01 key={index} padding="20px" borderRadius="12px" width="100%">
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {account.type} 계좌
                      </Typography>
                    </Box>

                    {/* 계좌번호 및 복사 아이콘 */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body1" color="textSecondary">
                        {account.number}
                        <IconButton 
                          onClick={() => navigator.clipboard.writeText(account.number)}
                          sx={{ p: 1 }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Typography>

                      {/* 계좌 잔액 */}
                      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "right" }}>
                        {account.balance.toLocaleString()} 원
                      </Typography>
                    </Box>

                    {/* 구분선 */}
                    <Divider sx={{ borderColor: "lightgray", borderBottomWidth: 1, my: 1 }} />

                    {/* 버튼 영역 */}
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 3, alignItems: "center" }}>
                      {account.type === "대출" ? (
                        <ListItemButton
                          sx={{
                            justifyContent: "center",
                            width: "100px",
                            bgcolor: "transparent", 
                            color: "black",
                            borderRadius: 2,
                            "&:hover": { bgcolor: "grey.400" },
                          }}
                        >
                          상환
                        </ListItemButton>
                      ) : (
                        <>
                          <ListItemButton
                            sx={{
                              justifyContent: "center", 
                              width: "100px",
                              bgcolor: "transparent",
                              color: "black", 
                              borderRadius: 2,
                              "&:hover": { bgcolor: "grey.400" },
                            }}
                          >
                            거래내역
                          </ListItemButton>

                          <Divider orientation="vertical" flexItem sx={{ height: "35px", borderColor: "lightgray" }} />

                          <ListItemButton
                            sx={{
                              justifyContent: "center",
                              width: "100px",
                              bgcolor: "transparent",
                              color: "black",
                              borderRadius: 2,
                              "&:hover": { bgcolor: "grey.400" },
                            }}
                          >
                            이체
                          </ListItemButton>
                        </>
                      )}
                    </Box>
                  </Card01>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </>
  );
};

export default INQ001;
