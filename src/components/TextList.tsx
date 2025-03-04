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

interface InfoListProps {
  title: string;
  items: string[];
  pb?: number;
  hideTitle?: boolean; // title 숨기기 여부 추가
}

export const TextList = ({ title, items, hideTitle = false }: InfoListProps) => {
  return (
    <Box className="info-wrap">
      {/* <Typography variant="h6">{title}</Typography> */}
      {title && (
        <Typography
          variant="h6"
          className={hideTitle ? "sr-only" : ""} // hideTitle이 true면 sr-only 클래스 적용
        >
          {title}
        </Typography>
      )}
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <>{item}</>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TextList;
