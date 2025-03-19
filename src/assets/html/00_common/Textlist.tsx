/**
 * @file Textlist.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Box, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { ButtonContent, ButtonSm } from "@src/assets/html/00_common/Button";

interface InfoListProps {
  title: string;
  items: string[];
  pb?: number;
  hideTitle?: boolean // 타이틀 안보이게 처리
  titleIcon?: boolean; // 타이틀 아이콘 클래스 적용
  listIcon?: boolean; // 리스트 아이콘 클래스 적용
  buttons?: { name: string; onClick?: () => void }[]; // 예시 버튼입니다.
}


//  ! 정보 리스트
export const InfoList = ({ title, items, hideTitle = false, titleIcon = false, listIcon = false  }: InfoListProps) => {
  return (

      /**
       *  default :: bullet 형태
       *  타이틀 아이콘 적용 :: titleIcon [ !! titleIcon 쓰일 경우 불러오는 화면 에서 hideTitle={true} 삭제 필요 ]
       *  리스트 아이콘 적용 :: listIcon
       * 예시)
       * <InfoList
       *     title="정보 리스트"
       *     items={["항목 1", "항목 2", "항목 3"]}
       *     titleIcon={true}  // "titleIcon" 클래스 적용
       *     listIcon={true}   // "listIcon" 클래스 적용
       *   />
       **/

    <Box className={`info-wrap ${titleIcon ? "titleIcon" : ""} ${listIcon ? "listIcon" : ""}`}>
      
      {title && (
        // hideTitle 이 true면 sr-only [스크린 리더 전용(안보이게 처리)] 클래스 적용
        <Typography variant="h6" className= {`${hideTitle ? "sr-only" : ""} info-tit`}>
          {title}
        </Typography>
      )}

      <List className="info-list">
        {items.map((item, index) => (
          <ListItem key={index}>
            <>{item}</>
          </ListItem>
        ))}
      </List>
      
    </Box>
  );
};


interface TextInfolistR {
  
  pdnm?: string;                     // 상품명
  status?: string;                   // 상태 (신규접수 등)
  
  /* 자동이체 및 예약이체 */
  depAcc?: {                         // 입금계좌
    name: string;                    // 입금자 이름
    bank: string;                    // 은행명
    acno: string;                    // 계좌번호
  };

  wdAcc?: {                          // 출금계좌
    name: string;                    // 출금자 이름
    bank: string;                    // 은행명
    acno: string;                    // 계좌번호
  };

  amnt?: number;                     // 이체금액
  fee?: number;                      // 수수료

  prd?: {                            // 이체기간
    stDt: string;                    // 이체 시작일 (YYYY.MM.DD)
    endDt: string;                   // 이체 종료일 (YYYY.MM.DD)
  };

  trfDay?: string;                   // 이체일 / 예약이체일

  rcpDisp?: string;                  // 받는 분 통장 표시
  sndDisp?: string;                  // 내 통장 표시

  buttons?: {                        // 버튼 예시
    name: string;                    // 버튼 이름
    clickFunc?: () => void;          // 버튼 클릭 이벤트
  }[];                               // 버튼 리스트

  /** 계좌 관리 **/
  /* + 대츌계좌관리 */
  lAmnt?: number;                    // 대출신청금액
  lAppDt?: string;                   // 대출신청일
  lMatDt?: string;                   // 대출만기일
  intPayDt?: string;                 // 이자납입일
  RpyMt?: string;                    // 상환방법
  lastTrdDt?: string;                // 최종거래일

  /* + 상환일정 */
  lRemLnAmt?: number;                // 남은대출금
  lLastIntPayDt?: string;            // 최종이자납입일
  lNextIntPayDt?: string;            // 다음이자납입일

  balance?: number;                  // 잔액
  accOpenDt?: string;                // 계좌개설일 (YYYY.MM.DD)
  txBnfType?: string;                // 세금우대구분
  lastTxnDt?: string;                // 최종거래일 (YYYY.MM.DD)
  contPrd?: number;                  // 계약기간
  baseAnlRt?: number;                // 기본이율(연이율)
  nowApplRt?: number;                // 기본이율(현재적용이율)
  preTxInt?: number;                 // 약정이자(세전)
  tfrBank?: string;                  // 송금은행
  tfrAcno?: string;                  // 송금계좌번호
  limAmt?: number;                   // 한도
  matDt?: string;                    // 만기일 (YYYY.MM.DD)
  intRt?: number;                    // 이율
  ovdRt?: number;                    // 연체이율
  intAsOfDate?: number;              // 이자(조회일기준)
  wdrwAmt?: number;                  // 출금가능금액
  curintRt?: number;                 // 현재 적용금리
  bnkNm?: string;                    // 은행명
  acno?: string;                     // 계좌번호

}


interface TextInfolistProps  {
  items: TextInfolistR[];           // 계좌 리스트
}


// 자동이체 리스트
export const ATInfoList = ({ items }: TextInfolistProps) => {
  return (
    <Box className="txt-list-wrap">
      {items.map((item, index) => (
        <Paper key={index} className="txt-list-detail">
          <List className="txt-list">

            {/* 타이틀 */}
            {item.pdnm && (
              <ListItem className="txt-item title">
              <ListItemText
                className="txt-area"
                primary={
                  <Typography component="strong">
                    {item.pdnm ?? "이체 상품명 없음"}
                  </Typography>
                }
                secondary={
                  <>
                    <ButtonSm name="취소하기"/>
                  </>
                }
              />
            </ListItem>
            )}

            {/* 상태 */}
            {item.status && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="상태"
                  secondary={
                    <>{item.status}</>
                  }
                />
              </ListItem>
            )}


             {/* 입금 계좌 */}
              {item.depAcc && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="입금계좌"
                  secondary={
                    <>
                      {item.depAcc?.name ?? "미입력"} <br />
                      {item.depAcc?.bank ?? "미입력"} <br />
                      {item.depAcc?.acno ?? "미입력"}
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 출금 계좌 */}
            {item.wdAcc && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="출금계좌"
                  secondary={
                    <>
                      {item.wdAcc?.name ?? "미입력"} <br />
                      {item.wdAcc?.bank ?? "미입력"} <br />
                      {item.wdAcc?.acno ?? "미입력"}
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 이체 금액 */}
            {item.amnt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="이체금액"
                  secondary={
                    <>
                      {item.amnt.toLocaleString()} 원
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 이체 기간 */}
            {item.prd && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="이체 기간"
                  secondary={
                    <>
                      {item.prd?.stDt ?? "미입력"} <br />
                      ~ {item.prd?.endDt ?? "미입력"}
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 이체일 */}
            {item.trfDay && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="이체일"
                  secondary={
                    <>{item.trfDay}</>
                  }
                />
              </ListItem>
            )}

            {/* 받는 분 통장 표시 */}
            {item.rcpDisp && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="받는분 통장표시"
                  secondary={
                    <>{item.rcpDisp}</>
                  }
                />
              </ListItem>
            )}

            {/* 내 통장 표시 */}
            {item.sndDisp && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="내 통장표시"
                  secondary={
                    <>{item.sndDisp}</>
                  }
                />
              </ListItem>
              
            )}
          </List>

          {/* 버튼 렌더링 - 예시 */}
          {item.buttons?.length ? <ButtonContent buttons={item.buttons} /> : null}

        </Paper>
      ))}
    </Box>
  );
};

// 예약이체 리스트
export const STInfoList = ({ items }: TextInfolistProps) => {
  return (
    <Box className="txt-list-wrap">
      {items.map((item, index) => (
        <Paper key={index} className="txt-list-detail">
          <List className="txt-list">

            {/* 타이틀 */}
            {item.pdnm && (
              <ListItem className="txt-item title">
              <ListItemText
                className="txt-area"
                primary={
                  <Typography component="strong">
                    {item.pdnm ?? "이체 상품명 없음"}
                  </Typography>
                }
                secondary={
                  <>
                    <ButtonSm name="취소하기"/>
                  </>
                }
              />
            </ListItem>
            )}

            {/* 예약이체일 */}
            {item.trfDay && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="예약이체일"
                  secondary={<>{item.trfDay}</>}
                />
              </ListItem>
            )}

            {/* 입금 계좌 */}
            {item.depAcc && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="입금계좌"
                  secondary={
                    <>
                      {item.depAcc?.name ?? "미입력"} <br />
                      {item.depAcc?.bank ?? "미입력"} <br />
                      {item.depAcc?.acno ?? "미입력"}
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 이체 금액 */}
            {item.amnt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="이체금액"
                  secondary={
                    <>
                      {item.amnt.toLocaleString()} 원
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 수수료 */}
            {item.fee !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="수수료"
                  secondary={
                    <>
                      {item.fee.toLocaleString()} 원
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 출금 계좌 */}
            {item.wdAcc && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="출금계좌"
                  secondary={
                    <>
                      {item.wdAcc?.name ?? "미입력"} <br />
                      {item.wdAcc?.bank ?? "미입력"} <br />
                      {item.wdAcc?.acno ?? "미입력"}
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 받는 분 통장 표시 */}
            {item.rcpDisp && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="받는분 통장표시"
                  secondary={
                    <>{item.rcpDisp}</>
                  }
                />
              </ListItem>
            )}

            {/* 내 통장 표시 */}
            {item.sndDisp && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="내 통장표시"
                  secondary={
                    <>{item.sndDisp}</>
                  }
                />
              </ListItem>
            )}
          </List>

        </Paper>
      ))}
    </Box>
  );
};

//계좌관리 리스트
export const AccMngInfoList = ({ items }: TextInfolistProps) => {
  return (
    <Box className="txt-list-wrap">
      {items.map((item, index) => (
        <Paper key={index} className="txt-list-detail">
          <List className="txt-list">

            {/* 타이틀 */}
            {item.pdnm && (
              <ListItem className="txt-item title">
              <ListItemText
                className="txt-area"
                primary={
                  <Typography component="strong">
                    {item.pdnm ?? "타이틀 없음"}
                  </Typography>
                }
              />
            </ListItem>
            )}

            {/* 대출신청금액 */}
            {item.lAmnt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="대출신청금액"
                  secondary={
                    <>{item.lAmnt.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 계좌상태 */}
            {item.status && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="계좌상태"
                  secondary={
                    <>{item.status}</>
                  }
                />
              </ListItem>
            )}

            {/* 대출신청일 */}
            {item.lAppDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="대출신청일"
                  secondary={
                    <>{item.lAppDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 대출만기일 */}
            {item.lMatDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="대출만기일"
                  secondary={
                    <>{item.lMatDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 상환방법 */}
            {item.RpyMt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="상환방법"
                  secondary={
                    <>{item.RpyMt}</>
                  }
                />
              </ListItem>
            )}

            {/* 이자납입일 */}
            {item.intPayDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="이자납입일"
                  secondary={
                    <>{item.intPayDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 최종거래일 */}
            {item.lastTrdDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="최종거래일"
                  secondary={
                    <>{item.lastTrdDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 기본이율(연이율) */}
            {item.nowApplRt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary= {
                    <>
                      기본이율<br/>
                      <span>(현재적용이율)</span>
                    </>
                  }
                  secondary={
                    <>{item.nowApplRt}%</>
                  }
                />
              </ListItem>
            )}

            {/* 잔액 */}
            {item.balance  !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="잔액"
                  secondary={
                    <>{item.balance.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 계좌개설일 */}
            {item.accOpenDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="계좌개설일"
                  secondary={
                    <>{item.accOpenDt}</>
                  }
                />
              </ListItem>
            )}

            

            {/* 세금우대구분 */}
            {item.txBnfType && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="세금우대구분"
                  secondary={
                    <>{item.txBnfType}</>
                  }
                />
              </ListItem>
            )}

            {/* 최종거래일 */}
            {item.lastTxnDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="최종거래일"
                  secondary={
                    <>{item.lastTxnDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 계약기간 */}
            {item.contPrd && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="계약기간"
                  secondary={
                    <>{item.contPrd}개월</>
                  }
                />
              </ListItem>
            )}

            {/* 기본이율(연이율) */}
            {item.baseAnlRt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="기본이율(연이율)"
                  secondary={
                    <>{item.baseAnlRt}%</>
                  }
                />
              </ListItem>
            )}

            {/* 약정이자(세전) */}
            {item.preTxInt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="약정이자(세전)"
                  secondary={
                    <>{item.preTxInt.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 출금가능금액 */}
            {item.wdrwAmt !== undefined  && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="출금가능금액"
                  secondary={
                    <>{item.wdrwAmt.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 현재적용금리 및 기준일자 */}
            {item.curintRt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary= {
                    <>
                      현재적용금리<br/>
                      <span>(기준일자:2023.05.01)</span>
                    </>
                  }
                  secondary={
                    <>{item.curintRt}%<br />
                    </>
                  }
                />
              </ListItem>
            )}

            {/* 송금은행 */}
            {item.tfrBank && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="송금은행"
                  secondary={
                    <>{item.tfrBank}</>
                  }
                />
              </ListItem>
            )}

            {/* 송금계좌번호 */}
            {item.tfrAcno && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="송금계좌번호"
                  secondary={
                    <>{item.tfrAcno}</>
                  }
                />
              </ListItem>
            )}

            {/* 한도 */}
            {item.limAmt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="한도"
                  secondary={
                    <>{item.limAmt.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 만기일 */}
            {item.matDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="만기일"
                  secondary={
                    <>{item.matDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 이율 */}
            {item.intRt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="이율"
                  secondary={
                    <>{item.intRt}%</>
                  }
                />
              </ListItem>
            )}

            {/* 연체이율 */}
            {item.ovdRt !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="연체이율"
                  secondary={
                    <>{item.ovdRt}%</>
                  }
                />
              </ListItem>
            )}

            {/* 이자(조회일기준) */}
            {item.intAsOfDate !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="이자(조회일기준)"
                  secondary={
                    <>{item.intAsOfDate.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 은행 */}
            {item.bnkNm && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="은행"
                  secondary={
                    <>{item.bnkNm}</>
                  }
                />
              </ListItem>
            )}

            {/* 계좌번호 */}
            {item.acno && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="계좌번호"
                  secondary={
                    <>{item.acno}</>
                  }
                />
              </ListItem>
            )}

          </List>

        </Paper>
      ))}
    </Box>
  );
};

// 상환일정 리스트
export const RpySchinfoList = ({ items }: TextInfolistProps) => {
  return (
    <Box className="txt-list-wrap">
      {items.map((item, index) => (
        <Paper key={index} className="txt-list-detail">
          <List className="txt-list">

            {/* 타이틀 */}
            {item.pdnm && (
              <ListItem className="txt-item title">
              <ListItemText
                className="txt-area"
                primary={
                  <Typography component="strong">
                    {item.pdnm ?? "상품명 없음"}
                  </Typography>
                }
              />
            </ListItem>
            )}

            {/* 계좌번호 */}
            {item.acno && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="계좌번호"
                  secondary={
                    <>{item.acno}</>
                  }
                />
              </ListItem>
            )}

            {/* 대출신청금액 */}
            {item.lAmnt  !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="대출신청금액"
                  secondary={
                    <>{item.lAmnt.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 남은대출금 */}
            {item.lRemLnAmt  !== undefined && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="남은대출금"
                  secondary={
                    <>{item.lRemLnAmt.toLocaleString()} 원</>
                  }
                />
              </ListItem>
            )}

            {/* 대출신청일 */}
            {item.lAppDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="대출신청일"
                  secondary={
                    <>{item.lAppDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 대출만기일 */}
            {item.lMatDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="대출만기일"
                  secondary={
                    <>{item.lMatDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 최종이자납입일 */}
            {item.lLastIntPayDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="최종이자납입일"
                  secondary={
                    <>{item.lLastIntPayDt}</>
                  }
                />
              </ListItem>
            )}

            {/* 다음이자납입일 */}
            {item.lNextIntPayDt && (
              <ListItem className="txt-item">
                <ListItemText
                  className="txt-area"
                  primary="다음이자납입일"
                  secondary={
                    <>{item.lNextIntPayDt}</>
                  }
                />
              </ListItem>
            )}
            
          </List>

        </Paper>
      ))}
    </Box>
  );
};


export default { InfoList, ATInfoList, STInfoList, AccMngInfoList, RpySchinfoList };