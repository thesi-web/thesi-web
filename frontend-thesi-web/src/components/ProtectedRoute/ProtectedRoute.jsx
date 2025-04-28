import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, roleRequired }) => {
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Começa como null
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    } else if (isAuthenticated === true && role !== roleRequired) {
      navigate('/error');
    }
  }, [isAuthenticated, role, roleRequired, navigate]);

  if (isAuthenticated === null) {
    // Enquanto não carregou o token, pode mostrar uma tela de loading ou nada
    return null;
  }

  if (isAuthenticated && role === roleRequired) {
    return children;
  }

  return null; // Enquanto faz o navigate
};

export default ProtectedRoute;
