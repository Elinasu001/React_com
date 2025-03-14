import { createTheme, ThemeOptions } from "@mui/material/styles";

const commonFontFamily = '"Pretendard", "Roboto", "Helvetica", "Arial", "sans-serif" !important';

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: commonFontFamily,
    allVariants: {
      fontFamily: commonFontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          border: "inherit",
          background: "inherit",
          color: "inherit",
          fontFamily: commonFontFamily,
          outline: "inherit",
          textDecoration: "inherit",
          transition: "all 0.2s ease-in-out",
        },
        body: {
          backgroundColor: "transparent",
          fontFamily: commonFontFamily,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
          fontFamily: commonFontFamily,
          color: "inherit",
          lineHeight: "inherit",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true, // 버튼 클릭 효과 제거
      },
      styleOverrides: {
        root: {
          fontFamily: commonFontFamily,
          padding: 0,
          margin: 0,
          minWidth: "auto",
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
          background: "transparent",
          color: "inherit",
          textTransform: "none",
          fontSize: "inherit",
          fontWeight: "inherit",
          "&:hover": {
            background: "transparent",
            boxShadow: "none",
          },
          "&:active": {
            background: "transparent",
            boxShadow: "none",
          },
          "&:focus": {
            background: "transparent",
            boxShadow: "none",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0, // 리스트 패딩 제거
          margin: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: 0, // 리스트 아이템 패딩 제거
          margin: 0,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
          border: "none",
          background: "transparent",
          color: "inherit",
          "& .MuiInputBase-root": {
            padding: 0,
            margin: 0,
            border: "none",
            background: "transparent",
            color: "inherit",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
