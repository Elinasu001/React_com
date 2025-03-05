/**
 * @fileoverview [공통] 
 *
 * @author 
 * @version 1.0.0
 */
import { GLog } from "@src/assets/js/common";
import { MainBox } from "@src/components/Box";
import { ContentTitle } from "@src/components/Text";

const COM010 = () => {

  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    <MainBox>
      {/* 컨텐츠 상단 타이틀 */}
      <ContentTitle
        title={
          <>
            <strong>정보확인 기간이 만료</strong>되어
            <br />
            <strong>재확인</strong>이 필요해요
          </>
        }
      />
    </MainBox>
  );
};

export default COM010;