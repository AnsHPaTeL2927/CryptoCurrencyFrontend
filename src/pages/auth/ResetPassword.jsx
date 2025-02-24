import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "../../components/Toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const { resetPassword, handlePasswordResetFromURL } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get token from URL
    const urlToken = handlePasswordResetFromURL() || 
      new URLSearchParams(location.search).get('token') || 
      new URLSearchParams(location.search).get('oobCode'); // Firebase sometimes uses oobCode
    
    if (urlToken) {
      setToken(urlToken);
      setIsTokenValid(true);
    } else {
      Toast.error("Invalid or expired password reset link. Please request a new one.");
      setIsTokenValid(false);
    }
  }, [location, handlePasswordResetFromURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (password !== confirmPassword) {
      Toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      Toast.error("Password must be at least 8 characters long");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const result = await resetPassword(token, password);
      
      if (result.success) {
        Toast.success("Password reset successful! You can now log in with your new password.");
        
        // Redirect to login after successful password reset
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        Toast.error(result.error || "Failed to reset password. The link may have expired.");
      }
    } catch (error) {
      Toast.error(error || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>
          
          {isTokenValid ? (
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="input input-bordered"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="input input-bordered"
                  required
                />
              </div>
              
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center mt-4">
              <p>
                Need a new reset link?{" "}
                <a href="/forgot-password" className="link link-primary">
                  Request Again
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;