/**
 * @fileoverview 팝업 UI
 *
 * 사용 예시:
 * import { openBottomPopup } from "@src/components/popup";
 */
import { MemoryRouter } from 'react-router-dom';
import { Modal, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataSet } from '@assets/js/common';
/**
 * 팝업 파라미터 정의
 */
interface PopupProps {
  component: React.FC<{ onClose: (data?: DataSet) => void }>; // 팝업으로 열 페이지
  title?: string;                                            // 팝업 타이틀
  nFunc?: (data?: DataSet) => void;                          // 팝업 닫기 콜백
}

/**
 *  밑에서 올라는 팝업
 */
export const openBottomPopup = ({ component: Component, title, nFunc }: PopupProps) => {
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
              <div className="popup-container btmSheet">
                <div className="pop-header">
                  <h2 className="pop-tit">{title}</h2>
                  <button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <span className="sr-only">닫기</span>
                  </button>
                </div>
                <div className="pop-body">
                  <Component onClose={popupClose} />
                </div>
              </div>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openBottomPopup2 = ({ component: Component, title, nFunc }: PopupProps) => {
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
              <div className="popup-container btmSheet">
                <div className="pop-header">
                  <h2 className="pop-tit">{title}</h2>
                  {/* X 닫기 버튼 */}
                  <button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <span className="sr-only">닫기</span>
                  </button>
                </div>

                <div className="pop-body">
                  {/* 팝업 내용 */}
                  <Component onClose={popupClose} />
                </div>

                {/* 버튼 */}
                <div className="popup-footer gap10">
                  <button className="btn btn-secondary" onClick={() => { popupClose(); }}>
                    버튼1
                  </button>
                  <button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼2
                  </button>
                  <button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼3
                  </button>
                </div>
              </div>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openFullPopup = ({ component: Component, title, nFunc }: PopupProps) => {
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
              <div className="popup-container full">
                <div className="pop-header">
                  <h2 className="pop-tit">{title}</h2>
                  {/* X 닫기 버튼 */}
                  <button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <span className="sr-only">닫기</span>
                  </button>
                </div>
                <Component onClose={popupClose} />
              </div>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openFullPopup2 = ({ component: Component, title, nFunc }: PopupProps) => {
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
              <div className="popup-container full">
                <div className="pop-header">
                  <h2 className="pop-tit">{title}</h2>
                  {/* X 닫기 버튼 */}
                  <button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <span className="sr-only">닫기</span>
                  </button>
                </div>

                <div className="pop-body">
                  {/* 팝업 내용 */}
                  <Component onClose={popupClose} />
                </div>

                {/* 버튼 */}
                <div className="popup-footer gap10">
                  <button className="btn btn-secondary" onClick={() => { popupClose(); }}>
                    버튼1
                  </button>
                  <button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼2
                  </button>
                  <button className="btn btn-primary" onClick={() => { popupClose(); }}>
                    버튼3
                  </button>
                </div>
              </div>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export const openPopup = ({ component: Component, title, nFunc }: PopupProps) => {
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
              <div className="popup-container center">
                <div className="pop-header">
                  <h2 className="pop-tit">{title}</h2>
                  {/* X 닫기 버튼 */}
                  <button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <span className="sr-only">닫기</span>
                  </button>
                </div>

                <div className="pop-body">
                  {/* 팝업 내용 */}
                  <Component onClose={popupClose} />
                </div>

              </div>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

export default { openPopup, openBottomPopup, openFullPopup, openFullPopup2, openBottomPopup2 };