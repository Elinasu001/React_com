
import { Typography } from "@mui/material";
import { ListButton, NotiList } from "@src/assets/html/00_common/List";

const List_page = () => {

  // 직업 선택 리스트 예시 데이터
  const items = [
    { id: 1, label: "임원 등 고위 관리자" },
    { id: 2, label: "전문가 및 관련종사자" },
    { id: 3, label: "사무 종사자" },
    { id: 4, label: "판매 종사자" },
    { id: 5, label: "농림어업 숙련 종사자" },
    { id: 6, label: "기능원 및 관련 기능 종사자" },
    { id: 7, label: "장치 및 기계 조작 및 조립 종사자" },
  ];

  // 이벤트 리스트 예시 데이터
  const eventListData = [
    { id: 1, label: "[깜짝 퀴즈 이벤트] 예가람저축은행 파킹통장 이름은?!", date: "2022.11.22 ~ 2023.12.03" },
    { id: 2, label: "[깜짝 퀴즈 이벤트] 예가람저축은행 파킹통장 이름은?!", date: "2022.11.22 ~ 2023.12.03" },
  ];

  // FAQ 리스트 예시 데이터
  const faqListData = [
    { id: 1, category: "예적금", label: "금액 별 필요한 인증 단계가 어떻게 되나요?" },
    { id: 2, category: "대출", label: "금액 별 필요한 인증 단계가 어떻게 되나요?" },
  ];

  // 공지 리스트 예시 데이터
  const noticeListData = [
    { id: 1, label: "2023년 2분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지", date: "2023.04.18", icon: true },
    { id: 2, label: "2023년 2분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지", date: "2023.04.18", icon: true },
    { id: 3, label: "2023년 2분기 4월 캠코매각 대상 (개인) 신용정보 제공 사실 공지", date: "2023.04.18" },
  ];

    return (
        <>
          <Typography className="exp">리스트 버튼 [ex) 직종 선택]</Typography>
          <ListButton items={items} />

          <Typography className="exp">이벤트 게시판</Typography>
          {/* isEventList 사용 시 디폴트로 들어가는 이미지 적용 */}
          <NotiList items={eventListData} isEventList/>

          <Typography className="exp">자주묻는 질문 게시판</Typography>
          <NotiList items={faqListData} />
          
          <Typography className="exp">공지 게시판</Typography>
          <NotiList items={noticeListData} />
        </>
    );
  };
  
  export default List_page;
  