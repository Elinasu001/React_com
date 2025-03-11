/**
 * @file List.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, List, ListItem, Typography } from "@mui/material";

interface ListItemType {
  id: number;
  label: string;
}

interface ListButtonProps {
  items: ListItemType[];
}

export const ListButton = ({ items }: ListButtonProps) => {
  return (
    <List className="list-button-wrap">
        {items.map(({ id, label }) => (
        <ListItem key={id}>
           <Button>{label}</Button>
        </ListItem>
      ))}
    </List>
  );
};


export const NotiList = ({
  items,
  isEventList = false, // eventListData인지 여부를 판별하는 prop 추가
}: {
  items: { id: number; category?: string; label: string; date?: string; icon?: boolean; image?: string }[];
  isEventList?: boolean;
}) => {
  return (
    <List className={`list-button-wrap noti-list ${isEventList ? "event" : ""}`}>
      {items.map(({ id, category, label, date, icon, image }) => (
        <ListItem key={id} className={`list-item ${icon ? "has-icon" : ""}`}>
          <Button>

             {/* isEventList가 true일 때만 이미지 박스 표시 */}
             {isEventList && (
              <Box className="list-image">
                <img src={image || "/default-image.png"} alt="이미지" />
              </Box>
            )}

            <Box className="list-info">
              {/* 카테고리 (있을 경우만 출력) */}
              {category && <span className="list-category">{category}</span>}

              {/* 텍스트 내용 ( 파일아이콘 있을 경우만 출력 )*/}
              <Typography className="list-name">
                {label} {icon && <AttachFileIcon className="file-clip"/> }
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
