import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);


const fetchReq = async () => {
    try {
        const response = await fetch('https://api.warframe.market/v2/itemId/54aae292e7798909064f1575')
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(`Failed fetch: ${error}`)
    }
}



fetchReq(); 