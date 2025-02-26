import { Box } from "@mui/material";
import { TextBox01 } from "@src/components/text";
//import { Button01 } from "@src/components/button";
//import { progressBar } from "@src/components/loading";
//import { Common } from "@src/assets/js/common";
import  TransactionList  from "@src/components/TransactionList";
//import  TransactionList2  from "@src/components/TransactionList2";
import  AccountInfo  from "@src/components/AccountInfo";


const INQ002 = () => {
   //const { doAction, makeForm, addFormData } = Common();
  return (
    <Box
    sx={{
      textAlign: 'center'}}
    > 
      <TextBox01 text="거래내역조회"/>

      <AccountInfo />
      
      <TransactionList />

      
      {/*<TransactionList2 />*/}
      
    </Box>
  );
};

export default INQ002;