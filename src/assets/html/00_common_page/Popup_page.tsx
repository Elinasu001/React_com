// 상대 경로를 사용하는 경우
import { Box, Typography } from "@mui/material";
import { ButtonContent, ButtonFooter } from "@src/assets/html/00_common/Button";
import { openBottomPopup, openFullPopup, openPopup } from "@src/assets/html/00_common/Popup";

// 팝업 컨텐츠 구조 예시
const PopupContent = () => {
    return (
    // ** 팝업에서 불러오는 화면은 <> 묵어준 뒤 content 태그와 ButtonFooter 태그로 구분 지어 주세요.
      <> 
        <Box className="content">
            <p>이것은 바텀 팝업 내용입니다.</p>
        </Box>

        <ButtonFooter
          name="버튼명"
          onClick={() => console.log("팝업 버튼 클릭")}
        />

      </>
    );
  };

const Popup_page = () => {
  return (
    <>

        {/* <ButtonContent
            buttons={[
                { 
                    name: "팝업 테스트 1",
                    onClick: () => openBottomPopup({ component: PopupContent, title: '팝업 1' }),
                },
                { 
                    name: "팝업 테스트 2",
                    onClick: () => openBottomPopup({ component: PopupContent, title: '팝업 2' }),
                },
                { 
                    name: "팝업 테스트 3",
                    onClick: () => openBottomPopup({ component: PopupContent, title: '팝업 3' })
                }
            ]}
        /> */}

        <Typography className="exp">바텀시트 팝업</Typography>

        <ButtonContent
            name="BottomSheetPopup"
            onClick={() => { openBottomPopup({ component: PopupContent, title: '바텀 팝업 타이틀'}); }}
        />

        <Typography className="exp">풀팝업</Typography>

        <ButtonContent
            name="FullPopup"
            onClick={() => { openFullPopup({ component: PopupContent, title: '풀팝업 타이틀'}); }}
        />

        <Typography className="exp">오픈팝업</Typography>

        <ButtonContent
            name="OpenPopup"
            onClick={() => { openPopup({ component: PopupContent, title: '일반팝업 타이틀'}); }}
        />
    
        
    </>
  );
};

export default Popup_page;
