import { useState } from "react";
import { Typography, Box } from "@mui/material";
import {
  TextBox,
} from "@src/assets/html/00_common/form/input";
import { InputWithButton } from "@src/assets/html/00_common/form/InputButton";
import { InputSerch } from "@src/assets/html/00_common/form/InputSerch";
import { MoneyBox } from "@src/assets/html/00_common/form/InputUnit";
import { InputUnitWithButtons } from "@src/assets/html/00_common/form/InputUnitWithButtons";
import { ResidentNumber } from "@src/assets/html/00_common/form/InputRrn";
import { SelectInputBox } from "@src/assets/html/00_common/form/InputTel";
import { DatePickerValue } from "@src/assets/html/00_common/form/inputDate";
import dayjs from 'dayjs';

/**
 * 일반 테스트 화면 드로잉
 */
const InputTest  = () => {
  const [text, setText] = useState("");
  const [buttonValue, setButtonValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [totalSearchValue, setTotalSearchValue] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [money, setMoney] = useState("");
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("입력값을 입력해주세요.");
  const [dateValue, setDateValue] = useState<dayjs.Dayjs | null>(dayjs());
  const [monthValue, setMonthValue] = useState<dayjs.Dayjs | null>(dayjs());

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleBtnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonValue(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTotalSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalSearchValue(e.target.value);
  };

  const handleMoneyChange = (value: string) => {
    setMoney(value);
  };

  const handleErrorEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setErrorEmail(newValue);
    setErrorMessage("입력값을 입력해주세요.");
  };

  return (
    <>
    <Typography className="exp">기본 - 일반인풋</Typography>
    <Box className="formGroup">
      <TextBox 
        type="text"
        label="레이블"
        value={text} 
        onChange={handleTextChange}
      />
    </Box>

    <Typography className="exp">기본 - 버튼형</Typography>
    <Box className="formGroup">
      <InputWithButton
        label="버튼형 입력"
        value={buttonValue} 
        onChange={handleBtnChange}
        placeholder="버튼형 입력을 입력해주세요."
        buttonText="확인"
        onButtonClick={() => console.log('버튼 클릭')}
        />
        <InputSerch
        label="검색 입력"
        value={searchValue} 
        onChange={handleSearchChange}
        placeholder="검색어를 입력해주세요."
        buttonText="검색"
        onButtonClick={() => console.log('검색버튼 클릭')}
        />
        <InputSerch
        variant="total-search"
        label="통합 검색"
        value={totalSearchValue} 
        onChange={handleTotalSearchChange}
        placeholder="통합 검색어를 입력해주세요."
        buttonText="검색"
        onButtonClick={() => console.log('통합검색버튼 클릭')}
      />
    </Box>

    <Typography className="exp">기본 - 단위</Typography>
    <Box className="formGroup">
      <MoneyBox 
        label="레이블"
        value={money} 
        onChange={handleMoneyChange}
      />
      </Box>
      
      <Typography className="exp">기본 - 단위+버튼</Typography>
      <InputUnitWithButtons
        label="기본 단위+버튼"
        value={money}
        onChange={handleMoneyChange}
        buttons={[
          { name: "1만원"},
          { name: "5만원"},
          { name: "10만원" },
          { name: "1,000만원" },
          { name: "전액"},
        ]}
      />

    <Typography className="exp">전화번호 - 통신사</Typography>
    <Box className="formGroup">
      <SelectInputBox
        selectLabel="휴대폰 선택"
        selectOptions={[
          { label: "SKT", value: "SKT" },
          { label: "KT", value: "KT" },
          { label: "LGU+", value: "LGU+" },
          { label: "SKT(알뜰폰)", value: "SKT(알뜰폰)" },
          { label: "KT(알뜰폰)", value: "KT(알뜰폰)" },
          { label: "LGU+(알뜰폰)", value: "LGU+(알뜰폰)" },
        ]}
        selectValue={phonePrefix}
        onSelectChange={(e) => setPhonePrefix(e.target.value as string)}
        inputValue={phoneNumber}
        onInputChange={(e) => setPhoneNumber(e.target.value)}
      />
      </Box>
      
      <Typography className="exp">주민등록번호</Typography>
      <Box className="formGroup">
        <ResidentNumber
          label="주민등록번호 입력"
          firstValue={firstPart}
          secondValue={secondPart}
          onFirstChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstPart(e.target.value)}
          onSecondChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecondPart(e.target.value)}
        />
      </Box>


    <Typography className="exp">실패</Typography>
    <Box className="formGroup">
      <TextBox 
        type="email"
        label="에러가 있는 이메일 입력" 
        value={errorEmail} 
        onChange={handleErrorEmailChange}
        errorMessage={errorMessage}
      />
    </Box>
      
    <Typography className="exp">캘린더 날짜</Typography>
    <Box className="formGroup">
      <DatePickerValue 
        label="날짜 선택" 
        value={dateValue}
        onChange={(newValue) => setDateValue(newValue)}
        views={['year', 'month', 'day']}
      />
    </Box>
      
    <Typography className="exp">캘린더 월</Typography>
    <Box className="formGroup">
      <DatePickerValue 
        label="월 선택" 
        value={monthValue}
        onChange={(newValue) => setMonthValue(newValue)}
        views={['year', 'month']}
        format="YYYY년 MM월"
      />
    </Box>
    </>
  );
};

export default InputTest
