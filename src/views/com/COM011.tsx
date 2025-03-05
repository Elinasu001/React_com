/**
 * @fileoverview [공통] 보안카드 입력 화면
 *
 * @author 
 * @version 1.0.0
 */
import { Box, Input, Typography } from "@mui/material";
import { GLog } from "@src/assets/js/common";
import { ButtonFooter } from "@src/components/Button";
import { ContentTitle } from "@src/components/Text";
import { InfoList } from "@src/components/TextList";

const COM011 = () => {

  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    // ** 팝업에서 불러오는 화면은 <> 묵어준 뒤 content 태그와 ButtonFooter 태그로 구분 지어 주세요.
    <>
    <Box className="content">
      
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

      {/* 보안카드 입력 영역 */}
      <Box className="security-input-wrap flex-col gap40">

        {/* 앞 두 자리 입력 */}
        <Box>
          <Typography className="numeric-info">
            <span id="SECUNO_IDX1_text">12</span> 앞 두자리
          </Typography>
          <Box className="numeric-box flex-row gap10">
            <Input type="tel" inputProps={{ maxLength: 1 }} />
            <Input type="tel" inputProps={{ maxLength: 1 }}/>
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
          </Box>
        </Box>

        {/* 뒤 두 자리 입력 */}
        <Box>
          <Typography className="numeric-info">
            <span id="SECUNO_IDX2_text">34</span> 뒤 두자리
          </Typography>
          <Box className="numeric-box flex-row gap10">
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
            <Input type="tel" inputProps={{ maxLength: 1 }} disabled />
            <Input type="tel" inputProps={{ maxLength: 1 }} />
            <Input type="tel" inputProps={{ maxLength: 1 }} />
          </Box>
        </Box>
      </Box>

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
    </Box>
    <ButtonFooter
      buttons={[
        { name: "확인", className: "btn-primary" , disabled: true }
      ]}
    />
    </>
  );
};

export default COM011;