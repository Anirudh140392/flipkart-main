import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router';
import PerformanceOverviewComponent from './assets/pages/performanceOverview';
import Login from './assets/pages/auth/login';
import Signup from './assets/pages/auth/signup';


function App() {

  return (
    <Routes>
      <Route path="/" element={<PerformanceOverviewComponent />} />
      {/*<Route path="/smart-control" element={<SmartControl />} />
      <Route path="/keyword-analysis" element={<SearchTermInsights />} />
      <Route path="/product-intelligence-center" element={<ProductIntelligenceCenter />} />
      <Route path="/blockers" element={<Blockers />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/history" element={<History />} />
  <Route path="/goto-insights" element={<GoToInsight />} />*/}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
