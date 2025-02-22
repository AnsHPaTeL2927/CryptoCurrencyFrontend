/* eslint-disable react/prop-types */
export const NotificationForm = ({ notifications, onChange }) => {
    return (
        <div className="space-y-6">
            {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="card bg-base-200">
                    <div className="card-body">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <h3 className="font-semibold">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </h3>
                                <p className="text-sm opacity-70">
                                    Enable {key.toLowerCase()} notifications
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={value}
                                onChange={(e) =>
                                    onChange({ ...notifications, [key]: e.target.checked })
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};