
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
 * 컨텐츠 상단 타이틀 속성
 */
interface ContentTitleProps {
  title?: React.ReactNode; // h3 상단 타이틀 (선택적)
  desc?: string;   // 설명 텍스트 (선택적)
}

/**
 *  컨텐츠 상단 타이틀
 */
export const ContentTitle = ({ title, desc }: ContentTitleProps) => {
  return (

    /**
     * title[default(큰타이틀)] or desc[설명 텍스트] 선택 사용
     * 예시)
     * <ContentTitle
     *     title="보안카드 입력"
     *     desc="보안카드를 입력해주세요. 5회 오류 시 서비스가 제한됩니다."
     *  />
    **/

    <Box className="content-tit-wrap">
      {title && <Typography variant="h3" className="tit">{title}</Typography>}
      {desc && <Typography className="txt">{desc}</Typography>}
    </Box>
  )
}

export default { TextBox01 , TextBox02, ContentTitle };