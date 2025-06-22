import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../middlewares/Auth';
// Authentication check function
// export const checkAuth = async () => {
//   try {
//     const response = await fetch('/dashboard', {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Unauthorized');
//     }

//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw new Error('Unauthorized');
//   }
// };

const AuthProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const {checkAuth} = useAuth()
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log("checking authorized")
        await checkAuth(); // Check if the user is authenticated
      } catch (error) {
        console.log("found unauthorized", error)
        navigate('/login'); // Redirect to login if unauthorized
      } finally {
        console.log("It's valid")
        setLoading(false); // Stop loading once checked
      }
    };

    verifyUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  return children; // Render protected content if authenticated
};

export default AuthProtectedRoute;
