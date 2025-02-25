
/**
 * @fileoverview 버튼 UI
 *
 * 사용 예시:
 * import { Button01 } from "@src/components/button";
 */
import { Button } from '@mui/material'; //Typography 타이포그래피 텍스트박스 생성 도구

/**
 * 텍스트 박스 속성
 */
interface ButtonProps {
  btnName: string;              // 버튼 이름
  width ?: string;              // 가로 길이
  clickFunc ?: () => void;      // 클릭 이벤트 함수
}

/**
 * 테스트 버튼 컴포넌트
 */
export const Button01 = ({ width, btnName, clickFunc }: ButtonProps) => {
  return (
    <Button 
      variant="contained" 
      onClick={clickFunc}
      sx={{
        width: width == null ? "80%" : width,
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

export default { Button01 };