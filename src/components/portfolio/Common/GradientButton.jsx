const GradientButton = ({ children, onClick, className = "", size = "md" }) => (
  <button
    onClick={onClick}
    className={`
      btn border-0 bg-gradient-to-r from-primary to-secondary 
      hover:from-primary/90 hover:to-secondary/90 text-white
      transition-all duration-300 shadow-lg hover:shadow-xl
      ${size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : ""}
      ${className}
    `}
  >
    {children}
  </button>
);
export default GradientButton;
