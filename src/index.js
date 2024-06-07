import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FirebaseProvider from "./context/Firebase";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <FirebaseProvider />
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
