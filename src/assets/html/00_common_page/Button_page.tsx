// 상대 경로를 사용하는 경우
import { ButtonContent } from "@src/assets/html/00_common/Button";

const Button_page = () => {
  return (
    <>
        
        <ButtonContent
            name="버튼 1개"
        />


        <ButtonContent
            buttons={[
                { name: "버튼 2개"},
                { name: "버튼 2개"},
            ]}
        />

        <ButtonContent
            buttons={[
                { name: "버튼 3개"},
                { name: "버튼 3개"},
                { name: "버튼 3개"},
            ]}
        />

        <ButtonContent
            name="버튼 1개"
            disabled={true}
        />

        <ButtonContent
            buttons={[
                { name: "DISABLED", disabled:true},
                { name: "DISABLED", disabled:true},
            ]}
        />
        

        {/* <ButtonFooter
            buttons={[
                { name: "팝업 테스트 1"},
                { name: "팝업 테스트 2"},
                { name: "팝업 테스트 3"},
            ]}
        /> */}
        
    </>
  );
};

export default Button_page;
