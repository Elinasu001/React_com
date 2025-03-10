/**
 * @file Textlist.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Box, List, ListItem, Typography } from "@mui/material";

interface InfoListProps {
  title: string;
  items: string[];
  pb?: number;
  hideTitle?: boolean // 타이틀 안보이게 처리
  titleIcon?: boolean; // 타이틀 아이콘 클래스 적용
  listIcon?: boolean; // 리스트 아이콘 클래스 적용

}


//  ! 정보 리스트
export const InfoList = ({ title, items, hideTitle = false, titleIcon = false, listIcon = false  }: InfoListProps) => {
  return (

      /**
       *  default :: bullet 형태
       *  타이틀 아이콘 적용 :: titleIcon [ !! titleIcon 쓰일 경우 불러오는 화면 에서 hideTitle={true} 삭제 필요 ]
       *  리스트 아이콘 적용 :: listIcon
       * 예시)
       * <InfoList
       *     title="정보 리스트"
       *     items={["항목 1", "항목 2", "항목 3"]}
       *     titleIcon={true}  // "titleIcon" 클래스 적용
       *     listIcon={true}   // "listIcon" 클래스 적용
       *   />
       **/

    <Box className={`info-wrap ${titleIcon ? "titleIcon" : ""} ${listIcon ? "listIcon" : ""}`}>
      
      {title && (
        // hideTitle 이 true면 sr-only [스크린 리더 전용(안보이게 처리)] 클래스 적용
        <Typography variant="h6" className= {`${hideTitle ? "sr-only" : ""} info-tit`}>
          {title}
        </Typography>
      )}

      <List className="info-list">
        {items.map((item, index) => (
          <ListItem key={index}>
            <>{item}</>
          </ListItem>
        ))}
      </List>
      
    </Box>
  );
};



export default { InfoList };