/**
 * @fileoverview 팝업 UI
 *
 * 사용 예시:
 * import { openBottomPopup } from "@src/components/popup";
 */
import { Box, Button, Modal, Slide, Typography } from '@mui/material';
import DataSet from '@src/assets/io/DataSet';
import React, { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
/**
 * 팝업 파라미터 정의
 */
interface PopupProps {
  component: React.FC<{param: DataSet,onClose: (data?: DataSet) => void }>; // 팝업으로 열 페이지
  title?: string;                                            // 팝업 타이틀
  nFunc?: (data?: DataSet) => void;                          // 팝업 닫기 콜백
  param?: DataSet;                                            // 팝업 파람
}

/**
 *  밑에서 올라는 팝업
 */
export const openBottomPopup = ({ component: Component, title, param, nFunc }: PopupProps) => {
  const formId = "gOpenBottomPopup";
  document.getRoot(formId).render(
    React.createElement(() => {
      const [open, setOpen] = useState(false);

      //팝업 컴포넌트 생성후 처리
      useEffect(() => {
        setOpen(true);
      }, []);

      //팝업 컴포넌트 닫기 처리
      const popupClose = (data?: DataSet) => {
        setOpen(false);
        setTimeout(() => {
          document.removeRoot(formId);
          nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container btmSheet">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{title}</Typography>
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>
                <Box className="pop-body">
                  <Component param={param ?? new DataSet({})} onClose={popupClose} />
                </Box>
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openBottomPopup2 = ({ component: Component, title, param, nFunc }: PopupProps) => {
  const formId = "gOpenBottomPopup2";
  document.getRoot(formId).render(
    React.createElement(() => {
      const [open, setOpen] = useState(false);

      //팝업 컴포넌트 생성후 처리
      useEffect(() => {
        setOpen(true);
      }, []);

      //팝업 컴포넌트 닫기 처리
      const popupClose = (data?: DataSet) => {
        setOpen(false);
        setTimeout(() => {
          document.removeRoot(formId);
          nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container btmSheet">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>

                <Box className="pop-body">
                  {/* 팝업 내용 */}
                  <Component param={param ?? new DataSet({})} onClose={popupClose} />
                </Box>

                {/* 버튼 */}
                <Box className="popup-footer gap10">
                  <Button className="btn btn-secondary" onClick={() => { popupClose(); }}>
                    버튼1
                  </Button>
                  <Button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼2
                  </Button>
                  <Button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼3
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openFullPopup = ({ component: Component, title, param, nFunc }: PopupProps) => {
  const formId = 'gOpenFullPopup';
  document.getRoot(formId).render(
    React.createElement(() => {
      const [open, setOpen] = useState(false);

      //팝업 컴포넌트 생성후 처리
      useEffect(() => {
        setOpen(true);
      }, []);

      //팝업 컴포넌트 닫기 처리
      const popupClose = (data?: DataSet) => {
        setOpen(false);
        setTimeout(() => {
          document.removeRoot(formId);
          nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container full">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>
                <Box className="pop-body">
                  {/* 팝업 내용 */}
                  <Component param={param ?? new DataSet({})} onClose={popupClose} />
                </Box>
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openFullPopup2 = ({ component: Component, title, param, nFunc }: PopupProps) => {
  const formId = 'gOpenFullPopup2';
  document.getRoot(formId).render(
    React.createElement(() => {
      const [open, setOpen] = useState(false);

      //팝업 컴포넌트 생성후 처리
      useEffect(() => {
        setOpen(true);
      }, []);

      //팝업 컴포넌트 닫기 처리
      const popupClose = (data?: DataSet) => {
        setOpen(false);
        setTimeout(() => {
          document.removeRoot(formId);
          nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container full">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>

                <Box className="pop-body">
                  {/* 팝업 내용 */}
                  <Component param={param ?? new DataSet({})} onClose={popupClose} />
                </Box>

                {/* 버튼 */}
                <Box className="popup-footer gap10">
                  <Button className="btn btn-secondary" onClick={() => { popupClose(); }}>
                    버튼1
                  </Button>
                  <Button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼2
                  </Button>
                  <Button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼3
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openPopup = ({ component: Component, title, param, nFunc }: PopupProps) => {
  const formId = 'gOpenPopup';
  document.getRoot(formId).render(
    React.createElement(() => {
      const [open, setOpen] = useState(false);

      //팝업 컴포넌트 생성후 처리
      useEffect(() => {
        setOpen(true);
      }, []);

      //팝업 컴포넌트 닫기 처리
      const popupClose = (data?: DataSet) => {
        setOpen(false);
        setTimeout(() => {
          document.removeRoot(formId);
          nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container center">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>

                <Box className="pop-body">
                  {/* 팝업 내용 */}
                  <Component param={param ?? new DataSet({})} onClose={popupClose} />
                </Box>

              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};


/**
 * 타 웹 호출 팝업
 * @param param0 
 */
export const openWebPopup = (url: string, title: string, nFunc?: (data : DataSet) => void) => {
  const formId = 'gOpenWebPopup';
  document.getRoot(formId).render(
    React.createElement(() => {

      //팝업상태
      const [open, setOpen] = useState(false);
      
      //팝업 컴포넌트 생성후 처리
      useEffect(() => {
        setOpen(true);
        const iframeCallBack = (event: MessageEvent) => {
            popupClose(new DataSet(event.data))
        };
        window.addEventListener("message", iframeCallBack);
        return () => {
            window.removeEventListener("message", iframeCallBack);
        };
      }, []);

      //팝업 컴포넌트 닫기 처리
      const popupClose = (data?: DataSet) => {
        setOpen(false);
        setTimeout(() => {
          document.removeRoot(formId);
          nFunc?.(new DataSet(data));
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container full">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>
                <Box className="pop-body">
                  {/* 팝업 내용 */}
                  <iframe
                      src={url}
                      width='100%'
                      height='100%'
                      style={{ border: "none" }}
                  />
                </Box>
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export default { openPopup, openBottomPopup, openFullPopup, openFullPopup2, openBottomPopup2, openWebPopup };