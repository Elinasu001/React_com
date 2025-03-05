/**
 * @fileoverview [팝업] 조회기간설정
 *
 * @author 
 * @version 1.0.0
 */
import { Stack, TextField, Typography } from "@mui/material";
import DataSet from "@src/assets/io/DataSet";
import getDate from "@src/assets/js/common_date";
import { Box01, MainBox } from "@src/components/Box";
import { Button01 } from "@src/components/Button";
import { TextBox } from "@src/components/Input";
import { Tab01 } from "@src/components/Tab";
import { TextBox02 } from "@src/components/Text";
import { useState } from "react";

const tabItems1 = [
  { label: "1주일", value: "1주일" },
  { label: "1개월", value: "1개월" },
  { label: "3개월", value: "3개월" },
  { label: "6개월", value: "6개월" },
  { label: "직접입력", value: "직접입력" },

];


const tabItems2 = [
  { label: "전체", value: "" },
  { label: "입금", value: "입금" },
  { label: "출금", value: "출금" },
];

const tabItems3 = [
  { label: "최신순", value: "최신순" },
  { label: "과거순", value: "과거순" },
];



const POP003 = ({ param, onClose }: { param: DataSet; onClose: (data?: DataSet) => void }) => {



  // 탭 변경 시 이벤트
  const handleTabChange1 = (value: string | number) => {
    setSelectedDate(value.toString());
  };

  const handleTabChange2 = (value: string | number) => {
    setLnpBase(value.toString());
  };


  const [selectedDate, setSelectedDate] = useState("3개월");
  const [ioDvcd, setioDvcd] = useState("전체");
  const [lnpBase, setLnpBase] = useState("최신순");
  const [searchName, setSearchName] = useState("");
  const [isDeposit, setIsDeposit] = useState(false);

  const popupResult =new DataSet({ 
    selectedDate, 
    ioDvcd, 
    searchName, 
    isDeposit,
    lnpBase
  })

  const handleSearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleTypeTabChange = (value: string | number) => {
    setioDvcd(value.toString());
    if (value === "1") {
      setIsDeposit(true);  
    } else {
      setIsDeposit(false);  
    }
  };


  return (
    <MainBox>
      <Typography>조회기간</Typography>
      <Tab01 items={tabItems1} initialValue="3개월" onChange={handleTabChange1}/>
      {/* 날짜 선택 */}
      

      <Typography>거래유형</Typography>
      <Tab01 items={tabItems2} initialValue="" onChange={handleTypeTabChange}/>

      {isDeposit && (
        <Box01 padding="24px" maxWidth="500px"> 
          <TextBox02 text="입금자명 검색" /> 
          <TextField
            label="입금자명"  
            variant="outlined"  
            fullWidth  
            value={searchName}  
            onChange={handleSearchNameChange}  
            sx={{ mb: 2 }}  
          />
        </Box01>
      )}

      <Typography>정렬순서</Typography>
      <Tab01 items={tabItems3} initialValue="최신순" onChange={handleTabChange2}/>
      <Button01 btnName="조회" clickFunc={() => onClose(popupResult)} />
    </MainBox>
  );
};

export default POP003;
