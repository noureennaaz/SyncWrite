import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirectRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/user/auth', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success && data.login) {
          // If already logged in, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        // Not logged in, stay on login/signup
        console.log("Not logged in, access allowed.");
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
};

export default AuthRedirectRoute;
