// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from '../../context/authContext';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   //   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     // try {
//     //   // Call your register API here
//     //   const response = await fetch('/api/auth/register', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(formData),
//     //   });

//     //   const data = await response.json();

//     //   if (response.ok) {
//     //     login(data.user);
//     //     navigate('/');
//     //   } else {
//     //     setError(data.message || 'Registration failed');
//     //   }
//     // } catch (err) {
//     //   setError('An error occurred. Please try again.');
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   const handleGoogleLogin = async () => {
//     // Implement Google OAuth login
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
//         <div className="card-body">
//           <h2 className="card-title text-2xl font-bold text-center mb-6">
//             Register
//           </h2>

//           {error && (
//             <div className="alert alert-error mb-4">
//               <span>{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="input input-bordered"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="email@example.com"
//                 className="input input-bordered"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="input input-bordered"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Confirm Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="input input-bordered"
//                 value={formData.confirmPassword}
//                 onChange={(e) =>
//                   setFormData({ ...formData, confirmPassword: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
//               disabled={loading}
//             >
//               Register
//             </button>
//           </form>

//           <p className="text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="link link-primary">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "../../components/Toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      Toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      Toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      const result = await register(registrationData);

      if (result.success) {
        Toast.success("Registration successful!");
        navigate("/");
      } else {
        Toast.error(result.error || "Registration failed");
      }
    } catch (error) {
      Toast.error("An error occurred during registration");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      googleLogin();
    } catch (error) {
      Toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={6}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Must be at least 6 characters
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogleLogin} className="btn btn-outline gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
