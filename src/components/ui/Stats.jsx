/* eslint-disable react/prop-types */
export const Stats = ({ children, className = "" }) => {
  return <div className={`stats shadow ${className}`}>{children}</div>;
};

export const Stat = ({ title, value, desc, className = "" }) => {
  return (
    <div className={`stat ${className}`}>
      {title && <div className="stat-title">{title}</div>}
      {value && <div className="stat-value">{value}</div>}
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
};
