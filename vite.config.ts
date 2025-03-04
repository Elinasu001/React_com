import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')// .env 파일에서 환경 변수 로드
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 허용
      port: 3000, // 원하는 포트 설정 (기본값: 5173)
      strictPort: true, // 포트 고정 (사용 중이면 실행 실패)
      open: true, // 서버 실행 시 브라우저 자동 실행
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
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   server: {
//     host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 허용
//     port: 3000, // 원하는 포트 설정 (기본값: 5173)
//     strictPort: true, // 포트 고정 (사용 중이면 실행 실패)
//     open: true, // 서버 실행 시 브라우저 자동 실행
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8050',
//         changeOrigin: true,// 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
//         rewrite: (path) => path.replace(/^\/api/, ""),// 요청 경로에서 '/api' 제거
//         secure: false,// SSL 인증서 검증 무시
//         ws: true,// WebSocket 프로토콜 사용
//       },
//     },
//   },
// });