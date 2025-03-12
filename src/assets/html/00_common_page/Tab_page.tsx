import { Typography } from "@mui/material";
import { Card03 } from "@src/assets/html/00_common/Card";
import { NotiList } from "@src/assets/html/00_common/List";
import { Tab01 } from "@src/assets/html/00_common/Tab";


const Tab_page = () => {
  
  //예시 데이터
  const noticeListData = [
    { id: 1, label: "2023년 2분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지1", date: "2023.04.18", icon: true },
    { id: 2, label: "2023년 2분기 5월 캠코매각 대상 (개인) 신용정보 제공 사실 공지2", date: "2023.04.18", icon: true },
    { id: 3, label: "2023년 2분기 6월 캠코매각 대상 (개인) 신용정보 제공 사실 공지3", date: "2023.04.18" },
  ];

  const noticeListData02 = [
    { id: 1, label: "2023년 3분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지1", date: "2023.04.18", icon: true },
    { id: 2, label: "2023년 3분기 5월 캠코매각 대상 (개인) 신용정보 제공 사실 공지2", date: "2023.04.18", icon: true },
  ];

  const noticeListData03 = [
    { id: 1, label: "2023년 4분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지1", date: "2023.04.18", icon: true },
    { id: 3, label: "2023년 4분기 6월 캠코매각 대상 (개인) 신용정보 제공 사실 공지3", date: "2023.04.18" },
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

        <Typography className="exp">탭 _ Swiper</Typography>

        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <NotiList items={noticeListData}/>},
            { value: "tab2", label: "탭 2", component: <NotiList items={noticeListData02}/> },
            { value: "tab3", label: "탭 3", component: <NotiList items={noticeListData03}/>},
          ]}
          initialValue="tab1"
          isScrollable={true}   // 탭스크롤 기능
          useSwiper={true}      // 스와이프 기능 활성화
        />

        <Typography className="exp">탭 _ 일반[origin]</Typography>

        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div>  },
            { value: "tab2", label: "탭 2", component: <NotiList items={noticeListData}/>  },
          ]}
          initialValue="tab1"
          isScrollable={true}  // 탭스크롤 가능
        />

        <Typography className="exp">탭 _ 일반[line_full]</Typography>

        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div>  },
            { value: "tab2", label: "탭 2", component:   <Card03 items={productsData} />  },
          ]}
          initialValue="tab1"
          containerClass="full" // "bg-gray", "round" , "full" 스타일
        />

        <Typography className="exp">탭 _ 일반[line_scroll_scrollButton]</Typography>
        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div>  },
            { value: "tab2", label: "탭 2", component: <div>내용 1</div>  },
            { value: "tab3", label: "탭 3", component: <div>내용 1</div>  },
            { value: "tab4", label: "탭 4", component: <div>내용 1</div>  },
            { value: "tab5", label: "탭 5", component: <NotiList items={noticeListData}/>  },
          ]}
          initialValue="tab1"
          isScrollable={true}             // 탭스크롤 기능
          scrollButtons="auto"            // 자동 스크롤 버튼
          allowScrollButtonsMobile={true} // 모바일에서도 버튼 표시
        />


        <Typography className="exp">탭 _ [bg]</Typography>
        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
            { value: "tab2", label: "탭 2", component: <div>내용 2</div> },
            { value: "tab3", label: "탭 3", component: <div>내용 2</div> },
            { value: "tab4", label: "탭 4", component: <div>내용 2</div> },
          ]}
          initialValue="tab1"
          containerClass="bg-gray" // "bg-gray", "round", "full" 스타일
        />

        <Typography className="exp">탭 _ [round]</Typography>
        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
            { value: "tab2", label: "탭 2", component: <div>내용 2</div> },
          ]}
          initialValue="tab1"
          isScrollable={true}    // 탭스크롤 기능
          containerClass="round" // "bg-gray", "round", "full" 스타일
        />


      </>
    );
  };
  
  export default Tab_page;
  