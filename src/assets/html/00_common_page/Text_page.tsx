
import { Typography } from "@mui/material";
import { ContentTitle, SubTitle } from "@src/assets/html/00_common/Text";
const Text_page = () => {
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

        {/* [2025-03-26 추가] */}
        <Typography className="exp">컨텐츠 서브 타이틀_버튼 있을 경우</Typography>
        <SubTitle
          title="입금 계좌"
          buttons={[
            { name: "최근입금계좌", clickFunc: () => console.log("클릭됨") },
          ]}
        />
        <Typography className="exp">컨텐츠 서브 타이틀_버튼 없을 경우</Typography>
        <SubTitle title="입금 계좌"/>
        
      </>
  );
};

export default Text_page;
