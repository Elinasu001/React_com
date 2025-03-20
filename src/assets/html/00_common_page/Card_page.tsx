import { Box, Typography } from "@mui/material";
import { AccDepositCard, AccLoanCard, ModiStarCard, ProductFavCard, ProductOriginCard, StarCard } from "@src/assets/html/00_common/Card";

//메인 _ 예적금 예시 데이터
const AccDepositData = [
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
          {
            name: "거래내역",
            onClick: () => console.log("클릭됨"),
          },
          {
            name: "이체",
            onClick: () => console.log("클릭됨"),
          },
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
        {
          name: "납입일변경",
          onClick: () => console.log("클릭됨"),
        },
        {
          name: "이체",
          onClick: () => console.log("클릭됨"),
        },
      ],
  },
];

//메인 _ 대출&종합대출 예시 데이터
const AccLoanData = [
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
      {
        name: "거래내역",
        onClick: () => console.log("클릭됨"),
      },
      {
        name: "이자즉시출금",
        onClick: () => console.log("클릭됨"),
      },
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
      {
        name: "추가대출",
        onClick: () => console.log("클릭됨"),
      },
      {
        name: "이자즉시출금",
        onClick: () => console.log("클릭됨"),
      },
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
      {
        name: "거래내역",
        onClick: () => console.log("클릭됨"),
      },
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

const accDetailData = [
  { 
    type: [
      { name: "예적금", categoryClass: "deposit" },
      { name: "대출", categoryClass: "loan" },
      { name: "종합대출", categoryClass: "loanTotal" },
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
const ProductFavCardData = [
  {
    pdcd: "P001",
    pdDesc: "안전한 예금 상품입니다.",
    categoty: "예적금",
    categoryClass: "deposit",
    pdnm: "예금 상품 1",
    keyword: ["고금리", "안정성"],
    contents1: "3년 또는 5년",
    contents2: "최저 연 5.90%",
    buttons: [
      {
        name: "가입하기",
        onClick: () => console.log("상품1 가입하기 클릭됨"),
      },
    ],
  },
 
];



//예시 데이터
const ProductOriginCardData = [
  {
    pdcd: "P001",
    pdDesc: "상품특젱 상품특징",
    categoty: "대출",
    categoryClass: "loan",
    pdnm: "상품명 상품명",
    keyword: ["상품상세구분", "태그"],
    buttons: [
      {
        name: "가입하기",
        onClick: () => console.log("상품1 가입하기 클릭됨"),
      },
    ],
  },
  {
    pdcd: "P001",
    pdDesc: "상품특젱 상품특징",
    categoty: "예적금",
    categoryClass: "deposit",
    pdnm: "상품명 상품명",
    keyword: ["상품상세구분", "태그"],
    contents1: "최고 3.0%",
    contents2: "최저 0.2%",
    buttons: [
      {
        name: "가입하기",
        onClick: () => console.log("상품1 가입하기 클릭됨"),
      },
    ],
  },
];


const Card_page = () => {
    return (
        <Box sx={{ padding:"16px" }}>
            <Typography className="exp">예적금 계좌 카드</Typography>
            <AccDepositCard items={AccDepositData} />

            <Typography className="exp">대출 계좌 카드</Typography>
            <AccLoanCard items={AccLoanData} />

            <Typography className="exp">대출/예/적금/종합대출 수정&즐겨찾기 카드</Typography>
            <ModiStarCard items={accDetailData} />
            <Typography className="exp">즐겨찾기 카드</Typography>
            <StarCard items={accDetailData}/>

            <Typography className="exp">대출/예/적금/종합대출 상품카드 (비교하&좋아요)</Typography>
            <ProductFavCard items={ProductFavCardData} />

            <Typography className="exp">대출/예/적금/종합대출 상품카드 (일반)</Typography>
            <ProductOriginCard items={ProductOriginCardData} />

        </Box>
    );
  };
  
  export default Card_page;
  