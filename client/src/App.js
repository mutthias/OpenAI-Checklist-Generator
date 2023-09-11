import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Homepage/> : <Navigate to='/login'/>} 
            />
            <Route
            path="/login"
            element={!user ? <Login/> : <Navigate to='/'/>}
            />
            <Route
            path="/signup"
            element={!user ? <Signup/> : <Navigate to='/'/>}
            />
          </Routes>
        </div>

      </Router>

    </div>
  );
}

export default App;