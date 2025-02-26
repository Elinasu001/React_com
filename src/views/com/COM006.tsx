import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, Tab, Tabs } from "@mui/material";
import { GLog, Common } from '@assets/js/common';
import { progressBar } from "@src/components/loading";
import { messageView } from '@src/components/alert';
import { TextBox, NumberBox, EmailBox, PwdBox, CheckBox, RadioBox } from "@src/components/input";
import PropTypes from 'prop-types';


const COM006 = () => {
  const { doAction, makeForm, addFormData } = Common();
  const [text, setText] = useState('');

  function CustomTabPanel(props) {
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
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [telCdData, settelCdData] = useState<{ CD: string; CD_NM: string }[]>([]);  /** 통신사코드리스트 */
  const [selectedCarrier, setSelectedCarrier] = useState("");                       /** 선택한통신사코드 */

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  useEffect(() => {
    selectBankList();
    
    }, []);

    

  // 입력값 초기화 함수
  const resetForm = () => {
   
  };

  // 닫기 버튼 클릭 시 입력값 초기화 후 팝업 닫기
  const handleClose = () => {
    resetForm(); // 입력값 초기화
    
  };
    
  const selectBankList = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('http://localhost:8050/COM0001SC.act');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'CD_DMN_ID','TEL_CD');

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    settelCdData(resDs.data.list || []);
   
  };
  

  return (
    
      <Box sx={{}}>
       
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">은행선택</Typography>
            
          </Box>

          
          <Box mt={3}>
            <TextBox label="은행검색" value={text} onChange={(e) => setText(e.target.value)} />
              
          </Box>

     
          <Box mt={3}>
            <Typography variant="body2">은행사</Typography>
            <Tabs value={value} onChange={handleChange} aria-label="follow/following tabs">
            <Tab label="은행사" {...a11yProps(0)} />
            <Tab label="증권사" {...a11yProps(1)} />
          </Tabs>




          </Box>
        
            <Select fullWidth value={selectedCarrier} onChange={(e) => setSelectedCarrier(e.target.value)} displayEmpty>
                <MenuItem value="" disabled>은행 선택하세요</MenuItem>
                {telCdData.map((carrier) => (
                <MenuItem key={carrier.CD} value={carrier.CD}>
                    {carrier.CD_NM}
                </MenuItem>
                ))}
            </Select>
           
      </Box>
 
  );
};

export default COM006;