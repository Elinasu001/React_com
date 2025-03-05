import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

// common
import { getParameter } from '@assets/js/common';

//components
import { MainBox, Box01 } from "@src/components/Box";
import { Button01 } from "@src/components/Button";

const EFC008_1 = () => {
  
    const navigate = useNavigate();
    const param = getParameter(useLocation()); // EFC008(이체한도관리)화면에서 넘겨받은 param

  {/* 개인적으로 css 적용한 부분은 추후에 컴포넌트에 맞춰 수정*/}

  return (

    <MainBox>
      {/* 이체한도 변경 결과 */}
      <Box01>
        <Box>
          
          {/* 이체한도 변경 실패 화면 */}
          {param.getString("API_RS_MSG") !== "SUCCESS" && (
            <Box01>
                <Typography variant="h6" fontWeight="bold">
                    이체한도 변경 중 <br /> 오류가 발생했어요
                </Typography>
                <Typography>잠시 후 다시 시도해주세요</Typography>
            </Box01>
          )}

          {/* 이체한도 변경 성공 화면 */}
          {param.getString("API_RS_MSG") === "SUCCESS" && (
            <Box01>
              <Typography variant="h6" fontWeight="bold">
                {param.getNumber("BF_TI1_TRNF_LMIT") < param.getNumber("TI1_TRNF_LMIT") ? "요청하신 이체한도 증액이 완료되었어요" : "요청하신 이체한도 감액이 완료되었어요"}
              </Typography>

                {/* 이체한도 변경 내역 */}
                <Typography variant="h6" textAlign="center">이체한도 변경내역</Typography>

                {/* 1회 이체한도 */}
                <Box01>
                  <Typography variant="body1" fontWeight="bold">1회 이체한도</Typography>
                  <Box>
                    <Typography>{param.getNumber("BF_TI1_TRNF_LMIT").toLocaleString()} 원</Typography>
                    <Typography>➡</Typography>
                    <Typography>{param.getNumber("TI1_TRNF_LMIT").toLocaleString()} 원</Typography>
                  </Box>
                </Box01>

                {/* 1일 이체한도 */}
                <Box01>
                  <Typography variant="body1" fontWeight="bold">1일 이체한도</Typography>
                  <Box>
                    <Typography>{param.getNumber("BF_DD1_TRNF_LMIT").toLocaleString()} 원</Typography>
                    <Typography>➡</Typography>
                    <Typography>{param.getNumber("DD1_TRNF_LMIT").toLocaleString()} 원</Typography>
                  </Box>
                </Box01>

            </Box01>
          )}
        </Box>

        {/* 홈으로 가기 버튼 */}
        <Button01 btnName="홈으로" clickFunc={() => navigate("/")}></Button01>
      </Box01>
    </MainBox>

  );
};

export default EFC008_1;
