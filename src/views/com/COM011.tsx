/**
 * @fileoverview [공통] 보안카드 입력 화면
 *
 * @author 
 * @version 1.0.0
 */
import { GLog } from "@src/assets/js/common";
import { MainBox } from "@src/components/Box";
import { ContentTitle } from "@src/components/Text";
import { TextList } from "@src/components/TextList";

const COM011 = () => {

  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    <MainBox>

      <ContentTitle
        title={
          <>
            출금계좌번호의
            <br />
            보안카드 번호를 입력해 주세요
          </>
        }
      />

      <TextList
          title="보안카드 입력 안내"
          items={[
            "5회 오류 시 서비스 이용이 중단되고 메인으로 이동해요",
            "오류 해제를 원하실 경우 영업점에 방문해 이용제한 해제를 하셔야 해요"
          ]}
          hideTitle={true}
        />

    </MainBox>
  );
};

export default COM011;