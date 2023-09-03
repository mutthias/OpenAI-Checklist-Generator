import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Components/Home';
import Signup from './Components/Signup';


function App() {
  

  return (

    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login/>}/> */}
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Signup" element={<Signup/>}/>

        </Routes>
      </Router>
    </div>

    
  );
}

export default App;
