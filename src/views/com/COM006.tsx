import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, Tab, Tabs } from "@mui/material";
import { doAction, makeForm, addFormData } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { TextBox } from "@src/components/Input";
import DataSet from "@assets/io/DataSet";
import { Tab01 } from "@src/components/Tab";
import { Box01 } from "@src/components/Box";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function CustomTabPanel(props: CustomTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}


const COM006 = (props: { onClose: (data?: DataSet) => void }) => {

  const [text, setText] = useState("");                                           // 검색어
  const [tabValue, setTabValue] = useState<number>(0);                            // 현재 선택된 탭
  const [bankList, setBankList] = useState<{ CD: string; CD_NM: string }[]>([]);  // 은행사 / 증권사 리스트
  const [selectedBank, setSelectedBank] = useState<string>("");                   // 선택한 은행
  const [tabItem, setTabItem] = useState<{value:string; label:string}[]>([]);
  
  useEffect(() => {
    setTabItem([
      { value: "tab1", label: "은행사" },
      { value: "tab2", label: "증권사" }
    ]);
  }, []);

  /** 
   * TODO 탭변경
   * <Tab01  items={tabItem}
            initialValue={tabValue}
            
          /> */

  //  탭 변경 이벤트
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const searchBank = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0006SC');
    addFormData(form,'txGbnCd','S02');
    addFormData(form,'CD_NM',text);

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    const list = (resDs.data?.list as { CD: string; CD_NM: string }[]) ?? [];
    setBankList(list);
   
  };
    
  const fetchBankList = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0006SC');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'CD_DMN_ID','BNK_CD');

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    const list = (resDs.data?.list as { CD: string; CD_NM: string }[]) ?? [];

    setBankList((prev) => (JSON.stringify(prev) === JSON.stringify(list) ? prev : list));
   
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

  const handleBankSelect = (bankCode: string, bankName: string) => {

    console.log("선택한 은행 코드:", bankCode, bankName);

    const selectedData = new DataSet({ bankCode, bankName });
    props.onClose(selectedData); // 팝업 닫고 데이터 전달

  };

  return (
    
      <Box01 >

          {/* 검색 입력 필드 */}
          <TextBox label="은행검색" value={text} onChange={(e) => setText(e.target.value)} />
          <Button variant="contained" color="primary"   onClick={searchBank} >검색</Button>
          

          {/* 탭영역 */}
          
          <Tabs  
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="은행사/증권사 선택"
          >
              <Tab label="은행사" {...a11yProps(0)} />
              <Tab label="증권사" {...a11yProps(1)} />
            </Tabs>

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
                  onClick={() => handleBankSelect(bank.CD, bank.CD_NM)} 
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
                  onClick={() => handleBankSelect(bank.CD, bank.CD_NM)}
                >
                  {bank.CD_NM}
                </Box>
              ))}
            </Box>
        </CustomTabPanel>

           
      </Box01>
 
  );
};

export default COM006;