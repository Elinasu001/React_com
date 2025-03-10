/**
 * @file EFC014.tsx
 * @description 
 * @author
 * @version 1.0.0
 */

import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './worklist.scss';


const Worklist = () => {
  const navigate = useNavigate();

  return (
    // 현재 링크는 컴포넌트를 불러오는 화면입니다.
    <Box className="worklist-wrapper">
       <Button onClick={() => navigate("/html/Layout.html")}>
        Layout_NoButton - 차장님
      </Button>
      <Button onClick={() => navigate("/html/Layout.html")}>
        Layout_hasNav - 차장님
      </Button>
      <Button onClick={() => navigate("/html/Layout.html")}>
        Layout_hasButton - 차장님
      </Button>
      <Button onClick={() => navigate("/html/Popup_page.html")}>
        Popup - 박수현
      </Button>
      <Button onClick={() => navigate("/html/Alert_page.html")}>
        Alert - 박수현
      </Button>
      <Button onClick={() => navigate("/html/SelectPopup_page.html")}>
        SelectPopup - 차장님
      </Button>
      <Button onClick={() => navigate("/html/Input_page.html")}>
        Input - 차장님
      </Button>
      <Button onClick={() => navigate("/html/SelectBox_page.html")}>
        SelectBox - 차장님
      </Button>
      <Button onClick={() => navigate("/html/Button_page.html")}>
        Button - 박수현
      </Button>
      <Button onClick={() => navigate("/html/Accordion_page.html")}>
        Accordion - 박수현
      </Button>
      <Button onClick={() => navigate("/html/Tab_page.html")}>
        Tab - 박수현
      </Button>
      <Button onClick={() => navigate("/html/List_page.html")}>
        List - 박수현
      </Button>
      <Button onClick={() => navigate("/html/Card_page.html")}>
        Card - 박수현
      </Button>
      <Button onClick={() => navigate("/html/Text_page.html")}>
        Text - 박수현
      </Button>
      
    </Box>
  );
};

export default Worklist;