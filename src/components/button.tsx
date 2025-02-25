
/**
 * @fileoverview 버튼 UI
 *
 * 사용 예시:
 * import { button } from "@assets/ui/button";
 */
import { Typography} from '@mui/material';

/**
 * 버튼 모음
 */
export const GButtonTest = () => {
  const title_01 = (btnName: string) => {
    return (
      <Typography 
      sx={{ 
        fontFamily: "SCDream",
        fontWeight: 800,
        fontSize: "30px",
        color: 'primary.black',
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        mb: 4,
      }}
      >
      {btnName}
      </Typography>
    )
  }

  const title_02 = (btnName: string) => {
    return (
      <Typography 
      sx={{ 
        fontFamily: "SCDream",
        fontWeight: 300,
        fontSize: "30px",
        color: 'primary.black',
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
        mb: 4,
      }}
      >
      {btnName}
      </Typography>
    )
  }

  return { title_01 , title_02 };
}
  export default { GButtonTest };