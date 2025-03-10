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
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container btmSheet">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{prop.title}</Typography>
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>
                <Box className="pop-body">
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

export default { openBottomPopup };
