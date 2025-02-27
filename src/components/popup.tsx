/**
 * @fileoverview 팝업 UI
 *
 * 사용 예시:
 * import { openBottomPopup } from "@src/components/popup";
 */
// import "@assets/styles/css/common.css";
import { Box, Button, Modal, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { DataSet } from '@assets/js/common';

let root: Root | null = null;

/**
 * 팝업 파라미터 정의
 */
interface PopupProps {
  component: React.FC<{ onClose: (data?: DataSet) => void }>; // 팝업으로 열 페이지
  title ?: string;                                            // 팝업 타이틀
  nFunc ?: (data?: DataSet) => void;                          // 팝업 닫기 콜백
}

/**
 *  밑에서 올라는 팝업
 */
export const openBottomPopup = ({ component: Component, nFunc }: PopupProps) => {
  const formId = "g-popup-bottom-view";
  document.getRoot(formId).render(
    React.createElement(() => {
      const [open, setOpen] = useState(false);

      useEffect(() => {
        setOpen(true);
      }, []);

      const popupClose = () => {
        setOpen(false);
        setTimeout(() => {
          document.removeRoot(formId);
          nFunc?.();
        }, 300);
      };

      return (
        <Modal open={open} onClose={popupClose}>
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box className="popup-container btmSheet">
              <Box className="pop-header">
                <h2 className="pop-tit">바텀 팝업 타이틀</h2>
                <Button aria-label="close" onClick={popupClose} className="btn btn-close right">
                  <span className="sr-only">닫기</span>
                </Button>
              </Box>
              <Box className="pop-body">
                <Component onClose={popupClose} />
              </Box>
            </Box>
          </Slide>
        </Modal>
      );
    })
  );
};


export const openBottomPopup2 = (prop: PopupProps) => {
  const formId = 'g-popup-view';

  // 전역 컨테이너가 없으면 생성
  let container = document.getElementById(formId);
  if (!container) {
    container = document.createElement('Box');
    container.id = formId;
    document.body.appendChild(container);
  }

  // 새로운 Root 생성
  if (!root) {
    root = createRoot(container);
  }

  /**
   * 팝업 컴포넌트 (자동 열림, 닫기 버튼 포함)
   */
  const PopupView = () => {
    const [open, setOpen] = useState(false);

    // 컴포넌트 마운트 시 자동으로 팝업 열기
    useEffect(() => {
      setOpen(true);
    }, []);

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
          <Box className="popup-container btmSheet">
            <Box className="pop-header">
              <h2 className="pop-tit">바텀 팝업 타이틀</h2>
                {/* X 닫기 버튼 */}
                <Button aria-label="close" onClick={handleClose} className="btn btn-close right">
                <span className="sr-only">닫기</span>
              </Button>
            </Box>
            <Box className="pop-body">
              {/* 팝업 내용 */}
              팝업 내용
            </Box>
            
            {/* 버튼 */}
            <Box className="popup-footer gap10">
              <Button className="btn btn-secondary" onClick={handleClose}>
                버튼1
              </Button>
              <Button className="btn btn-primary" onClick={handleClose}>
                버튼2
              </Button>
              <Button className="btn btn-primary" onClick={handleClose}>
                버튼3
              </Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
      );
    };

  root.render(<PopupView />);
};

export const openFullPopup = (prop: PopupProps) => {
  const formId = 'g-popup-view';

  // 전역 컨테이너가 없으면 생성
  let container = document.getElementById(formId);
  if (!container) {
    container = document.createElement('Box');
    container.id = formId;
    document.body.appendChild(container);
  }

  // 새로운 Root 생성
  if (!root) {
    root = createRoot(container);
  }

  /**
   * 팝업 컴포넌트 (자동 열림, 닫기 버튼 포함)
   */
  const PopupView = () => {
    const [open, setOpen] = useState(false);

    // 컴포넌트 마운트 시 자동으로 팝업 열기
    useEffect(() => {
      setOpen(true);
    }, []);

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
          <Box className="popup-container full">
            <Box className="pop-header">
              <h2 className="pop-tit">풀팝업 타이틀</h2>
               {/* X 닫기 버튼 */}
               <Button aria-label="close" onClick={handleClose} className="btn btn-close right">
                  <span className="sr-only">닫기</span>
                </Button>
            </Box>

            <Box className="pop-body">
              {/* 팝업 내용 */}
              <iframe src={prop.url} className="popup-iframe"></iframe>

              
            </Box>

          </Box>
        </Slide>
      </Modal>
    );
    
  };

  root.render(<PopupView />);
};

export const openFullPopup2 = (prop: PopupProps) => {
  const formId = 'g-popup-view';

  // 전역 컨테이너가 없으면 생성
  let container = document.getElementById(formId);
  if (!container) {
    container = document.createElement('Box');
    container.id = formId;
    document.body.appendChild(container);
  }

  // 새로운 Root 생성
  if (!root) {
    root = createRoot(container);
  }

  /**
   * 팝업 컴포넌트 (자동 열림, 닫기 버튼 포함)
   */
  const PopupView = () => {
    const [open, setOpen] = useState(false);

    // 컴포넌트 마운트 시 자동으로 팝업 열기
    useEffect(() => {
      setOpen(true);
    }, []);

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
          <Box className="popup-container full">
            <Box className="pop-header">
              <h2 className="pop-tit">풀팝업 타이틀</h2>
               {/* X 닫기 버튼 */}
               <Button aria-label="close" onClick={handleClose} className="btn btn-close right">
                  <span className="sr-only">닫기</span>
                </Button>
            </Box>

            <Box className="pop-body">
              {/* 팝업 내용 */}
              팝업 내용
            </Box>

            {/* 버튼 */}
            <Box className="popup-footer gap10">
              <Button className="btn btn-secondary" onClick={handleClose}>
                버튼1
              </Button>
              <Button className="btn btn-primary" onClick={handleClose}>
                버튼2
              </Button>
              <Button className="btn btn-primary" onClick={handleClose}>
                버튼3
              </Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
    );
    
  };

  root.render(<PopupView />);
};

export const openPopup = (prop: PopupProps) => {
  const formId = 'g-popup-view';

  // 전역 컨테이너가 없으면 생성
  let container = document.getElementById(formId);
  if (!container) {
    container = document.createElement('Box');
    container.id = formId;
    document.body.appendChild(container);
  }

  // 새로운 Root 생성
  if (!root) {
    root = createRoot(container);
  }

  /**
   * 팝업 컴포넌트 (자동 열림, 닫기 버튼 포함)
   */
  const PopupView = () => {
    const [open, setOpen] = useState(false);

    // 컴포넌트 마운트 시 자동으로 팝업 열기
    useEffect(() => {
      setOpen(true);
    }, []);

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
          <Box className="popup-container center">
            <Box className="pop-header">
              <h2 className="pop-tit">일반 팝업 타이틀</h2>
                {/* X 닫기 버튼 */}
                <Button aria-label="close" onClick={handleClose} className="btn btn-close right">
                  <span className="sr-only">닫기</span>
                </Button>
            </Box>

            <Box className="pop-body">
              {/* 팝업 내용 */}
              <iframe src={prop.url} className="popup-iframe"></iframe>
            </Box>
            
          </Box>
        </Slide>
      </Modal>
    );
    
  };

  root.render(<PopupView />);
};

export default { openPopup , openBottomPopup , openFullPopup, openFullPopup2, openBottomPopup2 };