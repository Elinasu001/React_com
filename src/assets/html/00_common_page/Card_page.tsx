import { Typography } from "@mui/material";
import { Card02, Card03 } from "@src/assets/html/00_common/Card";

//예시 데이터
const accountsData = [
  { 
    type: "1",
    pdnm: "예금",
    categoryClass: "deposit",
    acno: "123-456-789",
    balance: 500000,
    newDt: "2024-03-10",
    wtchPosbAmt: 10000,
    psntInrt: 2.5, nFunc: () => {}
  },
  {
    type: "2",
    pdnm: "예금",
    categoryClass: "deposit",
    acno: "123-456-789",
    balance: 500000,
    newDt: "2024-03-10",
    wtchPosbAmt: 10000,
    psntInrt: 2.5, nFunc: () => {}
  }
];

//예시 데이터
const productsData = [
  {
    pdcd: "P001",
    pdDesc: "안전한 예금 상품입니다.",
    categoty: "예적금",
    categoryClass: "deposit",
    pdnm: "예금 상품 1",
    keyword: ["고금리", "안정성"],
    contents1: "최대 5% 이자",
    contents2: "월 1회 이자 지급",
    onClick: () => console.log("상품 클릭됨"),
  },
  {
    pdcd: "P002",
    pdDesc: "안전한 예금 상품입니다.",
    categoty: "예적금",
    categoryClass: "deposit",
    pdnm: "예금 상품 1",
    keyword: ["고금리", "안정성"],
    contents1: "최대 5% 이자",
    contents2: "월 1회 이자 지급",
    onClick: () => console.log("상품 클릭됨"),
  }
];


const Card_page = () => {
    return (
        <>
            <Typography className="exp">계좌 카드</Typography>
            <Card02 items={accountsData} />

            <Typography className="exp">대출/예/적금/종합대출 카드</Typography>
            <Card03 items={productsData} />

        </>
    );
  };
  
  export default Card_page;
  