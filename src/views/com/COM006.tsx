/**
 * @fileoverview [공통] 은행리스트팝업
 *  
 * @author 
 * @version 1.0.0
 */

import { useEffect, useState } from "react";
import DataSet from "@assets/io/DataSet";
import { addFormData, doAction, makeForm } from '@assets/js/common';
import { BoxList } from "@src/components/Box";
import { Box } from "@mui/material";
import { Button01 } from "@src/components/Button";
import { TextBox } from "@src/components/InputType";
import { progressBar } from "@src/components/Loading";
import { Tab01 } from "@src/components/Tab";

const COM006 = (props: { onClose: (data?: DataSet) => void }) => {

  const [text, setText] = useState("");                                           // 검색어
  const [bankList, setBankList] = useState<{ CD: string; CD_NM: string }[]>([]);  // 은행사 / 증권사 리스트
  const [selectedBank, setSelectedBank] = useState<string>("");                   // 선택한 은행

  // 은행검색이벤트
  const searchBank = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0006SC');
    addFormData(form,'txGbnCd','S02');
    addFormData(form,'CD_NM',text);

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    const list = (resDs.data.getList('list') as { CD: string; CD_NM: string }[]) ?? [];
    setBankList(list);
   
  };
    
  // 은행코드리스트조회이벤트
  const fetchBankList = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0006SC');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'CD_DMN_ID','BNK_CD');

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const resDs = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    const list = (resDs.data?.getList('list') as { CD: string; CD_NM: string }[]) ?? [];
    setBankList(list);
   
  };
  
  // 화면진입시 은행코드 호출
  useEffect(() => {
    fetchBankList();
  }, []);

  // 입력값 초기화 함수
  const resetForm = () => {
    setText("");
    setSelectedBank("");
  };

  const handleBankSelect = (bankCode: string, bankName: string) => {

    console.log("선택한 은행 코드:", bankCode, bankName);

    const selectedData = new DataSet({ bankCode, bankName });
    props.onClose(selectedData); // 팝업 닫고 데이터 전달
    resetForm();

  };

  return (
        <>
          <Box className="content">
            {/* 검색 입력 필드 */}
            <TextBox label="은행검색" value={text} onChange={(e) => setText(e.target.value)} />
            <Button01 btnName="검색" clickFunc={searchBank}></Button01>
          
            <Tab01
              initialValue="bank" // 기본 선택 탭 설정
              containerClass="round" // 컨테이너 클래스 설정
              isScrollable={true}  // 스크롤 사용 여부
              items={[
                {
                  label: "은행사",
                  value: "bank",
                  component: (
                    <BoxList
                      items={bankList
                        .filter((bank) => bank.CD.startsWith("0"))
                        .map((bank) => ({
                          key: bank.CD,
                          label: bank.CD_NM,
                          onClick: () => handleBankSelect(bank.CD, bank.CD_NM),
                        }))}
                      selectedKey={selectedBank}
                    />
                  ),
                },
                {
                  label: "증권사",
                  value: "securities",
                  component: (
                    <BoxList
                      items={bankList
                        .filter((bank) => bank.CD.startsWith("2"))
                        .map((bank) => ({
                          key: bank.CD,
                          label: bank.CD_NM,
                          onClick: () => handleBankSelect(bank.CD, bank.CD_NM),
                        }))}
                      selectedKey={selectedBank}
                    />
                  ),
                },
              ]}
            />
          </Box>
        </>
  );
};

export default COM006;