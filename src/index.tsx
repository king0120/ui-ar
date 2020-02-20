import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from 'styled-components';
import 'typeface-muli';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'styles/index.css';
import io from 'socket.io-client'

import { Provider } from 'react-redux';
import { GlobalContextProvider } from './context/globalContext';
import store from 'redux/store';
import './utils/prototypeUtils'

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


const socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log("CONNECTED WS")
    socket.emit('notifications', {data: "Hello ssfsfs from client"})
})

socket.on('notifications', (data: string) => {
    console.log("NOTIFICATION", data)
})

socket.on('exception', function(data: any) {
    console.error('event', data);
});
socket.on('disconnect', function() {
    console.log('Disconnected');
});

ReactDOM.render(
  <GlobalContextProvider>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </GlobalContextProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
