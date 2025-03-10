// 상대 경로를 사용하는 경우
import { Typography } from "@mui/material";
import { messageView } from "@src/assets/html/00_common/Alert";
import { ButtonContent } from "@src/assets/html/00_common/Button";

const Alert_page = () => {
  return (
    <>
        <Typography className="exp">알럿 버튼 1개</Typography>

        <ButtonContent
            buttons={[
                {
                name: "Alert 호출",
                    onClick: () => {
                        messageView(
                        "이것은 알럿 메시지입니다.",
                        "확인",
                        () => console.log("확인 버튼 클릭됨"),
                        );
                    },
                },
            ]}
        />

        <Typography className="exp">알럿 버튼 2개</Typography>

        <ButtonContent
            buttons={[
                {
                name: "Alert Confirm 호출",
                    onClick: () => {
                        messageView(
                        '두 개 버튼 메시지',
                        "확인",
                        () => console.log("확인 버튼 클릭"),
                        "취소",
                        () => console.log("취소 버튼 클릭")
                        );
                    },
                },
            ]}
        />
        
    </>
  );
};

export default Alert_page;
