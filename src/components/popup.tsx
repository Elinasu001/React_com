/**
 * @fileoverview 팝업 UI
 *
 * 사용 예시:
 * import { Popup01 } from "@src/components/popup";
 */
import { useState, useEffect, lazy, Suspense} from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Button, Box, Slide, Typography, Modal, CircularProgress } from '@mui/material';

let root: Root | null = null;

interface PopupProps {
    url: string;            // 팝업으로 열 페이지 
    nFunc ?: () => void;    // 팝업 닫기 콜백
}

export const openPopup = (prop: PopupProps) => {
  const formId = 'g-popup-view';

  // 전역 컨테이너가 없으면 생성
  let container = document.getElementById(formId);
  if (!container) {
    container = document.createElement('div');
    container.id = formId;
    document.body.appendChild(container);
  }

  // 새로운 Root 생성
  if (!root) {
    root = createRoot(container);
  }

  /**
   * ✅ 팝업 컴포넌트 (자동 열림, 닫기 버튼 포함)
   */
  const Popup01 = () => {
    const [open, setOpen] = useState(false);
    const [ContentComponent, setContentComponent] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null);

    // 컴포넌트 마운트 시 자동으로 팝업 열기
    useEffect(() => {
      setOpen(true);
      loadComponent();
    }, []);

    // Vite의 dynamic import 사용
    const loadComponent = async () => {
      try {
        const componentModule = lazy(() => import(`${prop.url}`)); // 동적 경로 기반 로딩
        setContentComponent(componentModule);
      } catch (error) {
        console.error('컴포넌트 로드 실패:', error);
      }
    };

    // 팝업 닫기 및 클린업 처리
    const handleClose = () => {
      setOpen(false);
      setTimeout(() => {
        if (prop.nFunc) {
          prop.nFunc(); // 닫기 콜백 실행
        }
        if (root && container) {
          root.unmount(); // 컴포넌트 언마운트
          root = null; // 루트 초기화
          container.remove(); // DOM에서 제거
        }
      }, 300); // 애니메이션 완료 후 클린업
    };

    return (
      <Modal open={open} onClose={handleClose}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* 팝업 내용 */}
            <Box
              component="iframe"
              src={prop.url}
              sx={{
                width: '100%',
                height: '100%',
                mt:2,
                border: 'none',
              }}
            />

            {/* 닫기 버튼 */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  fontFamily: 'SCDream',
                  fontWeight: 800,
                  fontSize: '16px',
                  backgroundColor: 'primary.main',
                  ':hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
                onClick={handleClose}
              >
                닫기
              </Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
    );
  };

  root.render(<Popup01 />);
};

export default openPopup;