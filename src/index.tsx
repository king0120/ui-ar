import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import 'typeface-muli';
import 'static/styles/index.css';
import { Provider } from 'react-redux';
import { GlobalContextProvider } from './context/globalContext';
import store from 'redux/store';
import './utils/stringUtils';

const GlobalStyle = createGlobalStyle`
  body {
    background: #f5f7f8;
  }

  .pi {
    margin-left: -8px;
  }
  
  #address-input {
    width: 90%;
  }
`;

ReactDOM.render(
  <GlobalContextProvider>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </GlobalContextProvider>,
  document.getElementById('root')
);
