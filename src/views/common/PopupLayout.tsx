import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const PopupLayout = () => {

  return (
    <Box>
      <Box
        component="main"
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          m: 1,
          overflow: 'auto',
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default PopupLayout;
