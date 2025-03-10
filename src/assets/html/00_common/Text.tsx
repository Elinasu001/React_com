/**
 * @file Text.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Box, Typography } from '@mui/material';

/**
 * 컨텐츠 상단 타이틀 속성
 */
interface ContentTitleProps {
    title?: React.ReactNode; // h3 상단 타이틀 (선택적)
    desc?: React.ReactNode;   // 설명 텍스트 (선택적)
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
       *     title={
       *      <>
       *        <strong>출금계좌번호</strong>의
       *        <br />
       *        <strong>보안카드 번호</strong>를 입력해 주세요
       *      </>
      *      }
       *     desc="보안카드를 입력해주세요. 5회 오류 시 서비스가 제한됩니다." 또는 위 예시 title 형식으로도 가능
       *  />
      **/
  
      <Box className="content-tit-wrap">
        {title && <Typography variant="h3" className="tit">{title}</Typography>}
        {desc && <Typography className="desc">{desc}</Typography>}
      </Box>
    )
  }

export default ContentTitle;
