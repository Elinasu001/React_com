
/**
 * @fileoverview 로딩 UI
 *
 * 사용 예시:
 * import { progressBar } from "@assets/ui/loading";
 */
import { createRoot, Root } from 'react-dom/client';
import { Backdrop, CircularProgress, Typography} from '@mui/material';

let root: Root | null = null;

/**
 * 샘플 로딩 UI
 */
const GLoadingBar_01 = ({ open, text }: { open: boolean; text?: string }) => (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어둡게
      }}
      open={open}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="inherit" />
        {text && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            {text}
          </Typography>
        )}
      </div>
    </Backdrop>
  );


/**
 * 로딩 on/off
 * @param isLoading 로딩 여부 (true: 표시, false: 제거)
 * @param loadingText 로딩 중에 표시할 텍스트 (옵션)
 */
export function progressBar(isLoading: boolean, loadingText?: string) {
    const formId = 'g-Loading-bar';

    // 전역 컨테이너가 없으면 생성
    let container = document.getElementById(formId);
    if (!container) {
      container = document.createElement('div');
      container.id = formId;
      document.body.appendChild(container);
    }
  
    if (isLoading) {
      // 로딩 시작: container에 LoadingOverlay 렌더링
      if (!root) {
        root = createRoot(container);
      }

      /** ============     교체시 여기     ============ */
      root.render(<GLoadingBar_01 open={true} text={loadingText} />);
    } else {
      // 로딩 종료: 렌더링 제거 후 container를 비움
      if (root) {
        root.unmount();
        root = null;
      }
    }
  }
  export default { progressBar };