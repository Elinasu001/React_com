/**
 * @file Button.tsx
 * @description
 * @author
 * @version 1.0.0
 */

import { Box, Button, List, ListItem, Typography } from '@mui/material';

// ** 기존과 바뀐 내용  **
// btnName > name 으로 통일
// 단일 버튼과 여러 개 버튼으로 나누어 사용 가능

// 버튼 속성 통일
export interface ButtonProps {  // [2025-03-26 추가] export 추가

  // 단일 버튼용
  name?: string;
  clickFunc?: () => void;
  disabled?: boolean;

  // 여러 개 버튼 지원
  buttons?: {
    name: string;
    clickFunc?: () => void;
    disabled?: boolean;
  }[];

  
}

// 컨텐츠 버튼 ex) 카드 내부 버튼, 일반 페이지 버튼
export const ButtonContent = ({ name, clickFunc, disabled, buttons }: ButtonProps) => {
  
  // 버튼 개수 확인
  const buttonCount = buttons ? buttons.length : 1;
  
  return (

    /**
     * 적용 예시 )
     *
      // 단일 버튼 사용 시
        <ButtonContent
          name="팝업 테스트"
        />

      // 여러 개 버튼 사용 시
        <ButtonContent
            buttons={[
                { name: "팝업 테스트 1"},
                { name: "팝업 테스트 2"},
                { name: "팝업 테스트 3"},
            ]}
        />
      *
     **/


    // 컨텐츠
    <Box className={`btn-area btn-count-${buttonCount}`}>
    {/* 여러 개 버튼이 있을 경우 배열을 사용 */}
      {buttons && buttons.length > 0 ? (
        buttons.map((btn, index) => (
          <Button
            key={index}
            className="btn"
            onClick={btn.clickFunc}
            disabled={btn.disabled ?? false}
          >
            {btn.name}
          </Button>
        ))
      ) : (
        /* 단일 버튼을 사용할 경우 */
        <Button
          className="btn"
          onClick={clickFunc}
          disabled={disabled ?? false}
        >
          {name}
        </Button>
      )}
    </Box>

  );
};

// 컨텐츠 버튼 ex) 카드 내부 버튼, 일반 페이지 버튼
export const ButtonSm = ({ name, clickFunc, disabled, buttons }: ButtonProps) => {
  
  return (
    
    // 컨텐츠
    <Typography component="span" className="btn-sm"> {/* [2025-03-27 변경] Box를 span으로 변경*/}
    
    {/* 여러 개 버튼이 있을 경우 배열을 사용 */}
      {buttons && buttons.length > 0 ? (
        buttons.map((btn, index) => (
          <Button
            key={index}
            className="btn"
            onClick={btn.clickFunc}
            disabled={btn.disabled ?? false}
          >
            {btn.name}
          </Button>
        ))
      ) : (
        /* 단일 버튼을 사용할 경우 */
        <Button
          className="btn"
          onClick={clickFunc}
          disabled={disabled ?? false}
        >
          {name}
        </Button>
      )}
    </Typography>

  );
};

// 컨텐츠 하단 버튼 ex) 팝업 하단 버튼, 일반 페이지 하단 버튼
export const ButtonFooter = ({ name, clickFunc, disabled, buttons }: ButtonProps) => {

   // 버튼 개수 확인
   const buttonCount = buttons ? buttons.length : 1;

  return (
    
    /**
     * 적용 예시 )
     *
      // 단일 버튼 사용 시
        <ButtonFooter
          name="팝업 테스트"
        />

      // 여러 개 버튼 사용 시
        <ButtonFooter
            buttons={[
                { name: "팝업 테스트 1"},
                { name: "팝업 테스트 2"},
                { name: "팝업 테스트 3"},
            ]}
        />
     *
     **/


    // 컨텐츠
     <Box className={`content-footer btn-count-${buttonCount}`}>
     {/* 여러 개 버튼이 있을 경우 배열을 사용 */}
       {buttons && buttons.length > 0 ? (
         buttons.map((btn, index) => (
           <Button
             key={index}
             className="btn"
             onClick={btn.clickFunc}
             disabled={btn.disabled ?? false}
           >
             {btn.name}
           </Button>
         ))
       ) : (
         /* 단일 버튼을 사용할 경우 */
         <Button
           className="btn"
           onClick={clickFunc}
           disabled={disabled ?? false}
         >
           {name}
         </Button>
       )}
     </Box>
 

  );
};

// [2025-03-26 추가] 버튼 리스트 추가
//버튼리스트
interface ButtonListItemType {
  id: number;
  label: string;
  required?: boolean; // 필수 일 경우
}

interface buttonChoiceProps {
  items: ButtonListItemType[];
  onClick?: (id: number) => void; // 클릭 이벤트 추가
}

export const ButtonChoice = ({ items, onClick }: buttonChoiceProps) => {
  return (
    <List className="list-button-wrap choice-list on">
        {items.map(({ id, label, required }) => (
        <ListItem key={id} >
            <Button  aria-label={`옵션 선택: ${label}`} onClick={() => onClick?.(id)} >

              {/* !!!!!!선택됨은 예시입니다. "미선택" > 텍스트 들어갈 경우 "선택됨" 텍스트 변경 필요  상단 "on" 클래스 추가 필요 !!!!*/}

              <Typography component="span" className={required ? "essential" : undefined} >{label}</Typography><Typography component="span">선택됨</Typography>
            </Button>
        </ListItem>
      ))}
    </List>
  );
};


export default { ButtonContent, ButtonFooter, ButtonSm, ButtonChoice };