// .ts
/**
 * @fileoverview [공통] 네비게이션 전역객체
 *
 * @file navigationService.ts
 * @author GNB
 * @version 1.0.0
 */
import { createRef } from 'react';
import type { NavigateFunction } from 'react-router-dom';

export const navigationRef = createRef<NavigateFunction>();

export const getNavigation = (): NavigateFunction | null => {
  return navigationRef.current;
};