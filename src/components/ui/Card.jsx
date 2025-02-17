/* eslint-disable react/prop-types */
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`card bg-base-100 shadow-xl ${className}`}>{children}</div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`card-header p-4 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }) => {
  return <h2 className={`card-title ${className}`}>{children}</h2>;
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`card-body p-4 ${className}`}>{children}</div>;
};
