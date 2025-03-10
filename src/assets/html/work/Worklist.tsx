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
        Layout_NoButton
      </Button>
      <Button onClick={() => navigate("/html/Layout.html")}>
        Layout_hasNav
      </Button>
      <Button onClick={() => navigate("/html/Layout.html")}>
        Layout_hasButton
      </Button>
      <Button onClick={() => navigate("/html/Popup_page.html")}>
        Popup
      </Button>
      <Button onClick={() => navigate("/html/SelectPopup_page.html")}>
        SelectPopup
      </Button>
      <Button onClick={() => navigate("/html/Alert_page.html")}>
        Alert
      </Button>
      <Button onClick={() => navigate("/html/Input_page.html")}>
        Input
      </Button>
      <Button onClick={() => navigate("/html/SelectBox_page.html")}>
        SelectBox
      </Button>
      <Button onClick={() => navigate("/html/Button_page.html")}>
        Button
      </Button>
      <Button onClick={() => navigate("/html/Accordion_page.html")}>
        Accordion
      </Button>
      <Button onClick={() => navigate("/html/Tab_page.html")}>
        Tab
      </Button>
      <Button onClick={() => navigate("/html/List_page.html")}>
        List
      </Button>
      <Button onClick={() => navigate("/html/Card_page.html")}>
        Card
      </Button>
      <Button onClick={() => navigate("/html/Textlist_page.html")}>
        Textlist
      </Button>
      
    </Box>
  );
};

export default Worklist;