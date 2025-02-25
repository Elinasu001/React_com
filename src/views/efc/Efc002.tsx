import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  
  // handleMouseDownPassword의 event 타입을 명시
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 가능, 4자리 초과는 잘라냄
    if (/^\d*$/.test(value)) {
      setPassword(value.slice(0, 4));
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen">
      <p className="mb-4 text-lg">변경할 비밀번호를 입력해주세요.</p>
      <TextField
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={password}
        onChange={handleInputChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
};

export default PasswordInput;
