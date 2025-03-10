
import { Typography } from "@mui/material";
import { ContentTitle } from "@src/assets/html/00_common/Text";
import { InfoList } from "@src/assets/html/00_common/Textlist";

const Button_page = () => {
  return (
    <>
      <Typography className="exp">컨텐츠 상단 타이틀</Typography>

      {/* 컨텐츠 상단 타이틀 */}
      <ContentTitle
          title={
              <>
              <strong>출금계좌번호</strong>의
              <br />
              <strong>보안카드 번호</strong>를 입력해 주세요
              </>
          }
      />

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
      
      </>
  );
};

export default Button_page;
