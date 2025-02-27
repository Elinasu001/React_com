/**
 * @fileoverview [팝업] 샘플페이지
 *
 * @author 
 * @version 1.0.0
 */
import { MainBox } from "@src/components/Box";
import { Button01 } from "@src/components/Button";
import { DataSet } from "@assets/js/common";

const POP001: React.FC<{onClose: (data?: DataSet) => void;}> = ({ onClose }) => {
  const result: DataSet = { 'result':'콜백 가자' };
  return (
    <MainBox>
      <h1>타이틀</h1>
      <p>이것은 설명입니다.</p>
      <Button01 btnName="확인" clickFunc={() => onClose(result)} />
    </MainBox>
  );
};

export default POP001;
