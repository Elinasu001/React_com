import React, { useEffect, useState } from "react";
import { Button01 } from "./button";
import { messageView } from "./alert";
import { GLog } from "@src/assets/js/common";

// 거래 내역 타입 정의
interface Transaction {
  id: number;
  date: string;
  counterpart: string;
  amount: number;
  balance: number;
  type: string;
}

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 백엔드에서 거래 내역 가져오기
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(""); // 백엔드 API URL
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) return <p style={styles.message}>📌 로딩 중...</p>;
  if (error) {
  messageView(
    '오류 발생',
    '확인',
    () => {
      console.log('확인 클릭');
      GLog.d('확인 클릭');
    }
  );

  return <p style={styles.message}>❌ 오류 발생: {error}</p>;
}

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>거래 내역</h2>
      <div style={styles.list}>
        {transactions.map((tx) => (
          <div key={tx.id} style={styles.transactionCard}>
            <p style={styles.date}>{tx.date}</p>
            <p style={styles.counterpart}>{tx.counterpart}</p>
            <p style={{ ...styles.amount, color: tx.type === "입금" ? "green" : "red" }}>
              {tx.type === "입금" ? "+" : "-"} {tx.amount.toLocaleString()} 원
            </p>
            <p style={styles.balance}>잔액: {tx.balance.toLocaleString()} 원</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "20px auto",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  transactionCard: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  date: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  counterpart: {
    fontSize: "14px",
    color: "#555",
  },
  amount: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  balance: {
    fontSize: "12px",
    color: "#888",
  },
  message: {
    textAlign: "center",
    fontSize: "16px",
    color: "#333",
  },
};

export default TransactionList;
