/**
 * @file Popup.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Box, Button, Grid2, Modal, Slide, Typography } from '@mui/material';
import { ListButton } from "@src/assets/html/00_common/List";
import { ContentTitle } from "@src/assets/html/00_common/Text";
import AsyncPromiss from '@src/assets/io/AsyncPromiss';
import DataSet from '@src/assets/io/DataSet';
import { doActionView } from '@src/assets/js/common';
import { PopupProps } from '@src/assets/js/props/PopupProps';
import React, { useEffect, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';


/**
 *  풀팝업
 */
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

/**
 *  바텀팝업
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


/**
 *  일반 오픈팝업
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

/**
 *  계좌 설정 팝업
 */
export const openBottomPopupWithMenu = ({ title, param }: { title: string; param: DataSet }) => {
  
  const formId = "openBottomPopupWithMenu";

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
        { label: "계좌비밀번호변경", path: "/efc/EFC002.view" },
        { label: "계좌비밀번호오류해제", path: "/efc/EFC003.view" },
        { label: "계좌 관리", path: "/efc/EFC004.view" },
        { label: "지연이체 관리", path: "/efc/EFC005.view" },
        { label: "출금지정계좌 관리", path: "/efc/EFC006.view" },
        { label: "입금지정계좌 관리", path: "/efc/EFC007.view" },
        { label: "이체한도 관리", path: "/efc/EFC008.view" },
        { label: "한도제한 해제", path: "/efc/EFC009.view" },
        { label: "해지계좌 조회", path: "/efc/EFC010.view" },
      ];

      // 'ListButton'의 데이터 형식으로 변환
      const listItems = menuItems.map((item, index) => ({
        id: index, // ID는 index 사용
        label: item.label,
      }));


      //  클릭 핸들러 정의
      const handleClick = (id: number) => {
        const selectedItem = menuItems[id]; // ID를 기반으로 해당 메뉴 찾기
        if (selectedItem) {
          doActionView(selectedItem.path, param); // 기존 동작 유지
          popupClose(); // 팝업 닫기
        }
      };

      return (
        <Modal aria-labelledby="popup-title" aria-describedby="popup-content" open={open} onClose={popupClose}>
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box className="popup-container btmSheet">
              <Box className="pop-header">
                <Typography className="pop-tit" id="popup-title" variant="h2" >{title}</Typography>
                <Button className="btn btn-close right" aria-label="닫기" onClick={popupClose}>
                  <Typography className="sr-only" component="span">닫기</Typography>
                </Button>
              </Box>

              <Box className="pop-body" id="popup-content">
                {/* 메뉴 리스트 표시 */}
                <ListButton items={listItems} onClick={handleClick} />

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

                    <Box className="secu-number-wrap">

                        {/* 상단 안내 문구 */}
                        <ContentTitle title={ <> {infoMsg} </> }/>

                        {/* 입력된 숫자 표시부 */}
                        <Box className="secu-number">
                        {/* 6자리 예시 */}
                        {Array.from({ length: maxLength }).map((_, idx) => (
                            <Box className={`secu-dot ${idx < secuNumber.length ? "filled" : ""}`} key={idx}/>
                        ))}
                        </Box>

                    </Box>
                  
                  {/* 숫자 키패드 */}
                  <Grid2 container className="secu-keypad-wrap">
                    {/* 1 ~ 9 버튼: 3개씩 한 줄 */}
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                        <Grid2 key={digit} className="secu-key">
                            <Button className="secu-key-button" onClick={() => handleNumberClick(digit)} >
                                {digit}
                            </Button>
                        </Grid2>
                    ))}

                    {/* 마지막 행: 왼쪽 빈 칸, 가운데 "0", 오른쪽 삭제 아이콘 */}
                    <Grid2 className="secu-key txt" >
                        <Button className="secu-key-button">재배열</Button>
                    </Grid2>

                    <Grid2 className="secu-key">
                        <Button className="secu-key-button" onClick={() => handleNumberClick("0")}>0</Button>
                    </Grid2>

                    <Grid2 className="secu-key delete">
                        <Button className="secu-key-button" onClick={() => handleNumberClick("-1")}>
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


export default { openFullPopup, openBottomPopup, openPopup, openBottomPopupWithMenu, showKeypad };
