
/**
 * @fileoverview 버튼 UI
 *
 * 사용 예시:
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

    // 버튼 감싸는 클래스 :: 컨텐츠 .btn-area, 팝업 .popup-footer, 페이지 하단 .content-footer
    <Box className="btn-area gap10">

      {/* secondary - 라인 스타일 [variant 확인] */}
      <Button className="btn btn-secondary"  variant="outlined" onClick={clickFunc}>
        {btnName}
      </Button>

      {/* primary 버튼 */}
      <Button className="btn btn-primary"  variant="contained" onClick={clickFunc}>
        {btnName}
      </Button>

      {/* secondary 버튼 */}
      <Button className="btn btn-secondary"  variant="contained"  onClick={clickFunc}>
        {btnName}
      </Button>
      
    </Box>

  );
};

export default { Button01 };