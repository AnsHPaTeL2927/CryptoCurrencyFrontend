/* eslint-disable react/prop-types */
export const SecurityForm = ({ security, onChange }) => {
    const securityItems = [
        {
            key: 'twoFactor',
            title: 'Two-Factor Authentication',
            description: 'Add an extra layer of security'
        },
        {
            key: 'loginAlerts',
            title: 'Login Alerts',
            description: 'Get notified of new logins'
        },
        {
            key: 'tradingPin',
            title: 'Trading PIN',
            description: 'Require PIN for trades'
        }
    ];

    return (
        <div className="space-y-6">
            {securityItems.map((item) => (
                <div key={item.key} className="card bg-base-200">
                    <div className="card-body">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm opacity-70">{item.description}</p>
                            </div>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={security[item.key]}
                                onChange={(e) =>
                                    onChange({ ...security, [item.key]: e.target.checked })
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="form-control">
                <label className="label">Session Timeout</label>
                <select
                    className="select select-bordered w-full"
                    value={security.sessionTimeout}
                    onChange={(e) =>
                        onChange({ ...security, sessionTimeout: e.target.value })
                    }
                >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                </select>
            </div>

            <button className="btn btn-warning btn-outline w-full sm:w-auto mt-6">
                Change Password
            </button>
        </div>
    );
};