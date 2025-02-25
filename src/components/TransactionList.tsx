import React, { useState } from "react";
import styled from "styled-components";
import { Switch, FormControlLabel } from "@mui/material";

// 거래 내역 데이터 예시
const transactions = [
  { date: "2025-02-01", counterpart: "신디닥", amount: 50000, balance: 150000, type: "입금" },
  { date: "2025-02-03", counterpart: "김빠나나", amount: 20000, balance: 130000, type: "출금" },
  { date: "2025-02-05", counterpart: "김무담", amount: 15000, balance: 145000, type: "입금" },
  { date: "2025-02-07", counterpart: "김로앳", amount: 10000, balance: 135000, type: "출금" },
  { date: "2025-02-08", counterpart: "김매딴", amount: 25000, balance: 160000, type: "입금" },
  { date: "2025-02-10", counterpart: "박춘딴", amount: 30000, balance: 115000, type: "출금" },
  { date: "2025-02-12", counterpart: "진암기", amount: 40000, balance: 155000, type: "입금" },
  { date: "2025-02-14", counterpart: "박동기", amount: 35000, balance: 120000, type: "출금" },
  { date: "2025-02-16", counterpart: "홍길동", amount: 20000, balance: 140000, type: "입금" },
  { date: "2025-02-18", counterpart: "박단군", amount: 15000, balance: 125000, type: "출금" },
  { date: "2025-02-20", counterpart: "김무무", amount: 30000, balance: 155000, type: "입금" },
  { date: "2025-02-22", counterpart: "박무무", amount: 10000, balance: 145000, type: "출금" },
  { date: "2025-02-24", counterpart: "조무무", amount: 50000, balance: 195000, type: "입금" },
  { date: "2025-02-26", counterpart: "박철", amount: 40000, balance: 155000, type: "출금" },
];

const Container = styled.div`
  padding: 16px;
  max-width: 350px;
  margin: 20px auto;
`;

const SwitchContainer = styled.div`
  display: flex;
  justify-content:right;
  align-items: center;
  margin-bottom: 12px;
`;

const TransactionItem = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateText = styled.p`
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
`;

const Counterpart = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const Amount = styled.p<{ type: string }>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.type === "입금" ? "#1976D2" : "black")};
`;

const Balance = styled.p`
  font-size: 12px;
  color: #555;
`;

const TransactionList = () => {
  const [showBalance, setShowBalance] = useState(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowBalance(event.target.checked);
  };

  return (
    <Container>
      <SwitchContainer>
      <span>{showBalance ? "잔액 " : "잔액 "}</span>
        <Switch
          checked={showBalance}
          onChange={handleSwitchChange}
          name="showBalance"
          color="primary"
        />
        
      </SwitchContainer>

      {transactions.map((transaction, index) => (
        <TransactionItem key={index}>
          <Info>
            <DateText>{transaction.date}</DateText>
            <Counterpart>{transaction.counterpart}</Counterpart>
          </Info>
          <Info>
            <Amount type={transaction.type}>
              {transaction.type === "입금" ? "+" : "-"}{transaction.amount.toLocaleString()} 원
            </Amount>
            {showBalance && (
              <Balance>잔액 : {transaction.balance.toLocaleString()} 원</Balance>
            )}
          </Info>
        </TransactionItem>
      ))}
    </Container>
  );
};

export default TransactionList;
