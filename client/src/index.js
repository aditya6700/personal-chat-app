import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

const Root = ReactDOM.createRoot(document.getElementById('root'));

Root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);




/* App in strict Mode, which invokes some events twice:
 * Strict mode can’t automatically detect side effects for you, 
 * but it can help you spot them by making them a little more deterministic. 
 * This is done by intentionally double-invoking the following functions:
 * 
 * Class component constructor, render, and shouldComponentUpdate methods 
 * Class component static getDerivedStateFromProps method 
 * Function component bodies State updater functions (the first argument to setState) 
 * Functions passed to useState, useMemo, or useReducer
*/
