import { Box, Container } from '@mui/material';
import Header from '@views/common/Header';
import Footer from '@views/common/Footer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {headerHeight,bottomNavHeight, GLog} from "@assets/js/common"
import { useEffect } from 'react';
import { navigationRef } from '@assets/js/service/navigationService'; // 전역 네비게이션 ref
import { locationRef } from '@assets/js/service/useLocationService'; // 전역 로케이션 ref

const Layout = () => {

  const currentNavigate = useNavigate();
  const currentLocation = useLocation();

  useEffect(() => {
    navigationRef.current = currentNavigate;
    locationRef.current = currentLocation;
  }, [currentNavigate,currentLocation]);
  

  return (
    <Box component="article" className="wrap">
    {/* 고정 헤더 */}
    <Box component="section" className="headerWrap">
      <Header />
    </Box>


    <Box component="section" className="contentWrap">
      <Box component="main">
      <Container maxWidth={false}>
        <Outlet />
      </Container>
      </Box>
    </Box>

    <Box component="section" className="btmWrap">
      <Footer />
    </Box>

  </Box>
  );
};

export default Layout;
