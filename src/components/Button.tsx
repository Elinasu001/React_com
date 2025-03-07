
/**
 * @fileoverview 버튼 UI
 *
 * 사용 예시:
<<<<<<< HEAD
 * import { Button01 } from "@src/components/button";
 */
import { Box, Button } from '@mui/material'; //Typography 타이포그래피 텍스트박스 생성 도구

/**
 * 텍스트 박스 속성
 */
interface ButtonProps {
  btnName: string;              // 버튼 이름
  width ?: string;              // 가로 길이
  fontSize ?: string;           // 가로 길이
  clickFunc ?: () => void;      // 클릭 이벤트 함수
  disabled?: boolean;           // 버튼상태
}

/**
 * 테스트 버튼 컴포넌트
 */
// export const Button01 = ({ btnName, width, fontSize, clickFunc }: ButtonProps) => {
//   return (
//     <Button 
//       variant="contained"
//       onClick={clickFunc}
//       sx={{
//         width: width == null ? "80%" : width,
//         fontFamily: "SCDream",
//         fontWeight: 800,
//         m: 1,
//         px: 1,
//         py: 1.5,
//         fontSize: fontSize == null ? '20px' : fontSize,
//         borderRadius: '8px',
//         boxShadow: 3,
//         backgroundColor: 'primary.main',
//         ':hover': {
//           backgroundColor: 'primary.dark'
//         }
//       }}
//     >
//       {btnName}
//     </Button>
//   );
// };

export const Button01 = ({ btnName, clickFunc }: ButtonProps) => {
  return (

    // 컨텐츠
    <Box className="btn-area gap10">
      {/* primary 버튼 */}
      <Button className="btn btn-primary"  variant="contained" onClick={clickFunc}>
        {btnName}
      </Button>

    </Box>

  );
};

// 컨텐츠 버튼 속성
interface ButtonContentProps {
  clickFunc ?: () => void;      // 클릭 이벤트 함수
  buttons: { name: string; className: string; onClick?: () => void; disabled?: boolean }[]; // 모든 버튼 리스트 (기본 버튼 포함)
}

export const ButtonContent = ({ buttons }: ButtonContentProps) => {
  return (

    /** 컨텐츠 버튼
    * 예시)
    * <ButtonContent
    *    buttons={[
    *     { name: "버튼명", className: "btn-secondary" },
    *      { name: "버튼명", className: "btn-primary", onClick: () => onClose(result) },
    *      { name: "버튼명", className: "btn-outlined" },
    *    ]}
    *  />
    *
    **/

    // 컨텐츠
    <Box  className="btn-area">
    {/* 모든 버튼 buttons 배열에서 렌더링 (순서 조정 가능) */}
    {buttons.map((btn, index) => (
      <Button
        key={index}
        className={`btn ${btn.className}`}
        onClick={btn.onClick} // 개별 버튼 클릭 이벤트 적용
        disabled={btn.disabled ?? false} // 기본값 false // 버튼별 개별 disabled 적용을 위해 이 식으로 변경
      >
        {btn.name}
      </Button>
    ))}
    </Box>

  );
};


// 하단 버튼 속성
interface ButtonFooterProps {
  clickFunc ?: () => void;      // 클릭 이벤트 함수
  buttons: { name: string; className: string; onClick?: () => void; disabled?: boolean }[]; // 모든 버튼 리스트 (기본 버튼 포함)
}

export const ButtonFooter = ({ buttons }: ButtonFooterProps) => {
  return (
    // ** 팝업에서 불러오는 화면은 <> 묵어준 뒤 content 태그와 ButtonFooter 태그로 구분 지어 주세요.

    /** 하단 버튼
    * 예시)
    * <ButtonFooter
    *    buttons={[
    *     { name: "버튼명", className: "btn-secondary" },
    *      { name: "버튼명", className: "btn-primary", onClick: () => onClose(result) },
    *      { name: "버튼명", className: "btn-outlined" },
    *    ]}
    *  />
    *
    **/

    <Box className="content-footer">
      {/* 모든 버튼 buttons 배열에서 렌더링 (순서 조정 가능) */}
      {buttons.map((btn, index) => (
        <Button
          key={index}
          className={`btn ${btn.className}`}
          onClick={btn.onClick} // 개별 버튼 클릭 이벤트 적용
          disabled={btn.disabled ?? false} // 기본값 false // 버튼별 개별 disabled 적용을 위해 이 식으로 변경
        >
          {btn.name}
        </Button>
      ))}
    </Box>
  );
};


export const Button04 = ({ btnName, clickFunc, disabled }: ButtonProps) => {
  return (
    <Box className="btn-area gap10">
      <Button
        className="btn btn-primary" // 기존 스타일 유지 ✅
        variant="contained"
        onClick={clickFunc}
        disabled={disabled}
        sx={{opacity: disabled ? 0.6 : 1,}}
      >
        {btnName}
      </Button>
    </Box>
  );
};



// export const Popupfooter = ({ btnName, clickFunc }: ButtonProps) => {
//   return (
    
//     // 페이지 하단 [레이아웃 작업 시 test 필요 [작업 중] ]
//     <Box className="popup-footer gap10">

//       {/* secondary - 라인 스타일 [variant 확인] */}
//       <Button className="btn btn-secondary"  variant="outlined" onClick={clickFunc}>
//         {btnName}
//       </Button>

//       {/* primary 버튼 */}
//       <Button className="btn btn-primary"  variant="contained" onClick={clickFunc}>
//         {btnName}
//       </Button>

//       {/* secondary 버튼 */}
//       <Button className="btn btn-secondary"  variant="contained"  onClick={clickFunc}>
//         {btnName}
//       </Button>
      
//     </Box>

//   );
// };



export default { Button01, ButtonContent, Button04, ButtonFooter };

