import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
  
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/verify`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();

          if (data.status === "success") {
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const showToast = (message, type = 'info') => {
    // Remove any existing toast
    document.getElementById('toast-container')?.remove();
    
    const toast = document.createElement('div');
    toast.id = 'toast-container';
    toast.className = 'toast toast-top toast-end z-50';
  
    const alert = document.createElement('div');
    
    // Map type to DaisyUI alert classes
    const alertClasses = {
      success: 'alert alert-success',
      error: 'alert alert-error',
      warning: 'alert alert-warning',
      info: 'alert alert-info'
    };
  
    alert.className = `${alertClasses[type] || alertClasses.info} mt-4`;
    alert.innerHTML = `
      <span class="text-content">${message}</span>
    `;
    
    toast.appendChild(alert);
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('token', data.data.token);
        setUser(data.data.user);
        showToast('Successfully logged in!', 'success');
        navigate('/');
        return { success: true };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      showToast(error.message || 'Login failed', 'error');
      return {
        success: false,
        error: error.message
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.data.token);
        setUser(data.data.user);
        showToast("Register Successfully", 'success')
        navigate('/');
        return { success: true };
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      showToast(error.message || 'Registration failed', 'error');
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const handleGoogleLogin = async (token) => {
    console.log("Token", token)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });
      console.log(response)
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('token', data.data.token);
        setUser(data.data.user);
        showToast('Successfully logged in with Google!', 'success');
        navigate('/');
        return { success: true };
      } else {
        throw new Error(data.message || 'Google login failed');
      }
    } catch (error) {
      showToast(error.message || 'Google login failed', 'error');
      return {
        success: false,
        error: error.message
      };
    }
  };

  // const googleLogin = useGoogleLogin({
  //   flow: 'auth-code',
  //   redirect_uri: `${import.meta.env.VITE_API_URL}/api/auth/google/callback`,
  //   onSuccess: async (codeResponse) => {
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ code: codeResponse.code })
  //       });
        
  //       const data = await response.json();
  //       if (data.status === 'success') {
  //         localStorage.setItem('token', data.data.token);
  //         setUser(data.data.user);
  //         navigate('/');
  //       }
  //     } catch (error) {
  //       console.error('Google auth error:', error);
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('Google OAuth Error:', error);
  //   }
  // });

  const googleLogin = useGoogleLogin({
    flow: 'implicit',  // Changed from 'auth-code' to 'implicit'
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: tokenResponse.access_token }) // Using access_token instead of code
        });
        
        const data = await response.json();
        if (data.status === 'success') {
          localStorage.setItem('token', data.data.token);
          setUser(data.data.user);
          showToast('Successfully logged in with Google!', 'success');
          navigate('/');
        }
      } catch (error) {
        console.error('Google auth error:', error);
        showToast('Google login failed', 'error');
      }
    },
    onError: (error) => {
      console.error('Google OAuth Error:', error);
      showToast('Google login failed', 'error');
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
