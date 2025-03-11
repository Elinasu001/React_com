import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { ButtonContent } from "@src/assets/html/00_common/Button";

interface AccordionItemProps {
  title: string;
  content: string;
  hasActions?: boolean; // 버튼이 있는지 여부
  defaultExpanded?: boolean; // 기본으로 열려있는지 여부
  buttons?: { name: string; onClick?: () => void; disabled?: boolean }[];
}

export const AccordionItem = ({ title, content, hasActions = false, defaultExpanded = false, buttons }: AccordionItemProps) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title}-content`} id={`${title}-header`}>
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {content}
      </AccordionDetails>
      {hasActions && buttons && buttons.length > 0 && (
        <ButtonContent buttons={buttons} />
      )}
    </Accordion>
  );
};

// 데이터는 이제 props로 받을 수 있도록 변경!
interface AccordionListProps {
  data: AccordionItemProps[];
}

export const AccordionList = ({ data }: AccordionListProps) => {
  return (
    <Box className="accordion-wrap">
      {data.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </Box>
  );
};

export default { AccordionItem, AccordionList };