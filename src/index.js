import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WorkExperience from './WorkExperience';
import WorkDetail from './components/WorkDetail';
import Projects from './Projects';
import ProjectDetail from './components/ProjectDetail';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work-experience" element={<WorkExperience />} />
        <Route path="/work/:id" element={<WorkDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />  
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);