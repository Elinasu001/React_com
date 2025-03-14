
import { Typography } from "@mui/material";
import { InfoList } from "@src/assets/html/00_common/Textlist";

const Textlist_page = () => {
  return (
    <>
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
      <Typography className="exp">계좌 관리 상세 리스트 <br/>** 작업중입니다.</Typography>
      
      </>
  );
};

export default Textlist_page;
