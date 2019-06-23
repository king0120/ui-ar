import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createGlobalStyle} from 'styled-components';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import configureStore from './configureStore';
import {Provider} from 'react-redux';

const GlobalStyle = createGlobalStyle`
  body {
    background: #f5f7f8;
  }

  .pi {
    margin-left: -8px;
  }
  
  #address-input {
    width: 100%;
  }
`;

const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle/>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
