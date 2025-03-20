import { Box, Typography } from "@mui/material";
import { AcnoDepositCard, AcnoLoanCard, ModiStarCard, ProductDepositCard, StarCard } from "@src/assets/html/00_common/Card";

//메인 _ 예적금 예시 데이터
const AcnoDepositData = [
      {
        type: "메인_입출금",
        pdnm: "보통예금",
        categoryClass: "deposit",
        acno: "123-456-789",
        balance: 500000,
        newDt: "2024-03-10",
        wtchPosbAmt: 10000,
        psntInrt: 2.5,
        buttons: [
          { name: "거래내역" },
          { name: "이체" }
        ],
        isMain: true
    },
    {
      type: "상세_입출금",
      pdnm: "보통예금",
      categoryClass: "deposit",
      acno: "123-456-789",
      balance: 500000,
      newDt: "2024-03-10",
      wtchPosbAmt: 10000,
      psntInrt: 2.5,
      buttons: [
        { name: "납입일변경" },
        { name: "이체" }
      ],
  },
];

//메인 _ 대출&종합대출 예시 데이터
const AcnoLoanData = [
  {
    type: "메인_신용대출",
    pdnm: "빅머니M",
    categoryClass: "loan",
    acno: "123-456-789",
    balance: 500000,
    newDt: "2024-03-10",
    wtchPosbAmt: 10000,
    psntInrt: 2.5,
    buttons: [
      { name: "거래내역" },
      { name: "이자즉시출금" }
    ],
    isMain: true,
  },
  {
    type: "상세_신용대출",
    pdnm: "빅머니M",
    categoryClass: "loan",
    acno: "123-456-789",
    balance: 500000,
    appAmt: 1000000,
    newDt: "2024-03-10",
    wtchPosbAmt: 10000,
    psntInrt: 2.5,
    buttons: [
      { name: "추가대출" },
      { name: "이자즉시출금" }
    ],
  },
  {
    type: "메인_담보대출",
    pdnm: "종합통장대출(인터넷)",
    categoryClass: "loan",
    acno: "123-456-789",
    balance: 500000,
    newDt: "2024-03-10",
    wtchPosbAmt: 10000,
    psntInrt: 2.5,
    buttons: [
      { name: "거래내역" },
    ],
    isMain: true,
  },
  {
    type: "메인_담보대출",
    pdnm: "종합통장대출(인터넷)",
    categoryClass: "loan",
    acno: "123-456-789",
    balance: 500000,
    newDt: "2024-03-10",
    wtchPosbAmt: 10000,
    psntInrt: 2.5,
    isMain: true,
  },
];

const userAccountData = [
  { 
    type: [
      { name: "예적금", categoryClass: "deposit" },
      { name: "대출", categoryClass: "loan" },
      { name: "대출", categoryClass: "loanTotal" },
    ],
    pdnm: "e정기예금 단리",
    keyword: ["고금리", "안정성"],
    acno: "123-456-789",
    balance: 500000,
    newDt: "2024-03-10",
    wtchPosbAmt: 10000,
    psntInrt: 2.5
  },
];



//예시 데이터
const productsData = [
  {
    pdcd: "P001",
    pdDesc: "안전한 종합대출 상품입니다.",
    categoty: "종합대출",
    categoryClass: "loanTotal",
    pdnm: "종합대출 상품 1",
    keyword: ["고금리", "안정성"],
    contents1: "3년 또는 5년",
    contents2: "최저 연 5.90%",
    onClick: () => console.log("상품 클릭됨"),
  },
  {
    pdcd: "P001",
    pdDesc: "안전한 예금 상품입니다.",
    categoty: "예적금",
    categoryClass: "deposit",
    pdnm: "예금 상품 1",
    keyword: ["고금리", "안정성"],
    contents1: "3년 또는 5년",
    contents2: "최저 연 5.90%",
    onClick: () => console.log("상품 클릭됨"),
  },
 
];


const Card_page = () => {
    return (
        <Box sx={{ padding:"16px" }}>
            <Typography className="exp">예적금 계좌 카드</Typography>
            <AcnoDepositCard items={AcnoDepositData} />

            <Typography className="exp">대출 계좌 카드</Typography>
            <AcnoLoanCard items={AcnoLoanData} />

            <Typography className="exp">수정&즐겨찾기 카드</Typography>
            <ModiStarCard items={userAccountData} />
            <Typography className="exp">즐겨찾기 카드</Typography>
            <StarCard items={userAccountData}/>

            <Typography className="exp">대출/예/적금/종합대출 카드<br/>** 작업중입니다.</Typography>
            <ProductDepositCard items={productsData} />

        </Box>
    );
  };
  
  export default Card_page;
  