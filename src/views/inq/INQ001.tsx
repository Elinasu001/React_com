import { useState } from "react";
import { 
  Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card02 } from "@src/components/Card"; // 변경된 컴포넌트 임포트

const INQ001 = () => {
  const [accounts] = useState([
    { type: "입출금", number: "123-456-789012", balance: 3540000 },
    { type: "적금", number: "789-123-456789", balance: 23500000 },
    { type: "대출", number: "456-789-123456", balance: -5000000 },
    { type: "입출금", number: "321-654-098765", balance: 100000 },
    { type: "적금", number: "254-123-995152", balance: 12000000 },
    { type: "대출", number: "456-951-665423", balance: -4455000 },
  ]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const [isHidden, setIsHidden] = useState(false); 
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (type: string) => {
    setExpanded((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const accountTypes = ["입출금", "적금", "대출"];

  return (
    <>
      <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, mt: 1 }}>전계좌조회</Typography>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", mb: 3 }}>
        자산 {isHidden ? "******" : `${totalBalance.toLocaleString()} 원`}
        <Button 
          variant="outlined" size="small" sx={{ ml: 2 }} 
          onClick={() => setIsHidden((prev) => !prev)}
        >
          {isHidden ? "보기" : "숨김"}
        </Button>
      </Typography>

      {accountTypes.map((type) => {
        const filteredAccounts = accounts.filter(account => account.type === type);
        if (filteredAccounts.length === 0) return null;

        return (
          <Box key={type} sx={{ mb: 3 }}>
            <Accordion expanded={!!expanded[type]} onChange={() => handleToggle(type)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {type} 계좌 ({filteredAccounts.length}개)
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filteredAccounts.map((account, index) => (
                  <Card02 key={index} type={account.type} number={account.number} balance={account.balance} />
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