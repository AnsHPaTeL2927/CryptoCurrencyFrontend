/* eslint-disable react/prop-types */
export const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const variants = {
    default: "badge-primary",
    success: "badge-success",
    error: "badge-error",
    warning: "badge-warning",
    info: "badge-info",
  };

  const sizes = {
    sm: "badge-sm",
    md: "",
    lg: "badge-lg",
  };

  return (
    <div className={`badge ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};
