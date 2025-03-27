
import { Box, Typography } from "@mui/material";
import { AccDetailList, AccMngInfoList, AtInfoList, DateBar, EContInfoList, InfoList, RpySchInfoList, StInfoList } from "@src/assets/html/00_common/Textlist";

// 자동이체 예시 데이터
const AtInfoListData = [
  {
    status: "신규접수",
    
    depAcc: {
      name: "김철수",
      bank: "저축은행",
      acno: "02098765432",
    },
    wdAcc: {
      name: "홍길동",
      bank: "저축은행",
      acno: "01012345678",
    },
    amnt: 500000,
    prd: {
      stDt: "2024.03.01",
      endDt: "2024.03.31",
    },
    trfDay: "01일",
    buttons: [
      { name: "변경하기", onClick: () => alert("변경 클릭") },
      { name: "해제하기", onClick: () => alert("이체 클릭") },
    ]
  },
];


// 예약이체 예시 데이터
const StInfoListData = [
  {
    pdnm: "타이틀",
    status: "신규접수",
    depAcc: {
      name: "홍길동",
      bank: "국민은행",
      acno: "123-456-789"
    },
    wdAcc: {
      name: "김철수",
      bank: "신한은행",
      acno: "987-654-321"
    },
    amnt: 500000,
    fee: 500,  // 수수료 추가
    prd: {
      stDt: "2025.04.01",
      endDt: "2025.12.31"
    },
    trfDay: "매월 1일",
    rcpDisp: "월세",
    sndDisp: "집주인",
    buttons: [
      { name: "취소", onClick: () => alert("이체 취소") }
    ]
  },
];

// 계좌관리 예시 데이터
const AccMngInfoListData = [
  {
    pdnm: "계좌정보",
    balance: 500000,
    accOpenDt: "2022.03.15",
    wdrwAmt: 400000,
    curintRt: 2.5,
    txBnfType: "비과세",
    lastTxnDt: "2024.03.10",
    contPrd: 12,
    baseAnlRt: 2.5,
    preTxInt: 30000,
  },
  {
    pdnm: "만기해지후송금",
    tfrBank: "신한은행",
    tfrAcno: "110-123-456789",
  },
  {
    pdnm: "종합통장대출",
    limAmt: 500000,
    accMatDt: "2025.03.15",
    intRt: 2.3,
    ovdRt: 5.0,
    intAsOfDate: 1250,
  },
  {
    pdnm: "자동이체",
    bnkNm: "KB국민",
    acno: "123-456-789",
  },
  {
    pdnm: "계좌정보",
    lReqAmnt: 10000000,
    status: "정상",
    lReqDt: "2024.03.15",
    lMatDt: "2026.03.15",
    lRpyMt: "만기일시상환",
    nowApplRt: 3.2,
    intPayDt: "매월 4일",
    lastTrdDt: "2024.03.15",
    ovdRt: 6.2

  }
];

// 상환일정 예시 데이터
const RpySchInfoListData = [
  {
    pdnm: "아파트담보대출",
    acno: "110-234-567890",
    lReqAmnt: 50000000,
    lRemLnAmt: 32000000,
    lReqDt: "2023.01.15",
    lMatDt: "2033.01.15",
    lLastIntPayDt: "2025.03.01",
    lNextIntPayDt: "2025.04.01",
  },
// 대출상환 스케줄 예시 데이터
  {
    pdnm: "예스론",
    acno: "110-234-567890",
    lDt: "2023.01.15",
    matDt: "2023.01.15",
    lRpyMt: "원리금균등상환",
    normSchRt: 3.2,
    ovdSchRt: 2.2,
    lAgrDt: 10,

  },
];

// 전자계약 예시 데이터
const EContInfoListData = [
  { 
    usrNm: "홍길동",
    resRegNo: "880101-*******",
    addr: {
      zipCode: "0000",
      city: "서울시 강남구 강남동",
      building: "신동아아파트",
      unit: "000동 000호",
    },
    intWdAcc: {
      name: "김철수",
      bank: "신한은행",
      acno: "987-654-321"
    },
    lReqDt: "2024.03.15",
    lMatDt: "2026.03.15",
    lRpyMt: "만기일시상환",
    intRt: 3.2,
    ovdRt: 2.2,
    intPayDt: "매월 4일",
    acno: "110-234-567890",
  },
];

// 계좌상세 예시 데이터
const AccDetailInfolListData = [
  {
    id: 1,
    date: "2023.05.04 13:24:56",
    title: "정기예금신규",
    type: "출금",
    amount: "350,000원",
    balance: "550,000원",
  },
  {
    id: 2,
    date: "2023.05.04 13:24:56",
    title: "보고파적금",
    type: "입금",
    amount: "350,000원",
    balance: "550,000원",
  },
 
];


const Textlist_page = () => {
  return (
    <Box sx={{ padding:"16px" }}>
      <Typography className="exp">정보 리스트</Typography>

      {/* 정보 */}
      <InfoList
        title="보안카드 입력 안내"
        items={[
          "5회 오류 시 서비스 이용이 중단되고 메인으로 이동해요",
          "오류 해제를 원하실 경우 영업점에 방문해 이용제한 해제를 하셔야 해요"
        ]}
        listIcon={true}
        hideTitle={true} // titleIcon 사용시 삭제
      />
      <Typography className="exp">정보 리스트 - 타이틀</Typography>
      {/* 정보 - 타이틀 있을 경우 */}
      <InfoList
        title="보안카드 입력 안내"
        items={[
          "5회 오류 시 서비스 이용이 중단되고 메인으로 이동해요",
          "오류 해제를 원하실 경우 영업점에 방문해 이용제한 해제를 하셔야 해요"
        ]}
        titleIcon={true}
        listIcon={true}
        // hideTitle={true} // titleIcon 사용시 삭제
      />

    <Typography className="exp">정보 리스트 - dot</Typography>
      {/* 정보 - 타이틀 있을 경우 */}
      <InfoList
        title="보안카드 입력 안내"
        items={[
          "5회 오류 시 서비스 이용이 중단되고 메인으로 이동해요",
          "오류 해제를 원하실 경우 영업점에 방문해 이용제한 해제를 하셔야 해요"
        ]}
        hideTitle={true}
      />

    <Typography className="exp">정보 리스트 - dot - 타이틀</Typography>
      {/* 정보 - 타이틀 있을 경우 */}
      <InfoList
        title="보안카드 입력 안내"
        items={[
          "5회 오류 시 서비스 이용이 중단되고 메인으로 이동해요",
          "오류 해제를 원하실 경우 영업점에 방문해 이용제한 해제를 하셔야 해요"
        ]}
        // hideTitle={true}
      />

      <Typography className="exp">계좌상세 리스트_버튼 없을 경우</Typography>
      <DateBar
        clickFunc={() => console.log("날짜 선택 버튼 클릭!")}
      />

      <Typography className="exp">계좌상세 리스트_버튼 있을 경우</Typography>
      <DateBar
        clickFunc={() => console.log("날짜 선택 버튼 클릭!")}
        clickFuncDownload={() => console.log("거래내역 다운로드 버튼 클릭!")}
      />

  
      <AccDetailList AccDetailItems={AccDetailInfolListData} />

      <Typography className="exp">자동이체 리스트 </Typography>
      <AtInfoList items={AtInfoListData} />
      <Typography className="exp">예약이체 리스트 </Typography>
      <StInfoList items={StInfoListData} />
      <Typography className="exp">계좌관리 리스트 </Typography>
      <AccMngInfoList items={AccMngInfoListData} />
      <Typography className="exp">상환일정 리스트 </Typography>
      <RpySchInfoList items={RpySchInfoListData} />
      <Typography className="exp">전자계약 리스트 </Typography>
      <EContInfoList items={EContInfoListData} />
      </Box>
  );
};



export default Textlist_page;
