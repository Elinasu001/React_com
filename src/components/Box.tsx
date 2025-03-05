/**
 * @fileoverview 박스 UI
 *
 * 사용 예시:
 * import { MainBox } from "@src/components/Box";
 */
import { ReactNode, useState } from "react";
import { Box as MuiBox, Box, Typography, Button, IconButton, Snackbar, Alert } from "@mui/material";
import LoanIcon from "@assets/images/com/svg/ico_date.svg";
import LimitImg from "@assets/images/com/svg/ico_date.svg";
import IntrateImg from "@assets/images/com/svg/ico_date.svg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

export const MainBox = ({ children }: {children ?: ReactNode}) => {
  return <Box sx={{ textAlign: "center" }}>{children}</Box>;
};


interface BoxProps {
  children?: React.ReactNode;
  padding?: string;
  maxWidth?: string;
}

export const Box01 = ({ children, padding = "16px", maxWidth = "600px" }: BoxProps) => {
  return (
    <MuiBox sx={{ maxWidth, mx: "auto", p: padding }}>
      {children}
    </MuiBox>
  );
};

/**
 * 박스 속성2
 */
interface Box02Props {
  title: string;          // 제목
  description: string;    // 설명
  buttonText: string;     // 버튼 텍스트
  onButtonClick: () => void;
}

/**
 * 박스 컴포넌트2
 */
export const Box02 = ({ title, description, buttonText, onButtonClick }: Box02Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F8F8F8",
        borderRadius: "12px",
        textAlign: "center",
        py: 4,
      }}
    >
      {/* 아이콘 */}
      <Box>
        <Box
          component="img" src={LoanIcon} alt="대출한도조회" sx={{ width: 60, height: 60 }}/>
        </Box>
      {/* 제목 */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 0.5 }}>
        {title}
      </Typography>

      {/* 설명 */}
      <Typography variant="body1" sx={{ mt: 0.5 }}>
        {description}
      </Typography>

      {/* 버튼 */}
      <Button
        variant="text"
        sx={{
          mt: 0.5,
          fontSize: "15px",
          fontWeight: "bold",
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
          "&:hover": { backgroundColor: "transparent" },
          "&:focus": { outline: "none" },
        }}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

/**
 * 박스 속성3
 */
interface Box03Props {
  categoty: string;       // 카테고리
  title: string;          // 제목
  //keyword: string[];    // 키워드
  subtitle1: string;      // 소제목1
  subtitle2: string;      // 소제목2
  contents1: string;      // 내용1
  contents2: string;      // 내용2
}

/**
 * 스타일 지정 (아이콘 클릭 시 테두리 제거)
 */
const StyledIconButton = styled(IconButton)({
  outline: "none",
  "&:focus": { outline: "none" },
  "&:hover": { backgroundColor: "transparent" },
  "&.active": { color: "Salmon" },
});

/**
 * 박스 컴포넌트3
 */
export const Box03 = ({ categoty, title, subtitle1, subtitle2, contents1, contents2 }: Box03Props) => {

  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 관심상품 클릭
  const handleGiftClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    setSnackbarMessage(
      isFavorite ? "관심 상품에서 제외되었습니다." : "관심 상품으로 등록되었습니다."
    );
    setSnackbarOpen(true);
  };

  // 알림 닫기
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F8F8F8",
        borderRadius: "12px",
        py: 3,
      }}
    >
      {/* 카테고리 + 관심상품 아이콘 */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
        <Typography
        variant="body2"
        sx={{
          border: "1px solid",
          color: "Salmon !important",
          px: 1,
          py: 0.1,
          borderRadius: 5,
          fontWeight: "bold",
          width: "fit-content",
        }}
        >
          {categoty}
        </Typography>

        {/* 관심상품 아이콘 */}
        <StyledIconButton
          onClick={handleGiftClick}
          disableRipple
          className={isFavorite ? "active" : ""}
          sx={{ position: "absolute", right: 15 }}
        >
          <FavoriteIcon/>
        </StyledIconButton>
      </Box>

      {/* 상품명 */}
      <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
        {title}
      </Typography>

      {/* 키워드 */}
      {/* <Typography variant="body2" sx={{ mt: 1, }}>
        {keyword.join(" | ")}
      </Typography> */}

      {/* 최대한도 & 대출금리 (이미지 + 텍스트 포함) */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 10, mt: 2 }}>
        {/* 한도 정보 */}
        <Box sx={{ textAlign: "center" }}>
        <Box
          component="img" src={LimitImg} alt="최대한도"
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#fff",
            p: 1,
          }}
        />
        <Typography variant="body2" sx={{ mt: 0.5, fontWeight: "bold" }}>
          {subtitle1}
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.5, fontWeight: "bold" }}>
          {contents1}
        </Typography>
        </Box>

        {/* 대출금리 정보 */}
        <Box sx={{ textAlign: "center" }}>
        <Box
          component="img" src={IntrateImg} alt="대출금리"
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#fff",
            p: 1,
          }}
        />
        <Typography variant="body2" sx={{ mt: 0.5, fontWeight: "bold" }}>
          {subtitle2}
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.5, fontWeight: "bold" }}>
          {contents2}
        </Typography>
        </Box>
      </Box>

      {/* 알림창 */}
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={1000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
      <Alert onClose={handleSnackbarClose} severity="info">
        {snackbarMessage}
      </Alert>
      </Snackbar>
    </Box>

  );
};

interface ListItem {
  key: string;
  label: ReactNode;
  onClick?: () => void;
}

interface BoxListProps {
  items: ListItem[];
  selectedKey?: string;
  filterPrefix?: string;
}

export function BoxList({ items, selectedKey, filterPrefix = "" }: BoxListProps) {
  return (
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
      {items
        .filter((item) => item.key.startsWith(filterPrefix)) // 특정 접두사로 필터링 가능
        .map((item) => (
          <Box
            key={item.key}
            component="li"
            sx={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: item.onClick ? "pointer" : "default",
              backgroundColor: selectedKey === item.key ? "#f0f0f0" : "transparent",
              "&:hover": item.onClick ? { backgroundColor: "#e0e0e0" } : {},
            }}
            onClick={item.onClick}
          >
            {item.label}
          </Box>
        ))}
    </Box>
  );
};

export default { MainBox, Box01, Box02, Box03, BoxList };
