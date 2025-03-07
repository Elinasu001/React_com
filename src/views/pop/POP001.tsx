/**
 * @fileoverview [팝업] 샘플페이지
 *
 * @author 
 * @version 1.0.0
 */
import { Box } from '@mui/material';
import DataSet from "@src/assets/io/DataSet";
import { PopupViewProps } from '@src/assets/js/props/PopupViewProps';
import { ButtonFooter } from "@src/components/Button";

const POP001 = (prop: PopupViewProps) => {
  
  const result = new DataSet({ result: "콜백 가자" });

  return (
    
    <>
      <Box className="content">
        <h1>타이틀</h1>
        <p>이것은 설명입니다. : {prop.param?.getString("aa")}</p>
      </Box>

      {/* 필요한 버튼 개수와 스타일을 선택 가능 */}
      <ButtonFooter
        buttons={[
          { name: "버튼명", className: "btn-secondary"},
          { name: "버튼명", className: "btn-primary", onClick: () => prop.onClose?.(result) },
          { name: "버튼명", className: "btn-outlined"},
        ]}
      />

    </>
  );
};

export default POP001;
