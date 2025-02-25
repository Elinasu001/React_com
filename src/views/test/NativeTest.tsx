import { Box } from "@mui/material";
import { messageView } from '@src/components/alert';
import { TextBox01 } from "@src/components/text";
import { Button01 } from "@src/components/button";
import { progressBar } from "@src/components/loading";
import { NativeUtil } from '@assets/js/common_native';

const NativeTest = () => {
  return (
    <Box sx={{textAlign: 'center'}}>
      
      {/* 
        타이틀
      */}
      <TextBox01 text="네이티브 기능 테스트"/>


      {/* 
        네이티브 테스트 버튼 모음
      */}
      <Button01 
        btnName="디바이스 정보 조회"
        clickFunc={async () => {
          progressBar(true);
          const deviceInfo = await NativeUtil.getDeviceInfo();
          progressBar(false);
          messageView("디바이스 정보 조회 : "+JSON.stringify(deviceInfo));
        }}
      />

      <Button01 
        btnName="앱 종료"
        clickFunc={async () => {
          NativeUtil.appClose();
        }}
      />

    </Box>
  );
};

export default NativeTest;
