/**
 * @fileoverview 박스 UI
 *
 * 사용 예시:
 * import { MainBox } from "@src/components/Box";
 */
import { Box as MuiBox, Box } from "@mui/material";
import { ReactNode } from "react";

export const MainBox = ({ children }: {children ?: ReactNode}) => {
  return <Box sx={{ textAlign: "center" }}>{children}</Box>;
};


export const Box01 = ({ children, padding = "16px", maxWidth = "600px" }: BoxProps) => {
  return (
    <MuiBox sx={{ maxWidth, mx: "auto", p: padding }}>
      {children}
    </MuiBox>
  );
};
