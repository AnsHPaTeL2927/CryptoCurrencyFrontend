/* eslint-disable react/prop-types */
const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  buttonText,
  buttonClass,
  action,
  iconClass,
}) => (
  <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
    <div className="card-body">
      <h3 className="card-title">
        <Icon className={`w-5 h-5 ${iconClass}`} />
        {title}
      </h3>
      <p className="text-base-content/70">{description}</p>
      <div className="card-actions justify-end mt-4">
        <button className={`btn ${buttonClass}`} onClick={action}>
          {buttonText}
        </button>
      </div>
    </div>
  </div>
);

export default QuickActionCard