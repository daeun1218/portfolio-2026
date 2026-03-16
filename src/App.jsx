import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import CaseStudy from './pages/CaseStudy';
import JavinCaseStudy from './pages/JavinCaseStudy';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/project/:id/case-study" element={<CaseStudy />} />
      <Route path="/javin" element={<JavinCaseStudy />} />
      <Route path="/javin/about" element={<AboutPage />} />
    </Routes>
  );
}
