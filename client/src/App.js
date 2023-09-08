import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage';

const API_BASE = 'http://localhost:3001';

function App() {
  

  return (
    <div className="App">
      <Router>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Homepage />} 
            />
          </Routes>
        </div>

      </Router>

    </div>
  );
}

export default App;