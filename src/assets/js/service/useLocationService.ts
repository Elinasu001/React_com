// .ts
/**
 * @fileoverview [공통] 로케이션 전역객체
 *
 * @file useLocationService.ts.ts
 * @author GNB
 * @version 1.0.0
 */
import { createRef } from 'react';
import type { Location } from 'react-router-dom';

// 전역으로 사용할 location ref
export const locationRef = createRef<Location>();

/**
 * 현재 저장된 location 객체를 반환합니다.
 * 아직 설정되지 않았다면 null을 반환합니다.
 */
export const getLocation = (): Location | null => {
  return locationRef.current;
};