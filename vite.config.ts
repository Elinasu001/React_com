import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')// .env 파일에서 환경 변수 로드

  env.VITE_APP_API_BASE_URL//환경변수 호출 샘플

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 허용
      port: 3000, // 원하는 포트 설정 (기본값: 5173)
      strictPort: true, // 포트 고정 (사용 중이면 실행 실패)
      open: true, // 서버 실행 시 브라우저 자동 실행

      //추후 만약 프로시 필요시 하단에 정의
      proxy: {
        // '/api'로 시작하는 요청을 VITE_API_TARGET으로 프록시 처리
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
          // 프록시 요청 시 Origin 헤더를 제거하거나 재설정
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // 백엔드 서버가 특정 Origin을 요구하지 않는다면 Origin 헤더를 제거해볼 수 있습니다.
              proxyReq.removeHeader('origin');
            });
          },
        },
      },
    },
  };
});