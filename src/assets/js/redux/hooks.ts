/**
 * @fileoverview [공통] hooks 타입 정의
 * @file hooks.ts
 * @author 
 * @version 1.0.0
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@assets/js/redux/store';

// 커스텀 훅: useAppDispatch, useAppSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;