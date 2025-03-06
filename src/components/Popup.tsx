/**
 * @fileoverview 팝업 UI
 *
 * 사용 예시:
 * import { openBottomPopup } from "@src/components/popup";
 */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Grid2, List, ListItemButton, Modal, Slide, TextField, Typography } from '@mui/material';
import AsyncPromiss from '@src/assets/io/AsyncPromiss';
import DataSet from '@src/assets/io/DataSet';
import { doActionView, doLogin, LoginType } from '@src/assets/js/common';
import { progressBar } from '@src/components/Loading';
import React, { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { messageView } from '@src/components/Alert';
import { PopupProps } from '@src/assets/js/props/PopupProps';
import BackspaceIcon from "@mui/icons-material/Backspace";


/**
 *  밑에서 올라는 팝업
 */
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

export const openBottomPopup2 = (prop: PopupProps) => {
  const formId = "gOpenBottomPopup2";
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
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>

                <Box className="pop-body">
                  {/* 팝업 내용 */}
                  <Component param={prop.param} onClose={popupClose} />
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
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container full">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{prop.title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>
                <Box className="pop-body">
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

export const openFullPopup2 = (prop: PopupProps) => {
  const formId = 'gOpenFullPopup2';
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
              <Box className="popup-container full">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{prop.title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>

                <Box className="pop-body">
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

/**
 * 일반팝업 호출
 */
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
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container center">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">{prop.title}</Typography>
                  {/* X 닫기 버튼 */}
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>

                <Box className="pop-body">
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

/**
 * 로그인 호출
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

export const openBottomPopupWithMenu = ({ title, param }: { title: string; param: DataSet }) => {
  const formId = "gOpenBottomPopup";
  document.getRoot(formId).render(
    React.createElement(() => {
      const [open, setOpen] = useState(false);

      // 팝업 열기
      useEffect(() => {
        setOpen(true);
      }, []);

      // 팝업 닫기 함수
      const popupClose = () => {
        setOpen(false);
        setTimeout(() => document.removeRoot(formId), 300);
      };

      // 메뉴 리스트 정의
      const menuItems = [
        { label: "계좌 관리", path: "/efc/EFC004.view" },
        { label: "지연이체 관리", path: "/efc/EFC005.view" },
        { label: "출금지정계좌 관리", path: "/efc/EFC006.view" },
        { label: "입금지정계좌 관리", path: "/efc/EFC007.view" },
        { label: "이체한도 관리", path: "/efc/EFC008.view" },
        { label: "한도제한 해제", path: "/efc/EFC009.view" },
        { label: "해지계좌 조회", path: "/efc/EFC010.view" },
      ];

      return (
        <Modal open={open} onClose={popupClose}>
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box className="popup-container btmSheet">
              <Box className="pop-header">
                <Typography variant="h2" className="pop-tit">{title}</Typography>
                <Button aria-label="close" onClick={popupClose} className="btn btn-close right">
                  <Typography component="span" className="sr-only">닫기</Typography>
                </Button>
              </Box>

              <Box className="pop-body">
                {/* 메뉴 리스트 표시 */}
                <List>
                  {menuItems.map((menu, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() => {
                        doActionView(menu.path, param);
                        popupClose();
                      }}
                    >
                      <Typography>{menu.label}</Typography>
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Box>
          </Slide>
        </Modal>
      );
    })
  );
};

/**
 * 숫자 키패드 호출
 */
export const showKeypad = (infoMsg:string,maxLength:number): AsyncPromiss => {
  return new AsyncPromiss((nFunc) => {
    const formId = 'gLoginPopup';
    document.getRoot(formId).render(
      React.createElement(() => {
        // 팝업 열림/닫힘 상태
        const [open, setOpen] = useState(false);
        // 입력된 숫자 상태 (최대 6자리 예시)
        const [secuNumber, setSecuNumber] = useState("");

        // 팝업 컴포넌트가 마운트된 직후 실행 (팝업 열림)
        useEffect(() => {
          setOpen(true);
        }, []);

        //팝업 컴포넌트 닫기 처리
        const popupClose = (data?:DataSet) => {
          setOpen(false);
          setTimeout(() => {
            document.removeRoot(formId);
            if(data){
              nFunc(data);
            }else{
              nFunc(new DataSet({'num':''}));
            }
          }, 300);
        };

        // 숫자 입력 처리
        const handleNumberClick = (digit: string) => {

          //진동
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }

          if (digit === "-1") {
            handleDelete();
            return;
          }
          
          // 기존 상태에 새 digit을 더한 값을 계산
          const newNumber = secuNumber + digit;
          
          // 상태 업데이트
          setSecuNumber(newNumber);

          // 자릿수 채워지면 종료 (maxLength까지 입력되면 팝업 닫기)
          if (newNumber.length >= maxLength) {
            popupClose(new DataSet({ num: newNumber }));
          }
        };

        // 삭제 처리 (한 글자 지우기)
        const handleDelete = () => {
          if (secuNumber.length > 0) {
            setSecuNumber((prev) => prev.slice(0, -1));
          }
        };

        //팝업 컴포넌트 생성
        return (
          <Modal open={open} onClose={() => { popupClose(); }}>
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
              <Box className="popup-container full">
                <Box className="pop-header">
                  <Typography variant="h2" className="pop-tit">보안 키패드</Typography>
                  <Button aria-label="close" onClick={() => { popupClose(); }} className="btn btn-close right">
                    <Typography component="span" className="sr-only">닫기</Typography>
                  </Button>
                </Box>
  
                <Box className="pop-body">
                  {/* 상단 안내 문구 */}
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {infoMsg}
                  </Typography>

                  {/* 입력된 숫자 표시부 */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    {/* 6자리 예시 */}
                    {Array.from({ length: maxLength }).map((_, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          backgroundColor:
                            idx < secuNumber.length ? "#000" : "#ccc",
                          mx: 1,
                        }}
                      />
                    ))}
                  </Box>

                  {/* 숫자 키패드 */}
                  <Grid2 container spacing={2} sx={{ textAlign: "center", bottom: 0, left: 0, right: 0 }}>
                  {/* 1 ~ 9 버튼: 3개씩 한 줄 */}
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                    <Grid2 key={digit} sx={{ flexBasis: "25%" }}>
                      <Button
                        variant="outlined"
                        sx={{ width: "100%", height: "80px", fontSize: "2rem" }}
                        onClick={() => handleNumberClick(digit)}
                      >
                        {digit}
                      </Button>
                    </Grid2>
                  ))}
                  {/* 마지막 행: 왼쪽 빈 칸, 가운데 "0", 오른쪽 삭제 아이콘 */}
                  <Grid2 sx={{ flexBasis: "25%" }} /> {/* 빈 칸 */}
                  <Grid2 sx={{ flexBasis: "25%" }}>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%", height: "80px", fontSize: "2rem" }}
                      onClick={() => handleNumberClick("0")}
                    >
                      0
                    </Button>
                  </Grid2>
                  <Grid2 sx={{ flexBasis: "25%" }}>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%", height: "80px" }}
                      onClick={() => handleNumberClick("-1")}
                    >
                      <BackspaceIcon sx={{ fontSize: "2rem" }} />
                    </Button>
                  </Grid2>
                </Grid2>
                </Box>
              </Box>
            </Slide>
          </Modal>
        );
      })
    );
  });
};


export default { openPopup, openBottomPopup, openFullPopup, openFullPopup2, openBottomPopup2, openHtmlPopup, showKeypad };