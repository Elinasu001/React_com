/**
 * @fileoverview [공통] 보안카드 입력 화면
 *
 * @author 
 * @version 1.0.0
 */
import { MainBox } from "@src/components/box";
import { Button01 } from "@src/components/Button";

const COM011 = () => {
  return (
    <MainBox>
      <h1>타이틀</h1>
      <p>이것은 설명입니다.</p>
      <Button01 btnName="확인" />
    </MainBox>
  );
};

export default COM011;
