/**
 * @file List.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, List, ListItem, Typography } from "@mui/material";

//버튼리스트
interface ListItemType {
  id: number;
  label: string;
}

interface ListButtonProps {
  items: ListItemType[];
  onClick?: (id: number) => void; // 클릭 이벤트 추가
}

export const ListButton = ({ items, onClick }: ListButtonProps) => {
  return (
    <List className="list-button-wrap">
        {items.map(({ id, label }) => (
        <ListItem key={id} >
            <Button
            aria-label={`옵션 선택: ${label}`} // 접근성을 위해 데이터에 들어가는 label과 맞춰주세요. ex)List_page.tsx
            onClick={() => onClick?.(id)} // 클릭 이벤트 핸들러
            >{label}</Button>
        </ListItem>
      ))}
    </List>
  );
};


//게시판리스트
export const NotiList = ({
  items,
  isEventList = false, // Data인지 여부를 판별하는 prop 추가
}: {
  items: { id: number; category?: string; label: string; date?: string; icon?: boolean; image?: string }[];
  isEventList?: boolean;
}) => {
  return (
    <List className={`list-button-wrap noti-list ${isEventList ? "event" : ""}`}>
      {items.map(({ id, category, label, date, icon, image }) => (
        <ListItem key={id} className={`list-item ${icon ? "has-icon" : ""}`}>

          {/* 웹접근성을 위해 aria-label 및 label 은 필수로 맞춰주세요. */}

          <Button 
            aria-label={`${
            isEventList ? "이벤트" : "공지사항"
            } - ${label}${date ? `, 기간: ${date}` : ""}${category ? `, 카테고리: ${category}` : ""}`}
          >

             {/* isEventList가 true일 때만 이미지 박스 표시 */}
             {isEventList && (
              <Box className="list-image">
                <img src={image || "/default-image.png"} alt={image ? `${label} 관련 이미지` : "기본 이미지"} />
              </Box>
            )}

            <Box className="list-info">
              {/* 카테고리 (있을 경우만 출력) */}
              {category && <span className="list-category">{category}</span>}

              {/* 텍스트 내용 ( 파일아이콘 있을 경우만 출력 )*/}
              <Typography className="list-name">
                {label}
                {icon && <AttachFileIcon className="file-clip" aria-hidden="true" /> }
              </Typography>

              {/* 날짜 (있을 경우만 출력) */}
              {date && <span className="list-date">{date}</span>}
            </Box>

            </Button>
        </ListItem>
      ))}
    </List>
  );
};


export default { ListButton, NotiList };
