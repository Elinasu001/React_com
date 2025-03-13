
import { Typography } from "@mui/material";
import { ContentTitle } from "@src/assets/html/00_common/Text";
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
      
      </>
  );
};

export default Text_page;
