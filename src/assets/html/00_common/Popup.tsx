/**
 * @file Popup.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Box, Button, Modal, Slide, Typography } from '@mui/material';
import DataSet from '@src/assets/io/DataSet';
import { PopupProps } from '@src/assets/js/props/PopupProps';
import React, { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';


// 풀팝업
export const openFullPopup = (prop: PopupProps) => {
  const formId = 'gOpenFullPopup';
  const Component = prop.component;
  
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
          prop.nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal aria-labelledby="popup-title" aria-describedby="popup-content" open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container full" aria-live="polite">

                <Box className="pop-header">
                  <Typography className="pop-tit" id="popup-title" variant="h2">{prop.title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button className="btn btn-close right" aria-label="닫기" onClick={() => { popupClose(); }} >
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>
                <Box className="pop-body" id="popup-content">
                  {/* 팝업 내용 */}
                  <Component param={prop.param} onClose={popupClose} />
                </Box>
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

// 바텀팝업
export const openBottomPopup = (prop: PopupProps) => {
  const formId = "gOpenBottomPopup";
  const Component = prop.component;

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
          prop.nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal aria-labelledby="popup-title" aria-describedby="popup-content" open={open} onClose={() => { popupClose(); }} >
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container btmSheet">
                <Box className="pop-header">
                  <Typography className="pop-tit" id="popup-title" variant="h2" >{prop.title}</Typography>
                  <Button className="btn btn-close right" aria-label="닫기" onClick={() => { popupClose(); }} >
                    <Typography className="sr-only" component="span" >닫기</Typography>
                  </Button>
                </Box>
                <Box className="pop-body" id="popup-content">
                  <Component param={prop.param} onClose={popupClose} />
                </Box>
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

// 일반 오픈팝업
export const openPopup = (prop: PopupProps) => {
  const formId = 'gOpenPopup';
  const Component = prop.component;

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
          prop.nFunc?.(data);
        }, 300);
      };

      //팝업 컴포넌트 생성
      return (
        <MemoryRouter>
          <Modal aria-labelledby="popup-title" aria-describedby="popup-content" open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container center">
                <Box className="pop-header">
                  <Typography className="pop-tit" id="popup-title" variant="h2">{prop.title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="닫기" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography className="sr-only" component="span" >닫기</Typography>
                  </Button>
                </Box>

                <Box id="popup-content" className="pop-body">
                  {/* 팝업 내용 */}
                  <Component param={prop.param} onClose={popupClose} />
                </Box>

              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};


export default { openFullPopup, openBottomPopup, openPopup  };
