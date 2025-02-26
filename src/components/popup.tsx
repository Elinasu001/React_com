/**
 * @fileoverview 팝업 UI
 *
 * 사용 예시:
 * import { openBottomPopup } from "@src/components/popup";
 */
// import "@assets/styles/css/common.css";
import { Modal, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

let root: Root | null = null;

interface PopupProps {
    url: string;            // 팝업으로 열 페이지
    nFunc ?: () => void;    // 팝업 닫기 콜백
}

export const openBottomPopup = (prop: PopupProps) => {
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

  console.log("📌 openBottomPopup 실행됨", prop.nFunc);
  if (prop.nFunc) {
    window.nFunc = prop.nFunc;
    console.log("✅ window.nFunc이 설정됨!");
  } else {
    console.error("❌ window.nFunc가 전달되지 않음");
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
        delete window.nFunc;

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
          <div className="popup-container btmSheet">
            <div className="pop-header">
              <h2 className="pop-tit">바텀 팝업 타이틀</h2>
                {/* X 닫기 버튼 */}
                <button aria-label="close" onClick={handleClose} className="btn btn-close right">
                <span className="sr-only">닫기</span>
              </button>
            </div>
            <div className="pop-body">
              {/* 팝업 내용 */}
              <iframe src={prop.url} className="popup-iframe"></iframe>

              
            </div>
            
          </div>
        </Slide>
      </Modal>
      );
    };

  root.render(<PopupView />);
};

export const openBottomPopup2 = (prop: PopupProps) => {
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
          <div className="popup-container btmSheet">
            <div className="pop-header">
              <h2 className="pop-tit">바텀 팝업 타이틀</h2>
                {/* X 닫기 버튼 */}
                <button aria-label="close" onClick={handleClose} className="btn btn-close right">
                <span className="sr-only">닫기</span>
              </button>
            </div>
            <div className="pop-body">
              {/* 팝업 내용 */}
              <iframe src={prop.url} className="popup-iframe"></iframe>
              팝업 내용

            </div>
            
            {/* 버튼 */}
            <div className="popup-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                버튼1
              </button>
              <button className="btn btn-primary" onClick={handleClose}>
                버튼2
              </button>
              <button className="btn btn-primary" onClick={handleClose}>
                버튼3
              </button>
            </div>
          </div>
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
    container = document.createElement('div');
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
          <div className="popup-container full">
            <div className="pop-header">
              <h2 className="pop-tit">풀팝업 타이틀</h2>
               {/* X 닫기 버튼 */}
               <button aria-label="close" onClick={handleClose} className="btn btn-close right">
                  <span className="sr-only">닫기</span>
                </button>
            </div>

            <div className="pop-body">
              {/* 팝업 내용 */}
              <iframe src={prop.url} className="popup-iframe"></iframe>

              
            </div>

          </div>
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
    container = document.createElement('div');
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
          <div className="popup-container full">
            <div className="pop-header">
              <h2 className="pop-tit">풀팝업 타이틀</h2>
               {/* X 닫기 버튼 */}
               <button aria-label="close" onClick={handleClose} className="btn btn-close right">
                  <span className="sr-only">닫기</span>
                </button>
            </div>

            <div className="pop-body">
              {/* 팝업 내용 */}
              <iframe src={prop.url} className="popup-iframe"></iframe>
              팝업 내용

            </div>

            {/* 닫기 버튼 */}
            <div className="popup-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                버튼1
              </button>
              <button className="btn btn-primary" onClick={handleClose}>
                버튼2
              </button>
              <button className="btn btn-primary" onClick={handleClose}>
                버튼3
              </button>
            </div>
          </div>
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
    container = document.createElement('div');
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
          <div className="popup-container center">
            <div className="pop-header">
              <h2 className="pop-tit">일반 팝업 타이틀</h2>
                {/* X 닫기 버튼 */}
                <button aria-label="close" onClick={handleClose} className="btn btn-close right">
                  <span className="sr-only">닫기</span>
                </button>
            </div>

            <div className="pop-body">
              {/* 팝업 내용 */}
              <iframe src={prop.url} className="popup-iframe"></iframe>
            </div>
            
          </div>
        </Slide>
      </Modal>
    );
    
  };

  root.render(<PopupView />);
};

export default { openPopup , openBottomPopup , openFullPopup, openFullPopup2, openBottomPopup2 };