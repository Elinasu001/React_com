import { Box } from "@mui/material";
import { TextBox01 } from "@src/components/text";

/**
 * 일반 테스트 화면 드로잉
 */
const InputTest = () => {

  return (
    <Box sx={{textAlign: 'center'}}>

      <TextBox01 text="폼 테스트"/>

    </Box>
  );
};

export default InputTest;