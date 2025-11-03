import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
// import Home from './components/Home.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ✅ Define ProtectedRoute
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('user'); // check login status
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Header />
                {/* <Home /> */}
              </>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
