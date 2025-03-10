// 상대 경로를 사용하는 경우
import { Box } from "@mui/material";
import { ButtonContent, ButtonFooter } from "@src/assets/html/00_common/Button";
import { openBottomPopup } from "@src/assets/html/00_common/Popup";

// 팝업 컨텐츠 구조 예시
const PopupContent = () => {
    return (
      <> 
        <Box className="content">
            <p>이것은 바텀 팝업 내용입니다.</p>
        </Box>

        <ButtonFooter
          name="닫기"
          onClick={() => console.log("팝업 버튼 클릭")}
        />

      </>
    );
  };

const Popup_page = () => {
  return (
    <>
        <ButtonContent
            name="팝업 테스트"
            onClick={() => { openBottomPopup({ component: PopupContent, title: '바텀 테스트'}); }}
        />
    
        <ButtonContent
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
        />

    </>
  );
};

export default Popup_page;
