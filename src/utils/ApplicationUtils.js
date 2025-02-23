import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/** ✅ 공통 유틸리티 함수 모음 */
export const Utils = {
  format: (val, format) => {
    if (typeof val === "undefined") val = "";
    val = val + "";
    let retVal = "";
    const length = val.length;

    switch (format) {
      case "date":
        retVal = val.replace(/[^\d]/g, "").replace(/(\d{4})(\d{2})/, "$1-$2-");
        break;
      case "amt":
        val = val.replace(/,/g, "");
        retVal = Number(val).toLocaleString();
        break;
      case "manwon":
        val = Math.floor(val.replace(/,/g, '')/10000);
        retVal = String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        break;	
      case "time":
        retVal = val.replace(/[^\d]/g, "").replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
        break;
      default:
        retVal = val;
        break;
    }
    return retVal;
  },

  getStepLabel: (step) => {
    const stepLabels = {
      rsve: "준비",
      anl: "분석",
      design: "설계",
      test: "테스트",
      flfl: "이행",
    };
    return stepLabels[step] || step; // 매칭되지 않으면 원래 값 반환
  },
};


export default Utils;
