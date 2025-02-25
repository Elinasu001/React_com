import { Button, Box } from "@mui/material";
import { messageView } from '@src/components/alert';
import { GButtonTest } from '@src/components/button';
import { progressBar } from "@src/components/loading";
import { NativeUtil } from '@assets/js/common_native';

/**
 * 테스트 버튼
 */
const TestButton = ({btnName,clickFunc}: {
  btnName: string;
  clickFunc: () => void;
}) => {
  return (
    <Button 
      variant="contained" 
      onClick={clickFunc}
      sx={{
        width: "80%",
        fontFamily: "SCDream",
        fontWeight: 800,
        mb: 2,
        px: 4,
        py: 1.5,
        fontSize: '20px',
        borderRadius: '8px',
        boxShadow: 3,
        backgroundColor: 'primary.main',
        ':hover': {
          backgroundColor: 'primary.dark'
        }
      }}
    >
      {btnName}
    </Button>
  );
};

const NativeTest = () => {

  const { title_01 } = GButtonTest();

  return (
    <Box
    sx={{
      textAlign: 'center'}}
    >
      
      {/* 
        타이틀
      */}
      {title_01("네이티브 기능 테스트")}


      {/* 
        네이티브 테스트 버튼 모음
      */}
      <TestButton 
        btnName="디바이스 정보 조회"
        clickFunc={async () => {
          progressBar(true);
          const deviceInfo = await NativeUtil.getDeviceInfo();
          progressBar(false);
          messageView("디바이스 정보 조회 : "+JSON.stringify(deviceInfo));
        }}
      />


      
      <TestButton 
        btnName="앱 종료"
        clickFunc={async () => {
          NativeUtil.appClose();
        }}
      />

    </Box>
  );
};

export default NativeTest;
