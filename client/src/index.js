import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './App';
import Department from './screens/Department';
import MainWorkTime from './screens/MainWorkTime';
import Role from './screens/Role';
import Employee from './screens/Employee'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="department" element={<Department />} />
      <Route path="role" element={<Role />} />
      <Route path="employee" element={<Employee />} />
      <Route path="worktime" element={<MainWorkTime />} />
    </Routes>  
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
