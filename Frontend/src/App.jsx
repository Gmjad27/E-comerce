import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Singup from './components/Singup.jsx';


function ProtectedRoute({ children }) {
  const isLoggedIn = !!(localStorage.getItem('token') || localStorage.getItem('user'));
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Home />
              </>
            </ProtectedRoute>
          }
        />
        {/* <Route index element={<Navigate to="/" replace />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
