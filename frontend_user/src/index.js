import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./librarys/axios.js";
import "./librarys/toaster.js";
import "./librarys/react-form-input-validation.js";

import { Provider } from "react-redux";
import stores from "./stores/index.js";

ReactDOM.render(
  <React.StrictMode>
  	<Provider store={ stores }>
     <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);