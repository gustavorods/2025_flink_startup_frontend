import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);

    // Verifica se o token está expirado (exp é em segundos)
    if (decoded.exp * 1000 < Date.now()) {
      sessionStorage.removeItem('token'); // remove o token expirado
      return <Navigate to="/login" replace />;
    }

    return children; // token válido
  } catch (error) {
    // Token malformado
    sessionStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export { PrivateRoute };
