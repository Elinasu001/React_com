import React from "react";
import styled from "styled-components";
import { Button01 } from "@src/components/button";
import { progressBar } from "./loading";

// 계좌 정보 데이터 예제
const account = {
  bankName: "GP스마트뱅킹",
  accountNumber: "123-456-789012",
  balance: 99875000000,
  accountHolder: "김나미",
};

const Container = styled.div`
  padding: 16px;
  max-width: 400px;
  margin: auto;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const BankName = styled.h2`
  font-size: 18px;
  color: #444;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  width: 100%;
`;

const AccountNumber = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  width: 100%;
`;
const AccountHolder = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  width: 100%;
`;

const Balance = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;




const AccountInfo = () => {
  return (
    <Container>
      <Card>
        <BankName>{account.bankName}</BankName>
        <AccountNumber>계좌번호 : {account.accountNumber}</AccountNumber>
        <AccountHolder>예금주명 : {account.accountHolder}</AccountHolder>
        <Balance>잔액 : {account.balance.toLocaleString()} 원</Balance>
        <ButtonGroup>
          <Button01
                  btnName="이체"
                  width = "100%"
                  fontSize = "16px"
                  clickFunc={async () => {
                   
                  }}
                />
        </ButtonGroup>
      </Card>
    </Container>
  );
};

export default AccountInfo;
