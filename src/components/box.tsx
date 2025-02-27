/**
 * @fileoverview 박스 UI
 *
 * 사용 예시:
 * import { MainBox } from "@src/components/Box";
 */
import { Box } from "@mui/material";
import { ReactNode } from "react";

export const MainBox = ({ children }: {children ?: ReactNode}) => {
  return <Box sx={{ textAlign: "center" }}>{children}</Box>;
};


export default MainBox;