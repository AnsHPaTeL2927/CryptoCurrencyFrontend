/* eslint-disable react/prop-types */
const AnimatePulseBedge = ({
  theme,
  color = "primary",
  text = "Live",
  className = "",
}) => {
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

  const themeFontColorClass = () => {
    switch (theme) {
      case "light":
        return "text-black";
      case "dark":
        return "text-white";
    }
  };

  return (
    <span
      className={`badge ${getColorClass()} animate-pulse text-xs ${className} ${themeFontColorClass()}`}
    >
      {text}
    </span>
  );
};

export default AnimatePulseBedge;
