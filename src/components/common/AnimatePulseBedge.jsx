/* eslint-disable react/prop-types */
const AnimatePulseBedge = ({ color = "primary", text = "Live", className = "" }) => {
  const getColorClass = () => {
    switch (color) {
      case "success":
        return "badge-success";
      case "error":
        return "badge-error";
      case "warning":
        return "badge-warning";
      default:
        return "badge-primary";
    }
  };

  return (
    <span
      className={`badge ${getColorClass()} animate-pulse text-xs ${className}`}
    >
      {text}
    </span>
  );
};

export default AnimatePulseBedge;
