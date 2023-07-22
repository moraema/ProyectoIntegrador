import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import Menu from './componentes/Menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu/:accountId" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
