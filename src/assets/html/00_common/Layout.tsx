import { Box } from '@mui/material';
import { SubHeader } from '@src/assets/html/00_common/layout/Header';
import { BtnFotter } from '@src/assets/html/00_common/layout/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface LayoutHtmlProps {
  children: React.ReactNode;
  title: string;
  isFooter: boolean;
  isGreat: boolean;
}

const Layout = ({ children, title, isFooter, isGreat }: LayoutHtmlProps) => {
  return (
    <Box component="article" className="wrap">
      {/* 헤더는 필요한 경우에만 표시 */}
      {title && (
        <Box component="section" className="headerWrap">
          <SubHeader title={title} />
        </Box>
      )}

      <Box component="section" className="contentWrap">
        <Box component="main">
          {children}
        </Box>
      </Box>

      {isFooter && (
        <Box component="section" className="btmWrap btnGroup">
          <BtnFotter />
        </Box>
      )}
    </Box>
  );
};

export default Layout;
