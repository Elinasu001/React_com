/**
 * @fileoverview [팝업] 샘플페이지
 *
 * @author 
 * @version 1.0.0
 */
import { MainBox } from "@src/components/Box";
import { Button01 } from "@src/components/button";

const POP001: React.FC<{onClose: (data?: string) => void;}> = ({ onClose }) => {
  return (
    <MainBox>
      <h1>타이틀</h1>
      <p>이것은 설명입니다.</p>
      <Button01 btnName="확인" clickFunc={() => onClose("데데")} />
    </MainBox>
  );
};

export default POP001;
