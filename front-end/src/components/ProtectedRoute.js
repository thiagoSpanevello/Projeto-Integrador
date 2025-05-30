import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null: validando, true: ok, false: inválido
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    const validateToken = async () => {
      try {
        await axios.get('https://integrador-backend-74994e883ac3.herokuapp.com/protected/validate-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsValid(true);
      } catch (error) {
        console.error("Token inválido ou expirado: ", error);
        localStorage.removeItem('token');
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    // Pode colocar um loader aqui
    return <p>Validando sessão...</p>;
  }

  if (isValid === false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
