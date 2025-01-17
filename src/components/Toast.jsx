const Toast = ({ message, type, onClose }) => {
    return (
      <div className={`alert alert-${type} fixed top-4 right-4 z-50`}>
        <span>{message}</span>
        {onClose && (
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    );
  };
  
  export default Toast;