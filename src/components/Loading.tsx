/**
 * @fileoverview 로딩 UI
 *
 * 사용 예시:
 * import { progressBar } from "@assets/ui/loading";
 */
import { Backdrop, Typography, Box } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import { keyframes } from '@emotion/react';
import React from "react";

// 회전 애니메이션 정의 (2초에 한 바퀴)
const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

/**
 * 로딩 on/off
 * @param isLoading 로딩 여부 (true: 표시, false: 제거)
 * @param loadingText 로딩 중에 표시할 텍스트 (옵션)
 */
export function progressBar(isLoading: boolean, msg?: string) {
  const formId = "gProgressBar";
  document.getRoot(formId).render(
    React.createElement(() => {
      //팝업 컴포넌트 생성
      return (
        <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        transition: 'background-color 0.3s ease',
      }}
      open={isLoading}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SavingsIcon
          sx={{
            fontSize: 80,
            animation: `${spinAnimation} 1.5s linear infinite`,
            mb: 2,
          }}
        />
        {msg && (
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              fontWeight: 'bold',
              letterSpacing: '0.5px',
            }}
          >
            {msg}
          </Typography>
        )}
      </Box>
    </Backdrop>
      );
    })
  );
}
export default { progressBar };
