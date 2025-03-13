// 상대 경로를 사용하는 경우
import { Typography } from "@mui/material";
import { ButtonContent } from "@src/assets/html/00_common/Button";

const Button_page = () => {
  return (
    <>
        <Typography className="exp">컨텐츠 버튼은 ButtonContent <br/> 하단 버튼은 ButtonFooter 사용</Typography>

        <Typography className="exp">버튼 1개일 경우</Typography>

        <ButtonContent
            name="버튼 1개"
        />

        <Typography className="exp">버튼 2개일 경우</Typography>

        <ButtonContent
            buttons={[
                { name: "버튼 2개"},
                { name: "버튼 2개"},
            ]}
        />

        <Typography className="exp">버튼 3개일 경우</Typography>

        <ButtonContent
            buttons={[
                { name: "버튼 3개"},
                { name: "버튼 3개"},
                { name: "버튼 3개"},
            ]}
        />

        <Typography className="exp">Disabled</Typography>

        <ButtonContent
            name="Disabled"
            disabled={true}
        />
        
        <Typography className="exp">Disabled</Typography>

        <ButtonContent
            buttons={[
                { name: "Disabled", disabled:true},
                { name: "Disabled", disabled:true},
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
