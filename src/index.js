import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

// components
import GlobalStyles from 'components/common/GlobalStyles';
import ScrollTop from 'components/common/ScrollTop';

// store
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

// theme
import { theme } from 'config/theme';
import { ThemeProvider } from '@mui/material';

// styles
import 'assets/scss/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles>
            <ScrollTop>
              <App />
            </ScrollTop>
          </GlobalStyles>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

reportWebVitals();
