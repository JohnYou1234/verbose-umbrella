import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = 'RGAPI-959fc846-b20b-4ee5-9981-141776a71cf8';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App apiKey={API_KEY}/>
);
