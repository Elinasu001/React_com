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
import { Common } from '@assets/js/common';

const Menu = ({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) => {
  const { doActionURL } = Common();

  //메뉴 정의
  const menuItems = [
    { text: "홈", icon: <HomeIcon />, path: "/" },
    { text: "테스트", icon: <CodeIcon />, path: "/test.view" },
    { text: "네이티브테스트", icon: <CodeIcon />, path: "/nativeTest.view" },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                doActionURL(item.path);
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