import { ThemeProvider } from "@mui/material/styles";
import App from '@src/App';
import { store } from "@src/assets/js/redux/store"; // store 불러오기
import '@src/assets/styles/scss/global.scss';
import '@src/index.css';
import theme from "@src/theme/theme"; // MUI 테마 불러오기
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <StyledEngineProvider injectFirst> */}
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
    {/* </StyledEngineProvider> */}
  </Provider>
);
// 밑에 로직은 StrictMode는 개발 모드에서 의도적으로 컴포넌트를 두 번 렌더링하여 부작용을 감지하는 기능
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//         <ThemeProvider theme={theme}>
//           <App />
//         </ThemeProvider>
//     </Provider>
//   </React.StrictMode>
// );
