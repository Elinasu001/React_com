import { AccordionList } from "@src/assets/html/00_common/Accordion";

const accordionData = [
  {
    title: "Accordion 1",
    content: "아코디언 내용이 들어갑니다."
  },
  { 
    title: "Accordion 2",
     content: "아코디언 내용이 들어갑니다."
  },
  
  { title: "Accordion Actions",
    content: "아코디언 내용이 들어갑니다.",
    hasActions: true,
    defaultExpanded: true,
    buttons: [
      { name: "Cancel", onClick: () => console.log("취소") },
      { name: "Agree", onClick: () => console.log("동의") }
    ]
  }
];

const Accordion_page = () => {
  return (
    <>
      <AccordionList items={accordionData} />;
    </>
  );
};

export default Accordion_page;