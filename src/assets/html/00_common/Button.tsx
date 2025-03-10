/**
 * @file Button.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Box, Button } from '@mui/material';

// ** 기존과 바뀐 내용  **
// clickFunc > onclick 으로 통일
// btnName > name 으로 통일
// 단일 버튼과 여러 개 버튼으로 나누어 사용 가능

// 버튼 속성 통일
interface ButtonProps {

  // 단일 버튼용
  name?: string;
  onClick?: () => void;
  disabled?: boolean;

  // 여러 개 버튼 지원
  buttons?: {
    name: string;
    onClick?: () => void;
    disabled?: boolean;
  }[];

  
}

// 컨텐츠 버튼 ex) 카드 내부 버튼, 일반 페이지 버튼
export const ButtonContent = ({ name, onClick, disabled, buttons }: ButtonProps) => {
  
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
            onClick={btn.onClick}
            disabled={btn.disabled ?? false}
          >
            {btn.name}
          </Button>
        ))
      ) : (
        /* 단일 버튼을 사용할 경우 */
        <Button
          className="btn"
          onClick={onClick}
          disabled={disabled ?? false}
        >
          {name}
        </Button>
      )}
    </Box>

  );
};

// 컨텐츠 하단 버튼 ex) 팝업 하단 버튼, 일반 페이지 하단 버튼
export const ButtonFooter = ({ name, onClick, disabled, buttons }: ButtonProps) => {

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
             onClick={btn.onClick}
             disabled={btn.disabled ?? false}
           >
             {btn.name}
           </Button>
         ))
       ) : (
         /* 단일 버튼을 사용할 경우 */
         <Button
           className="btn"
           onClick={onClick}
           disabled={disabled ?? false}
         >
           {name}
         </Button>
       )}
     </Box>
 

  );
};


export default { ButtonContent };