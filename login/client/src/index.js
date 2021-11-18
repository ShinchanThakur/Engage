import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>   {/*To use react router dom, we need to wrap everything inside this BrowserRouter tag */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')     //This renders the components in root div of index.html present in public folder
);

reportWebVitals();
