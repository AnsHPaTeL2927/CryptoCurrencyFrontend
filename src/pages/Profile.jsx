const Profile = () => {
  return (
    <div className="p-4">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="/placeholder-avatar.png" alt="Profile" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-gray-500">Member since January 2024</p>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p>john.doe@example.com</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p>+1 234 567 8900</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Location</label>
                <p>New York, USA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Statistics */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Trading Statistics</h2>
            <div className="stats stats-vertical shadow">
              <div className="stat">
                <div className="stat-title">Total Trades</div>
                <div className="stat-value">89</div>
                <div className="stat-desc">↗︎ 45% more than last month</div>
              </div>
              <div className="stat">
                <div className="stat-title">Portfolio Value</div>
                <div className="stat-value">$12,450</div>
                <div className="stat-desc">↗︎ 12% more than last month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>BTC Purchase</span>
                <span className="text-success">+0.05 BTC</span>
              </li>
              <li className="flex justify-between">
                <span>ETH Sale</span>
                <span className="text-error">-2.5 ETH</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security Status */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Security Status</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="badge badge-success">✓</span>
                2FA Enabled
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-success">✓</span>
                Email Verified
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-warning">!</span>
                Phone Verification Pending
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile