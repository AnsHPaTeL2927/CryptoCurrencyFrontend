import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "../../components/Toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { forgotPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            Toast.error("Please enter your email address")
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await forgotPassword(email);

            if (result.success) {
                Toast.success("If an account exists with this email, you'll receive a password reset link shortly.");
                setEmail("");
            } else {
                Toast.error(result.error || "Something went wrong. Please try again.");
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
                    <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

                    <p className="text-center text-gray-600 mb-6">
                        Enter your email address below and we'll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
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
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <p>
                            Remembered your password?{" "}
                            <Link to="/login" className="link link-primary">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;