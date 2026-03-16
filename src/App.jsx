import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import CaseStudy from './pages/CaseStudy';
import JavinDeSeoul from './pages/JavinDeSeoul';
import About from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/project/:id/case-study" element={<CaseStudy />} />
      <Route path="/javin" element={<JavinDeSeoul />} />
      <Route path="/javin/about" element={<About />} />
    </Routes>
  );
}
