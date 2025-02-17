import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  // Function to check if the token is valid
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false; // No token found

    // Example: Check if the token has the expected structure
    const partes = token.split("-");
    if (partes.length !== 3) return false; // Token structure is invalid

    // You can add additional validation here (e.g., decode and verify the token)
    return true;
  };

  // If the token is invalid, redirect to /login
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  // If the token is valid, render the child components
  return children;
};