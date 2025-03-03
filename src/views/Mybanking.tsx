import { useEffect, useState } from "react";
import { MainBox } from "@src/components/Box";
import { Card02, Card03 } from "@src/components/Card";
import { Typography, Box, Tabs, Tab } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { doAction, makeForm, addFormData } from "@assets/js/common";
import { messageView } from "@src/components/Alert";
import { progressBar } from "@src/components/Loading";

// ✅ 계좌 정보 인터페이스
interface Account {
  type: string;
  acno: string;
  balance: number;
}

// ✅ 추천 상품 인터페이스
interface Product {
  pdcd: string;
  pdnm: string;
  categoty: string;
  pdDesc: string;
  keyword: string[];
  contents1: string;
  contents2: string;
}

// ✅ 공지사항 인터페이스
interface Notice {
  title: string;
  content: string;
}

// 슬라이드 인디케이터 (타원형 & 원형)
const CustomDots = ({ dots }: { dots: React.ReactNode }) => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
    <ul style={{ display: "flex", padding: 0, listStyle: "none" }}>{dots}</ul>
  </Box>
);

const Mybanking = () => {
  const [tabValue, setTabValue] = useState(0);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [loanList, setLoanList] = useState<Account[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [noticeList, setNoticeList] = useState<Notice[]>([]);

  // ✅ 계좌 조회
  const fetchAccounts = async () => {
    const form = makeForm("COM0000SC");
    addFormData(form, "txGbnCd", "M");
    addFormData(form, "ACCO_KNCD", "9");
  
    progressBar(true);
    try {
      const response = await doAction(form);
      progressBar(false);
  
      if (response.header.respCd !== "N00000") {
        messageView(`계좌 조회 실패: ${response.header.respMsg}`, "확인");
        return;
      }
  
      const resData = response.data;
  
      const depositAccounts = resData.getList<{ ACNO: string; BALANCE: number }>("REC1").map(acc => ({
        type: "수신",
        acno: acc.ACNO, 
        balance: acc.BALANCE,
      }));
  
      const loanAccounts = resData.getList<{ ACNO: string; BALANCE: number }>("REC4").map(acc => ({
        type: "여신",
        acno: acc.ACNO,
        balance: acc.BALANCE,
      }));
  
      setAccountList(depositAccounts);
      setLoanList(loanAccounts);
    } catch (error) {
      progressBar(false);
      messageView("계좌 조회 중 오류 발생", "확인");
      console.error("계좌 조회 오류:", error);
    }
  };
  

  const fetchProducts = async () => {
    const form = makeForm("COM0000SC");
    addFormData(form, "txGbnCd", "P");
  
    try {
      const response = await doAction(form);
      if (response.header.respCd !== "N00000") return;
      const resData = response.data;
  
      // ✅ API 응답 필드(대문자) → 프론트엔드 필드(소문자) 변환
      const products = resData.getList<{ PRDCT_CD: string; PRDCT_NM: string; PRDCT_CLS_CD: string; SMR_DC_CNTN: string; SALE_STR_DT: string; SALE_END_DT: string }>("prdList")
        .map(prod => ({
          pdcd: prod.PRDCT_CD,
          pdnm: prod.PRDCT_NM,
          categoty: prod.PRDCT_CLS_CD,
          pdDesc: prod.SMR_DC_CNTN,
          keyword: ["추천", "금융상품"],
          contents1: "",
          contents2: "",
        }));
  
      setProductList(products);
    } catch (error) {
      console.error("추천 상품 조회 오류:", error);
    }
  };
  
  const fetchNotices = async () => {
    const form = makeForm("COM0000SC");
    addFormData(form, "txGbnCd", "N");
  
    try {
      const response = await doAction(form);
      if (response.header.respCd !== "N00000") return;
      const resData = response.data;
  
      // ✅ API 응답 필드(대문자) → 프론트엔드 필드(소문자) 변환
      const notices = resData.getList<{ PBANC_TTL_NM: string; PBANC_CNTN: string }>("pbancList")
        .map(notice => ({
          title: notice.PBANC_TTL_NM,
          content: "",
        }));
  
      setNoticeList(notices);
    } catch (error) {
      console.error("공지사항 조회 오류:", error);
    }
  };
  

  useEffect(() => {
    fetchAccounts();
    fetchProducts();
    fetchNotices();
  }, []);

  // ✅ 슬라이드 설정
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots: React.ReactNode) => <CustomDots dots={dots} />,
    customPaging: (i: number) => (
      <Box sx={{ width: i === 0 ? 20 : 10, height: 10, backgroundColor: i === 0 ? "gray" : "lightgray", borderRadius: "50%", margin: "0 4px" }} />
    ),
  };

  return (
    <MainBox>
      {/* ✅ 탭 메뉴 */}
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        variant="fullWidth"
        sx={{
          mb: 2,
          "& .MuiTabs-indicator": { backgroundColor: "#612AD0" },
          "& .MuiTab-root": { fontWeight: "bold", color: "gray" },
          "& .Mui-selected": { color: "#612AD0 !important" },
        }}
      >
        <Tab label="예적금" />
        <Tab label="대출" />
      </Tabs>

      {/* ✅ 수신 계좌 */}
      {tabValue === 0 && (
        <Slider {...sliderSettings}>
          {accountList.map((account, index) => (
            <Box key={index} sx={{ padding: "5px" }}>
              <Card02 type={account.type} acno={account.acno} balance={account.balance} />
            </Box>
          ))}
        </Slider>
      )}

      {/* ✅ 여신 계좌 */}
      {tabValue === 1 && (
        <Slider {...sliderSettings}>
          {loanList.map((account, index) => (
            <Box key={index} sx={{ padding: "5px" }}>
              <Card02 type={account.type} acno={account.acno} balance={account.balance} />
            </Box>
          ))}
        </Slider>
      )}

      {/* ✅ 추천 상품 */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>추천 상품</Typography>
      <Slider {...sliderSettings}>
        {productList.map((product, index) => (
          <Box key={index} sx={{ padding: "5px" }}>
            <Card03 {...product} />
          </Box>
        ))}
      </Slider>

      {/* ✅ 공지사항 (새로운 소식) */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>
        공지사항
      </Typography>

      <Box sx={{ backgroundColor: "#F8F9FA", borderRadius: "12px", padding: "12px", mt: 2 }}>
        {noticeList.length > 0 ? (
          noticeList.slice(0, 3).map((notice, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              {/* 아이콘 추가 가능 */}
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#612AD0", mr: 1 }} />
              <Typography variant="body2">{notice.title}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            공지사항이 없습니다.
          </Typography>
        )}

        {/* ✅ 더보기 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: "#612AD0", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => console.log("공지사항 페이지로 이동")}
          >
            더보기 &gt;
          </Typography>
        </Box>
      </Box>

    </MainBox>
  );
};

export default Mybanking;
