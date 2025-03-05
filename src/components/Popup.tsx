/**
 * @fileoverview 팝업 UI
 *
 * 사용 예시:
 * import { openBottomPopup } from "@src/components/popup";
 */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Slide, TextField, Typography } from '@mui/material';
import AsyncPromiss from '@src/assets/io/AsyncPromiss';
import DataSet from '@src/assets/io/DataSet';
import { doLogin, LoginType } from '@src/assets/js/common';
import { progressBar } from '@src/components/Loading';
import React, { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { messageView } from './Alert';
/**
 * 팝업 파라미터 정의
 */
export interface PopupProps {
  component: ({ param, onClose }: { param: DataSet; onClose: (data?: DataSet) => void }) => React.ReactElement;
  param?: DataSet;
  title?: string;
  nFunc?: (data?: DataSet) => void;
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
                    <Button className="btn btn-outlined" onClick={() => { popupClose(); }}>
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
                
              </Box>
            </Slide>
          </Modal>
        </MemoryRouter>
      );
    })
  );
};

/**
 * 일반팝업 호출
 */
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
 * 일반팝업 호출
 */
export const loginPopup = (): AsyncPromiss => {
  return new AsyncPromiss((nFunc) => {
    const formId = 'gLoginPopup';
    document.getRoot(formId).render(
      React.createElement(() => {
        // 로그인 팝업 상태
        const [open, setOpen] = useState(false);
        const [id, setId] = useState(""); // ID 상태
        const [password, setPassword] = useState(""); // 비밀번호 상태

        //팝업 컴포넌트 생성후 처리
        useEffect(() => {
          setOpen(true);
        }, []);

        //팝업 컴포넌트 닫기 처리
        const popupClose = () => {
          setOpen(false);
          setTimeout(() => {
            document.removeRoot(formId);
            nFunc(new DataSet({result:false}));
          }, 300);
        };

        const login = async () => {
            if (!id || !password) {
              messageView("아이디와 비밀번호를 입력하세요.", "확인");
              return;
            }
            //로그인 통신
            const loginResult = await doLogin(LoginType.ID,new DataSet({'ID':id,'PW':password}));
            
            //결과분기
            if(loginResult.result){
              setOpen(false);
              nFunc(new DataSet({result:true}));
            }else{
              messageView(loginResult.msg,"확인");
            }
          };

        //팝업 컴포넌트 생성
        return (
          <MemoryRouter>
            {/* 로그인 팝업 */}
            <Dialog
              open={open}
              onClose={popupClose}
              maxWidth="xs"
              fullWidth
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  padding: 2,
                  background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                로그인
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="아이디"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  sx={{
                    mb: 2,
                    backgroundColor: '#fff',
                    borderRadius: 1,
                  }}
                />
                <TextField
                  label="비밀번호"
                  type="password"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 1,
                  }}
                />
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  onClick={login}
                  variant="contained"
                  color="primary"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  로그인
                </Button>
              </DialogActions>
            </Dialog>
          </MemoryRouter>
        );
      })
    );
  });
};


/**
 * 정적 HTML 풀 호출 팝업
 * @param param0 
 */
export const openHtmlPopup = (url: string): AsyncPromiss => {
  return new AsyncPromiss((nFunc) => {
    const formId = "gOpenHtmlPopup";
    document.getRoot(formId).render(
      React.createElement(() => {
        // 팝업 상태
        const [open, setOpen] = useState(false);

        // 팝업 컴포넌트 생성 후 처리
        useEffect(() => {
          setOpen(true);

          const iframeCallBack = (event: MessageEvent) => {
            popupClose(new DataSet(event.data));
          };

          window.addEventListener("message", iframeCallBack);
          return () => {
            window.removeEventListener("message", iframeCallBack);
          };
        }, []);

        // 팝업 닫기 처리
        const popupClose = (data?: DataSet) => {
          progressBar(true);
          setOpen(false);
          setTimeout(() => {
            document.removeRoot(formId);
            nFunc(new DataSet(data)); // Promise를 통해 데이터 반환
            progressBar(false);
          }, 300);
        };

        // 팝업 컴포넌트 생성
        return (
          <MemoryRouter>
            <Modal open={open} onClose={() => popupClose()}>
              <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Box className="popup-container">
                  {/* 팝업 내용 */}
                  <iframe
                    src={url}
                    width="100%"
                    height="100%"
                    title="인앱"
                    style={{ border: "none" }}
                    allow="geolocation; microphone; camera; clipboard-read; clipboard-write; fullscreen;"
                  />
                </Box>
              </Slide>
            </Modal>
          </MemoryRouter>
        );
      })
    );
  });
};

export default { openPopup, openBottomPopup, openFullPopup, openFullPopup2, openBottomPopup2, openHtmlPopup };