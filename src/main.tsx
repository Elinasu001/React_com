import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@src/index.css';
import App from '@src/App';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
