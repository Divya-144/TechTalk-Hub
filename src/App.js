import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIEthics from './components/AIEthics';
import Cybersecurity from './components/Cybersecurity';
import Automation from './components/Automation';
import MentalHealth from './components/MentalHealth';
import APITest from './components/APITest';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-ethics" element={<AIEthics />} />
            <Route path="/cybersecurity" element={<Cybersecurity />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/api-test" element={<APITest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
