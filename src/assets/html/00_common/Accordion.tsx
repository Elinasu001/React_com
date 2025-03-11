import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography } from "@mui/material";
import { ButtonContent } from "@src/assets/html/00_common/Button";

interface AccordionListProps {
  items: {
    title: string;
    content: string;
    hasActions?: boolean; // 버튼이 있는지 여부
    defaultExpanded?: boolean; // 기본으로 열려있는지 여부
    buttons?: { name: string; onClick?: () => void; disabled?: boolean }[];
  }[];
}

export const AccordionList = ({ items }: AccordionListProps) => {
  return (
    <List className="accordion-wrap">
      {items.map((item, index) => (
        <ListItem key={index}>
          <Accordion defaultExpanded={item.defaultExpanded} className="accordion-item">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${item.title}-content`} id={`${item.title}-header`}>
              <Typography component="span">{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.content}</Typography>
              {item.hasActions && item.buttons && item.buttons.length > 0 && (
                <ButtonContent buttons={item.buttons} />
              )}
            </AccordionDetails>
          </Accordion>
        </ListItem>
      ))}
    </List>
  );
};

export default { AccordionList };