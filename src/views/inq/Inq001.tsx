/**
 * @fileoverview [조회] 
 *
 * @author 
 * @version 1.0.0
 */
import { useState } from "react";
import { Box, Typography, Button, Divider, IconButton, Chip, ListItemButton   } from "@mui/material";
import { Card01 } from "@src/components/Card";


const INQ001 = () => {

  // ✅ [사용자의 계좌 목록] testData
  const [accounts] = useState([
    { type: "입출금", number: "123-456-789012", balance: 3540000 },
    { type: "적금", number: "789-123-456789", balance: 10000000 },
    { type: "대출", number: "456-789-123456", balance: -5000000 },
  ]);

  // ✅ [총 자산 계산] testData
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const [isHidden, setIsHidden] = useState(false); // 총 자산 표시상태 여부 

  return (
    <>
      <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>

        {/* 페이지 메인 제목 */}
        <Typography variant="h5" sx={{ mb: 3, mt: 1}}>전계좌조회</Typography>{/* mb: 아래 box와 간격 조정, mt: 위 Header와 간격 조정 */}
      </Box>
        
        {/* 총 자산 표시 */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", mb: 3 }}>
          자산 {isHidden ? "******" : `${totalBalance.toLocaleString()} 원`}

          {/* 자산 숨김/표시 버튼 */}
          <Button variant="outlined" size="small" 
            sx={{ml: 2}} onClick={() => setIsHidden((prev) => !prev)}>
              {isHidden ? "보기" : "숨김"}
          </Button>

        </Typography>

        {/* 계좌 내역 */}
        {accounts.map((account, index) => (
          <Card01 key={index} padding="20px" borderRadius="12px" width="95%">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1}}>
              {account.type === "입출금" && (
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {account.type} 계좌
                </Typography>
              )}
              {account.type === "적금" && (
                <Typography variant="subtitle1" sx={{ fontWeight: "bold"}}>
                  {account.type} 계좌
                </Typography>
              )}
              {account.type === "대출" && (
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {account.type} 계좌
                </Typography>
              )}
            </Box>
              
            <Typography variant="body2" color="textSecondary">
              {account.number}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1, borderBottom : 1}}>
              {account.balance.toLocaleString()} 원
            </Typography>

            {/* ✅ 버튼 영역 (ListItemButton 스타일) */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 3, alignItems: "center" }}>
              {account.type === "대출" ? (
                <ListItemButton
                  sx={{
                    justifyContent: "center",
                    width: "100px",
                    bgcolor: "transparent", 
                    color: "white",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "error.dark" },
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

                  <Divider orientation="vertical" flexItem sx={{ height: "30px", borderColor: "lightgray" }} />

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

    </>
  );
};

export default INQ001;
