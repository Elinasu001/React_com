/**
 * @fileoverview [공통] Redux 스토어 설정
 *  common_store.ts
 * @author 
 * @version 1.0.0
 */
import { configureStore } from '@reduxjs/toolkit';
import custDsReducer from '@src/assets/js/redux/slice/custDs';

export const store = configureStore({
  reducer: {
    custDs: custDsReducer
  },
});

// RootState, AppDispatch 타입 정의 (타입스크립트용)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;