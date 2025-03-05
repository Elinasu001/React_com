/**
 * @fileoverview Text List UI
 *
 * 사용 예시:
 *  import { TextList } from "@src/components/TextList";
 *  <InfoList  
        title="보안매체에 따른 최대 이체한도"   // 제목
        items={[    // 내용
            "OTP - 1일 5억원, 1회 1억원",       
            "보안카드/mOTP - 1일 5천만원, 1회 1천만원",
            "보안카드/mOTP+SMS - 1일 2억5천만원, 1회 5천만원"
        ]}
    />
 * 
 */

import { Box, List, ListItem, Typography } from "@mui/material"; //Typography 타이포그래피 텍스트박스 생성 도구

interface TextListProps {
  title: string;
  items: string[];
  pb?: number;
  hideTitle?: boolean

}

//  기존 코드
export const TextList = ({ title, items, pb=5 }: TextListProps) => {
  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "start", pb}}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography>
      <List sx={{ listStyleType: "disc", pl: 2 }}>
        {items.map((item, index) => (
          <ListItem key={index} sx={{ display: "list-item", pl: 0 }}>
            <Typography variant="body2" color="textSecondary">{item}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};


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

interface labelInfoProps {
  title: string;
  param: string[];
  
}
export const TextLabel01 = ({ title, param }: labelInfoProps) => {
  return (
    <Box
      sx={{maxWidth: "100%", mx: "auto", textAlign: "start" }}
    >
    
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography> 
      <Box
        sx={{
          display: "inline-block",
          flexDirection: "column",
          padding: "8px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          fontSize: "14px",
          maxWidth: "100%",
          color: "#333", 
        }}
      >
        {param.map((line, index) => (
          <Typography key={index} sx={{ marginBottom: "4px" }}>
            {line}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};


export default { TextList, InfoList, TextLabel01 };

