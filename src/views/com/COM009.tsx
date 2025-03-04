/**
 * @fileoverview [공통] 직종선택
 *
 * @author 
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { GLog, doAction, makeForm, addFormData } from "@src/assets/js/common";
import { progressBar } from "@src/components/Loading";
import { BoxList, Box01 } from "@src/components/Box";
import { TextBox } from "@src/components/Input";
import { Button01 } from "@src/components/Button";
import { messageView } from '@src/components/Alert';
import DataSet from "@assets/io/DataSet";

const COM009 = () => {
  const JOB_RESET_ARRY = [
    { CODE: "1", WORKVAL: "임원 등 고위 관리자" },
    { CODE: "2", WORKVAL: "전문가 및 관련종사자" },
    { CODE: "3", WORKVAL: "사무 종사자" },
    { CODE: "4", WORKVAL: "서비스 종사자" },
    { CODE: "5", WORKVAL: "판매 종사자" },
    { CODE: "6", WORKVAL: "농림·어업 숙련 종사자" },
    { CODE: "7", WORKVAL: "기능원 및 관련 기능 종사자" },
    { CODE: "8", WORKVAL: "장치·기계 조작 및 조립 종사자" },
    { CODE: "9", WORKVAL: "단순노무 종사자" },
    { CODE: "A", WORKVAL: "군인" },
    { CODE: "Z", WORKVAL: "기타" },
  ];

  const [inputJob, setInputJob] = useState("");   // 검색어

  const jobSelectItems = (CODE: string) => {
    GLog.d(`선택한 직종 코드: CODE`+CODE);
  };
  
  const searchJob = async () => {
    
    if(inputJob.trim() === '') {
          messageView("직종을 입력해 주세요", "확인");
          return;
    }

    const form = makeForm("COM0009SC");
    addFormData(form, "txGbnCd", "S01");
    addFormData(form, "WORKVAL", inputJob);

     try {
    
          //통신
          const resDs = await doAction(form);
    
          //로딩 OFF
          progressBar(false);
    
          if(resDs.header.respCd != 'N00000'){
            messageView(resDs.header.respMsg, "확인", );
            return;
          }else {
            if (resDs.data.getString('API_RS_MSG') != "SUCCESS") {
              messageView(resDs.data.getString('API_RS_MSG'), "확인", );
              
            }else {
              
             
                const list = (resDs.data.getList<{ }>("REC")[0] ?? []);
  
                const outData = new DataSet(list)
                GLog.d("직종검증::::"+JSON.stringify(outData));
  
             
            }
          }
          
    
        } catch(error){
          progressBar(false);
          GLog.e("직종 검색 중 오류 발생:", error);
          messageView("직종 검색 중 오류가 발생했습니다.", "확인",);
                   
        }


  };


  return (
    <>
    <Box01>

       <TextBox label="직종검색" value={inputJob} onChange={(e) => setInputJob(e.target.value)} />
       <Button01 btnName="검색" clickFunc={searchJob}></Button01>
    </Box01>
    <BoxList
        items={JOB_RESET_ARRY.map((jobList) => ({
          key: jobList.CODE,
          label: jobList.WORKVAL,
          onClick: () => jobSelectItems(jobList.CODE),
        }))}
    />
    </>    
  );
};

export default COM009;
