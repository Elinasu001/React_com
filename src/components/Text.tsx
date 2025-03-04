
/**
 * @fileoverview 버튼 UI
 *
 * 사용 예시:
 *  import { TextBox01 } from "@src/components/text";
 *  <TextBox01 text="내부 기능 테스트"/>
 * 
 */
import { Box, Typography } from '@mui/material'; //Typography 타이포그래피 텍스트박스 생성 도구

/**
 * 텍스트 박스 속성
 */
interface TextBoxProps {
  text: string;
}

/**
 * 컨텐츠 상단 타이틀 속성
 */
interface ContentTitleProps {
  title?: React.ReactNode; // h3 제목 (선택적)
  text?: string;   // 추가 텍스트 (선택적)
}

/**
 * 굵은 글자 박스
 * @param btnName 
 * @returns 
 */
export const TextBox01 = ({ text }: TextBoxProps) => {
  return (
    <Typography 
    sx={{
      fontFamily: "SCDream",
      fontWeight: 800,
      fontSize: "30px",
      color: 'primary.black',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
      mb: 4,
    }}
    >
    {text}
    </Typography>
  )
}

/**
 * 보통 글자 박스
 * @param btnName 
 * @returns 
 */
export const TextBox02 = ({ text }: TextBoxProps) => {
  return (
    <Typography 
    sx={{ 
      fontFamily: "SCDream",
      fontWeight: 300,
      fontSize: "30px",
      color: 'primary.black',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
      mb: 4,
    }}
    >
    {text}
    </Typography>
  )
}

/**
 *  컨텐츠 상단 타이틀
 */
export const ContentTitle = ({ title, text }: ContentTitleProps) => {
  return (
    <Box className="content-tit-wrap">
      {title && <Typography variant="h3" className="tit">{title}</Typography>}
      {text && <Typography className="txt">{text}</Typography>}
    </Box>
  )
}

export default { TextBox01 , TextBox02, ContentTitle };