import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import { doActionURL, doActionView } from "@src/assets/js/common";
import DataSet from "@src/assets/io/DataSet";

const Menu = ({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) => {

  //메뉴 정의
  const menuItems = [
    { text: "홈", icon: <HomeIcon />, path: "/" , txGbnCd: ""},
    { text: "기능 테스트", icon: <CodeIcon />, path: "/test.view", txGbnCd: ""},
    { text: "폼 테스트", icon: <CodeIcon />, path: "/inputTest.view", txGbnCd: ""},
    { text: "네이티브", icon: <CodeIcon />, path: "/nativeTest.view", txGbnCd: ""},
    { text: "공통(COM)", icon: <CodeIcon />, path: "/BankingTest.view", txGbnCd: "com"},
    { text: "조회(INQ)", icon: <CodeIcon />, path: "/BankingTest.view", txGbnCd: "inq"},
    { text: "이체(TNF)", icon: <CodeIcon />, path: "/BankingTest.view", txGbnCd: "tnf"},
    { text: "예적금(DEP)", icon: <CodeIcon />, path: "/BankingTest.view", txGbnCd: "dep"},
    { text: "대출(LON)", icon: <CodeIcon />, path: "/BankingTest.view", txGbnCd: "lon"},
    { text: "뱅킹관리(EFC)", icon: <CodeIcon />, path: "/BankingTest.view", txGbnCd: "efc"},
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                if(item.txGbnCd == ''){
                  doActionURL(item.path);
                }else{
                  doActionView(item.path,new DataSet({'page':item.text,'txGbnCd':item.txGbnCd}));
                }
                onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;