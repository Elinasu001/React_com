import { useState } from 'react';

import { Box } from "@mui/material";
import { TextBox, NumberBox, EmailBox, PwdBox, CheckBox, RadioBox } from "@src/components/input";

/**
 * 일반 테스트 화면 드로잉
 */
const InputTest = () => {

  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('Option1');

  return (
    <Box sx={{textAlign: 'center'}}>
      <TextBox label="텍스트 입력" value={text} onChange={(e) => setText(e.target.value)} />
      <NumberBox label="숫자 입력" value={number} onChange={(e) => setNumber(e.target.value)} />
      <EmailBox label="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PwdBox label="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
      <CheckBox label="체크박스 확인" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
      <RadioBox label="선택 옵션" options={['Option1', 'Option2', 'Option3']} value={radioValue} onChange={(e) => setRadioValue(e.target.value)} />
    </Box>
  );
};

export default InputTest;