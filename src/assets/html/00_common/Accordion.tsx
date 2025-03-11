import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material";


interface AccordionItemProps {
  title: string;
  content: string;
  hasActions?: boolean;
  defaultExpanded?: boolean;
}

export const AccordionItem = ({ title, content, hasActions = false, defaultExpanded = false }: AccordionItemProps) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title}-content`} id={`${title}-header`}>
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {content}
      </AccordionDetails>
      {hasActions && (
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      )}
    </Accordion>
  );
};


const accordionData = [
  { title: "Accordion 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Accordion 2", content: "Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
  { title: "Accordion Actions", content: "Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.", hasActions: true, defaultExpanded: true }
];

export const AccordionList = () => {
  return (
    <Box className="accordion-wrap">
      {accordionData.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </Box>
  );
};

export default { AccordionItem, AccordionList };
