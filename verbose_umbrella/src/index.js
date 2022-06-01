import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = 'RGAPI-1002579b-3050-4e73-b3e6-24e46c15cdf3';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App apiKey={API_KEY}/>
);
