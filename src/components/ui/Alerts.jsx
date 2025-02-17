/* eslint-disable react/prop-types */
export const Alert = ({ children, type = 'info', onClose, className = '' }) => {
  const alertTypes = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error'
  };

  return (
    <div className={`alert ${alertTypes[type]} ${className}`}>
      {children}
      {onClose && (
        <button 
          className="btn btn-sm btn-ghost"
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
};