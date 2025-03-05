/**
 * @fileoverview [공통] 
 *
 * @author 
 * @version 1.0.0
 */
import { GLog } from "@src/assets/js/common";
import { MainBox } from "@src/components/Box";
import { ContentTitle } from "@src/components/Text";
import { SelectBox02 } from '@src/components/SelectBox';

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
        desc={
          <>
            본 제도는 「특정금융거래보고법」과
            <br />
            금융정보분석원 고시 「자금세탁방지 및
            <br />
            공중협박자금조달금지 업무규정」에 따라
            <br />
            1년 주기로 고객정보를 재확인 하고 있습니다
          </>
        }
      />

      
              

      {/* 컨텐츠 */}


    </MainBox>
  );
};

export default COM010;