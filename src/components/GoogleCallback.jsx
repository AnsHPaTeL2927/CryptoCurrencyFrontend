// src/components/GoogleCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../pages/context/AuthContext';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleCallback = () => {
      const token = searchParams.get('token');
      const userStr = searchParams.get('user');
      const error = searchParams.get('error');

      if (error) {
        console.error('Authentication error:', error);
        navigate('/login');
        return;
      }

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          localStorage.setItem('token', token);
          setUser(user);
          navigate('/');
        } catch (error) {
          console.error('Error processing callback:', error);
          navigate('/login');
        }
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4">Completing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;