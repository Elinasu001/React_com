import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, Tab, Tabs } from "@mui/material";
import {  Common } from '@assets/js/common';
import { progressBar } from "@src/components/loading";
import { TextBox, NumberBox, EmailBox, PwdBox, CheckBox, RadioBox } from "@src/components/input";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
  );
};

interface COM006Props {
  onSelectBank: (bankCode: string) => void;  // 부모로 은행 코드 전달하는 함수
  onClose: () => void; // 팝업 닫기 함수
}

const COM006: React.FC<COM006Props> = ({ onSelectBank, onClose }) => {
  const { doAction, makeForm, addFormData } = Common();

  const [text, setText] = useState("");  // 검색어
  const [tabValue, setTabValue] = useState<number>(0);  // 현재 선택된 탭
  const [bankList, setBankList] = useState<{ CD: string; CD_NM: string }[]>([]); // 은행사 / 증권사 리스트
  const [selectedBank, setSelectedBank] = useState<string>(""); // 선택한 은행

  

  //  탭 변경 이벤트
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const searchBank = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('http://localhost:8050/COM0006SC.act');
    addFormData(form,'txGbnCd','S02');
    addFormData(form,'CD_NM',text);

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    setBankList(resDs.data.list || []);
   
  };
    
  const fetchBankList = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('http://localhost:8050/COM0006SC.act');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'CD_DMN_ID','BNK_CD');

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    setBankList(resDs.data.list || []);
   
  };
  
  // 화면진입시 은행코드 호출
  useEffect(() => {
    fetchBankList();
  }, []);

  // 입력값 초기화 함수
  const resetForm = () => {
    setText("");
    setSelectedBank("");
  };

  const a11yProps = (index: number) => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  });

  // 은행 선택 시 처리
  const handleBankSelect = (bankCode: string) => {
    setSelectedBank(bankCode);
    onSelectBank(bankCode); // 부모로 은행 코드 전달
    onClose(); // 팝업 닫기
  };
  

  return (
    
      <Box sx={{}}>
       
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">은행선택</Typography>
            
          </Box>

          {/* 검색 입력 필드 */}
          <Box mt={3}>
            <TextBox label="은행검색" value={text} onChange={(e) => setText(e.target.value)} />
              <Button variant="contained" color="primary"   onClick={searchBank} >검색</Button>
          </Box>

          {/* 탭영역 */}
          <Box mt={3}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="은행사/증권사 선택">
              <Tab label="은행사" {...a11yProps(0)} />
              <Tab label="증권사" {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/* 은행사 목록 */}
          <CustomTabPanel value={tabValue} index={0}>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {bankList.filter((bank) => bank.CD.startsWith("0")) 
              .map((bank) => (
                <Box
                  key={bank.CD}
                  component="li"
                  sx={{padding: "10px",
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    backgroundColor: selectedBank === bank.CD ? "#f0f0f0" : "transparent",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                  onClick={() => handleBankSelect(bank.CD)}
                >
                  {bank.CD_NM}
                </Box>
              ))}
            </Box>
          </CustomTabPanel>

          {/* 증권사 목록 */}
          <CustomTabPanel value={tabValue} index={1}>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {bankList.filter((bank) => bank.CD.startsWith("2")) 
              .map((bank) => (
                <Box
                  key={bank.CD}
                  component="li"
                  sx={{padding: "10px",
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    backgroundColor: selectedBank === bank.CD ? "#f0f0f0" : "transparent",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                  onClick={() => handleBankSelect(bank.CD)}
                >
                  {bank.CD_NM}
                </Box>
              ))}
            </Box>
        </CustomTabPanel>

           
      </Box>
 
  );
};

export default COM006;