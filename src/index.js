import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="pagina-padrao">
    <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);