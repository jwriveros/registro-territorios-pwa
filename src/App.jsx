// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistroTabla from './components/RegistroTabla';
import MapaArcGIS from './components/MapaArcGIS';
import { RegistroProvider } from './context/RegistroContext';
import './App.css';

export default function App() {
  return (
    <RegistroProvider>
      <Router>
        <div className="app-container">
          <aside className="sidebar">
            <h2>Territorios</h2>
            <nav>
              <Link to="/">📍 Ver mapa</Link>
              <Link to="/registro">📋 Registro de asignación</Link>
            </nav>
          </aside>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MapaArcGIS />} />
              <Route path="/registro" element={<RegistroTabla />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RegistroProvider>
  );
}
