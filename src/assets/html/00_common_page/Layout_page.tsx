import React from 'react';
import { Box } from "@mui/material";


const LayoutPage = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 100px)',
      color: '#121212'
    }}>
      컨텐츠 영역
    </Box>
  );
};

export default LayoutPage;
