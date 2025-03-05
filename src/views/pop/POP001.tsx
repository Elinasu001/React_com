/**
 * @fileoverview [팝업] 샘플페이지
 *
 * @author 
 * @version 1.0.0
 */
import { Box } from '@mui/material';
import DataSet from "@src/assets/io/DataSet";
import { ButtonFooter } from "@src/components/Button";

const POP001 = ({ param, onClose }: { param: DataSet; onClose: (data?: DataSet) => void }) => {
  const result = new DataSet({ result: "콜백 가자" });

  return (
    // ** 팝업에서 불러오는 화면은 <> 묵어준 뒤 content 태그와 ButtonFooter 태그로 구분 지어 주세요.
    <>
      <Box className="content">
        <h1>타이틀</h1>
        <p>이것은 설명입니다. : {param.getString("aa")}</p>
      </Box>

      {/* 필요한 버튼 개수와 스타일을 선택 가능 */}
      <ButtonFooter
        buttons={[
          { name: "취소", className: "btn-secondary" }, // 취소 버튼 먼저
          { name: "닫기", className: "btn-primary", onClick: () => onClose(result) }, // 기본 버튼 (닫기)
          { name: "확인", className: "btn-outlined" }, // 확인 버튼 마지막
        ]}
      />

    </>
  );
};

export default POP001;
