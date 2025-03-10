import { Typography } from "@mui/material";
import { Tab01 } from "@src/assets/html/00_common/Tab";

const Tab_page = () => {
    return (
      <>
       <Typography className="exp">탭 _ 일반[line]</Typography>

        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
            { value: "tab2", label: "탭 2", component: <div>내용 2</div> },
          ]}
          initialValue="tab1"
        />
        
        <Typography className="exp">탭 _ 일반[line_scroll]</Typography>

        <Tab01
          items={[
            { value: "tab1", label: "탭 1", component: <div>내용 1</div> },
            { value: "tab2", label: "탭 2", component: <div>내용 2</div> },
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
  