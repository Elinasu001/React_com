/**
 * @fileoverview [공통] 로그인 고객정보 상태 슬라이스
 * @file authSlice.ts
 * @author 
 * @version 1.0.0
 */
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import DataSet from '@src/assets/io/DataSet';
import getDate from '@assets/js/common_date';

export interface CustDs {
  USR_ID: string;           // 아이디
  USER_NM: string;          // 이름
  PHONE_NO: string;         // 전화번호
  CSNO: string;             // 로그인시각
  BIRTH_DAY: string;        // 생년월일
  LAST_LOGIN_TIME: string;  // 로그인 시간
}

const initialState: { user: CustDs | null } = {
  user: null
};

const custDsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그아웃: 사용자 정보와 에러를 초기화
    logout(state) {
      state.user = null;
    },
    // 로그인 결과(성공) 전달 시 호출하여 사용자 정보를 저장
    login(state, action: PayloadAction<CustDs>) {
      state.user = action.payload;
    },
  }
});

/**
 * DataSet 객체를 User 객체로 변환하는 헬퍼 함수
 * DataSet은 순수 객체가 아니므로, 필요한 값만 추출하여 순수 객체로 반환합니다.
 */
export const convertUserData = (ds: DataSet): CustDs => ({
  USR_ID: ds.getString("USR_ID"),
  USER_NM: ds.getString("CUST_NM"),
  PHONE_NO: ds.getString("PHONE_NO"),
  CSNO: ds.getString("CSNO"),
  BIRTH_DAY: ds.getString("BIRTH_DAY"),
  LAST_LOGIN_TIME: getDate('YYYYMMDDhhmmss'),//오늘날짜
});

export const { login,logout } = custDsSlice.actions;
export default custDsSlice.reducer;