// 상대 경로를 사용하는 경우
import { Box, Typography } from "@mui/material";
import { ButtonChoice, ButtonContent } from "@src/assets/html/00_common/Button";




const Button_page = () => {
    
    // [2025-03-26 추가] 버튼 리스트 추가
    // 예시 데이터
    const items = [
        { id: 1, label: "은행선택", required: true },
        { id: 2, label: "출금계좌" },
        { id: 3, label: "개인 거래목적" },
        { id: 4, label: "사용중인 보안매체" },
    ];


    return (
        <Box sx={{ padding:"16px" }}>

            {/* [2025-03-26 추가] 버튼 리스트 추가 */}
            <Typography className="exp">셀렉트 형식 버튼<br/>(텍스트 들어갈 경우)</Typography>

            <ButtonChoice items={items} />

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
            

        </Box>
    );
};

export default Button_page;
