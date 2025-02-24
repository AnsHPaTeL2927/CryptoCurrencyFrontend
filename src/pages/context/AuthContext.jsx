/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  signInWithCustomToken
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    let unsubscribe;

    const setupAuthListener = () => {
      unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        setLoading(true);

        if (firebaseUser) {
          try {
            // Get the ID token
            const token = await firebaseUser.getIdToken();

            // Verify token with backend
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/auth/verify`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await response.json();

            if (data.status === "success") {
              // Set user from backend response
              setUser(data.data.user);
              localStorage.setItem('token', token);
            } else {
              // Handle verification failure
              await logout();
            }
          } catch (error) {
            console.error("Authentication check failed:", error);
            await logout();
          } finally {
            setLoading(false);
          }
        } else {
          // No user logged in
          setUser(null);
          localStorage.removeItem('token');
          setLoading(false);
        }
      });
    };

    setupAuthListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };

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
        const userCredential = await signInWithCustomToken(auth, data.data.token);
        localStorage.setItem('token', await userCredential.user.getIdToken())
        setUser(data.data.user);
        showToast('Successfully logged in!', 'success');
        navigate('/dashboard');
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
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        const userCredential = await signInWithCustomToken(auth, data.data.token);
        localStorage.setItem("token", await userCredential.user.getIdToken());
        setUser(data.data.user);
        showToast("Register Successfully", 'success')
        navigate('/dashboard');
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

  // const handleGoogleLogin = async (token) => {
  //   console.log("Token", token)
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ token })
  //     });
  //     console.log(response)
  //     const data = await response.json();

  //     if (data.status === 'success') {
  //       localStorage.setItem('token', data.data.token);
  //       setUser(data.data.user);
  //       showToast('Successfully logged in with Google!', 'success');
  //       navigate('/');
  //       return { success: true };
  //     } else {
  //       throw new Error(data.message || 'Google login failed');
  //     }
  //   } catch (error) {
  //     showToast(error.message || 'Google login failed', 'error');
  //     return {
  //       success: false,
  //       error: error.message
  //     };
  //   }
  // };

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
          const userCredential = await signInWithCustomToken(auth, data.data.token);
          localStorage.setItem('token', await userCredential.user.getIdToken());
          setUser(data.data.user);
          showToast('Successfully logged in with Google!', 'success');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Google auth error:', error);
        showToast('Google login failed', 'error');
      }
    },
    onError: (error) => {
      showToast(error || 'Google login failed', 'error');
    }
  });

  const logout = async () => {
    try {
      // Send logout request to backend
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Sign out from Firebase
      await auth.signOut();

      // Clear local storage and state
      localStorage.removeItem('token');
      setUser(null);

      showToast('Logged out successfully', 'info');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      showToast('Logout failed', 'error');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.status === 'success') {
        showToast('Password reset link sent to your email', 'success');
        navigate("/login")
        return { success: true };
      } else {
        throw new Error(data.message || 'Error sending password reset link');
      }
    } catch (error) {
      showToast(error.message || 'Error sending password reset link', 'error');
      return {
        success: false,
        error: error.message
      };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (data.status === 'success') {
        showToast('Password reset successful. Please log in.', 'success');
        navigate('/login');
        return { success: true };
      } else {
        throw new Error(data.message || 'Password reset failed');
      }
    } catch (error) {
      showToast(error.message || 'Password reset failed', 'error');
      return {
        success: false,
        error: error.message
      };
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (data.status === 'success') {
        showToast('Email verified successfully', 'success');

        // If user is logged in, update the user state to reflect email verification
        if (user) {
          setUser({
            ...user,
            emailVerified: true
          });
        }

        return { success: true };
      } else {
        throw new Error(data.message || 'Email verification failed');
      }
    } catch (error) {
      showToast(error.message || 'Email verification failed', 'error');
      return {
        success: false,
        error: error.message
      };
    }
  };

  // Helper method to handle email verification from URL
  const handleEmailVerification = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      verifyEmail(token).then(result => {
        if (result.success) {
          // Redirect to a success page or dashboard
          navigate('/dashboard');
        } else {
          // Redirect to a verification failed page or login
          navigate('/login');
        }
      });
    }
  };

  // Helper method to handle password reset from URL
  const handlePasswordResetFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Return token to be used in a password reset form
      return token;
    }
    return null;
  };


  const value = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    handleEmailVerification,
    handlePasswordResetFromURL
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
