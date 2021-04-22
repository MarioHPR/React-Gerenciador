import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import "antd/dist/antd.css";
import Axios from 'axios';

Axios.defaults.headers.common['Authorization'] = localStorage.getItem("token-gerenciador-security");
// Axios.defaults.baseURL = 'https://back-gerenciador-exames.herokuapp.com/api';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);