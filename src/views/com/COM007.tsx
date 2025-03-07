/**
 * @fileoverview [공통] 주소검색팝업
 *
 * @author 
 * @version 1.0.0
 */
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { GLog, doAction, makeForm, addFormData } from "@src/assets/js/common";
import { progressBar } from "@src/components/Loading";
import { TextBox } from "@src/components/InputType";
import { Button01 } from "@src/components/Button";
import { BoxList } from "@src/components/Box";
import { messageView } from '@src/components/Alert';
import { TextLabel01 } from "@src/components/TextList";
import DataSet from "@assets/io/DataSet";

const COM007 = (props: { onClose: (data?: DataSet) => void }) => {

  const [inputAddr, setInputAddr] = useState("");   // 검색어
  const [inputDetailAddr, setInputDetailAddr] = useState("");   // 상세주소
  const [flag, setFlag] = useState("");             // 주소조회검증플래그 1:조회, 2:검증
  const [addrList, setAddrList] = useState<Record<string, any>[]>([]);
  const [selectedAddr, setSelectedAddr] = useState<string[]>([]); 
  const [selectedAddrText, setSelectedAddrText] = useState<string[]>([]);
  const [selectedAddrInfo, setSelectedAddrInfo] = useState<DataSet | null>(null); 
  const [showInput, setShowInput] = useState(false);   



  useEffect(() => {
    if (inputAddr === ""  && showInput) {
      resetForm();
    }
  }, [inputAddr, showInput]);

  const searchAddrWithForm = async (form: any, currentFlag: string) => {

    try {

      //통신
      const resDs = await doAction(form);

      //로딩 OFF
      progressBar(false);

      if(resDs.header.respCd != 'N00000'){
        messageView(resDs.header.respMsg, "확인", () => resetForm());
        return;
      }else {
        const resData = new DataSet(resDs);
        if(resData.getString('resData').split(',')[0] === 'ECB12262'){
          
          messageView("입력하신 주소로 200건 이상의 주소가 검색돼요.", "확인", () => resetForm());
          return;
        }else {

          if (resDs.data.getString('API_RS_MSG') != "SUCCESS") {
            messageView(resDs.data.getString('API_RS_MSG'), "확인", () => resetForm());
            
          }else {
            
            if(currentFlag  === "1"){
              const list = (resDs.data.getList<{ }>("REC") ?? []).flat();
              setAddrList(list);
            }else if(currentFlag  === "2"){
              const list = (resDs.data.getList<{ }>("REC_1")[0] ?? []);

              const outData = new DataSet(list)
              GLog.d("주소검증::::"+JSON.stringify(outData));

              props.onClose(outData); // 팝업 닫고 데이터 전달
              resetForm();
            }
          }

        }
      }
      

    } catch(error){
      progressBar(false);
      GLog.e("주소 검색 중 오류 발생:", error);
      messageView("주소 검색 중 오류가 발생했습니다.", "확인", () => resetForm());
               
    }
   

  }
  // 입력값 초기화 함수
  const resetForm = () => {
    setInputAddr("");
    setInputDetailAddr("");
    setFlag("");
    setAddrList([]);
    setShowInput(false);
  };

  // 주소검색이벤트
  const searchAddr = async () => { 
    
    if(inputAddr.trim() === '') {
      messageView("주소를 입력해 주세요", "확인");
      return;
    }
    setFlag(prevFlag => {
      const newFlag = "1";
   
      const form = makeForm("COM0007SC");
      addFormData(form, "txGbnCd", "S01");
      addFormData(form, "INPT_ADDR", inputAddr);
      addFormData(form, "FLAG", newFlag);  
      setShowInput(false);
      searchAddrWithForm(form, newFlag);
      return newFlag;
    });
    
    //로딩 ON
    progressBar(true, "통신중");

  };

  const handleAddrSelect = (addr: Record<string, any>) => {
  
      
      setSelectedAddr(addr.ZPCD); 
      
      const selectedData = new DataSet({ addr});

      const roadAddr = addr.ZPCD_ADDR.split("\n")[0].replace("[도로명주소] ", ""); // 도로명 주소
      const jibunAddr = addr.ZPCD_ADDR.split("\n")[1]?.replace("[지번주소] ", ""); // 지번 주소
      const newAddrInfo = new DataSet(selectedData.getObj('addr'));
      setSelectedAddrInfo(newAddrInfo);

      setSelectedAddrText([
        `우편번호: ${addr.ZPCD}`,
        `도로명 주소: ${roadAddr}`,
        `지번 주소: ${jibunAddr}`
      ]);
      setShowInput(true);
      // props.onClose(selectedData); // 팝업 닫고 데이터 전달
      // resetForm();
  
    };


    // 주소검증이벤트
    const handleAddrInfoClose = () => {

      if(inputDetailAddr.trim() === '') {
        messageView("상세주소를 입력해 주세요", "확인");
        return;
      }
      

      const selectedData = new DataSet({ selectedAddrInfo});

      setFlag(prevFlag => {
        const newFlag = "2";
    
        const form = makeForm("COM0007SC");
        addFormData(form, "txGbnCd", "S01");
        addFormData(form, "INPT_ADDR", inputAddr);
        addFormData(form, "FLAG", newFlag);  
    
        if (selectedAddrInfo) {
          addFormData(form, "ZPCD", selectedAddrInfo.getString('ZPCD'));  
          addFormData(form, "ZPCD_ADDR", selectedAddrInfo.getString('ZPCD_ADDR'));  
          addFormData(form, "DTAD", inputDetailAddr);  
        }
    
        searchAddrWithForm(form, newFlag);
        return newFlag;
      });
  
    };

  return (
    <>
        <Box className="content">

            {/* 검색 입력 필드 */}
            <TextBox label="주소검색" value={inputAddr} onChange={(e) => setInputAddr(e.target.value)} />
            <Button01 btnName="검색" clickFunc={searchAddr}></Button01>
            {!showInput && (     
                 <BoxList
                 items = {addrList.map((addr, index) => {
                   const roadAddr = addr.ZPCD_ADDR.split("\n")[0].replace("[도로명주소] ", ""); // 도로명 주소
                   const jibunAddr = addr.ZPCD_ADDR.split("\n")[1]?.replace("[지번주소] ", ""); // 지번 주소
   
                   return {
                     key: addr.ZPCD + index, // 우편번호를 key 값으로 설정
                     label: (<div className="result-box">
                       <span className="zipcode">{addr.ZPCD}</span>
                       <div>
                           <p>도로명 : {roadAddr}</p>
                           <p className="">지&nbsp;&nbsp;&nbsp;&nbsp;번 : {jibunAddr}</p>
                       </div>
                     </div>),
                     onClick: () => handleAddrSelect(addr), // 선택 이벤트 실행
                   };
                 })}
                 //selectedKey={selectedAddr ?? undefined} 
               />
            )}
          
            {showInput && (     
            <>
              <TextLabel01  
                  title="선택한 주소"   // 제목
                  param={selectedAddrText}
              />
              <TextBox label="상세주소" value={inputDetailAddr} onChange={(e) => setInputDetailAddr(e.target.value)} />
              <Button01 btnName="확인" clickFunc={handleAddrInfoClose}></Button01>
            </>
            )}
        </Box>
    </>
  );
};

export default COM007;