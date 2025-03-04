/**
 * @fileoverview [공통] 로그인 처리
 * @file authSlice.ts
 * @author 
 * @version 1.0.0
 */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import DataSet from '@src/assets/io/DataSet';
import axios from 'axios';

interface User {
  USR_ID: string;         // 아이디
  USER_NM: string;        // 이름
  PHONE_NO: string;       // 전화번호
  CSNO: string;           // 로그인시각
  BIRTH_DAY: string;      // 생년월일
  LAST_LOGIN_TIME: string;  // 로그인 시간
}

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null
};

// 세션 갱신 API 호출을 위한 thunk
export const refreshSession = createAsyncThunk(
  'COM0000SC?txGbnCd=LOGIN&loginType=D',
  async (_, thunkAPI) => {
    try {
      // 세션 갱신 API 호출 (별도의 API 엔드포인트 사용)
      const response = await axios.post('/api/refreshSession', null, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data as User;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그아웃: 사용자 정보와 에러를 초기화
    logout(state) {
      state.user = null;
    },
    // 로그인 결과(성공) 전달 시 호출하여 사용자 정보를 저장
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  }
});

/**
 * DataSet 객체를 User 객체로 변환하는 헬퍼 함수
 * DataSet은 순수 객체가 아니므로, 필요한 값만 추출하여 순수 객체로 반환합니다.
 */
export const convertUserData = (ds: DataSet): User => ({
  USR_ID: ds.getString("USR_ID"),
  USER_NM: ds.getString("USER_NM"),
  PHONE_NO: ds.getString("PHONE_NO"),
  CSNO: ds.getString("CSNO"),
  BIRTH_DAY: ds.getString("BIRTH_DAY"),
  LAST_LOGIN_TIME: formatDate(new Date()), // "YYYYmmddhh24miss" 형식의 문자열
});

const formatDate = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더함
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

export const { login,logout } = authSlice.actions;
export default authSlice.reducer;