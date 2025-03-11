import { Typography } from "@mui/material";
import { Card03 } from "@src/assets/html/00_common/Card";
import { NotiList } from "@src/assets/html/00_common/List";
import { Tab01 } from "@src/assets/html/00_common/Tab";


const Tab_page = () => {
  
  //예시 데이터
  const noticeListData = [
    { id: 1, label: "2023년 2분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지", date: "2023.04.18", icon: true },
    { id: 2, label: "2023년 2분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지", date: "2023.04.18", icon: true },
    { id: 3, label: "2023년 2분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지", date: "2023.04.18" },
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



    return (
      <>
       <Typography className="exp">탭 _ 일반[line]</Typography>

        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div>  },
            { value: "tab2", label: "탭 2", component: <NotiList items={noticeListData}/>  },
          ]}
          initialValue="tab1"
        />
        
        <Typography className="exp">탭 _ 일반[line_scroll]</Typography>

        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
            { value: "tab2", label: "탭 2", component: <Card03 items={productsData} /> },
          ]}
          initialValue="tab1"
          isScrollable={true}  // 스크롤 추가 (true일 때만 .scroll 클래스 + variant="scrollable" 적용)
        />


        <Typography className="exp">탭 _ 일반[bg]</Typography>
        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
            { value: "tab2", label: "탭 2", component: <div>내용 2</div> },
          ]}
          initialValue="tab1"
          isScrollable={true}  // 스크롤 추가 (true일 때만 .scroll 클래스 + variant="scrollable" 적용)
          containerClass="bg-gray" // "bg-gray", "round" 추가 가능
        />

        <Typography className="exp">탭 _ 일반[round]</Typography>
        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
            { value: "tab2", label: "탭 2", component: <div>내용 2</div> },
          ]}
          initialValue="tab1"
          isScrollable={true}  // 스크롤 추가 (true일 때만 .scroll 클래스 + variant="scrollable" 적용)
          containerClass="round" // "bg-gray", "round" 추가 가능
        />


      </>
    );
  };
  
  export default Tab_page;
  