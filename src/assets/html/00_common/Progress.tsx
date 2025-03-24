import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

interface ProgressBarProps {
  value: number;
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
    return (
    <Box className="progress-area" >
      {/* 진행 바 */}
        <LinearProgress  className="progress-line" variant="determinate" value={value}/>
      {/* 퍼센트 표시 (진행 바 내부) */}
        <Box  className="current" sx={{ left: `${value}%`}}>
            <Typography variant="body2">{`${Math.round(value)}%`}</Typography>
        </Box>
    </Box>
    );
};

export default ProgressBar;