const Settings = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="card bg-base-100 shadow-xl h-fit">
          <div className="card-body">
            <ul className="menu bg-base-100 w-full">
              <li><a className="active">Account</a></li>
              <li><a>Security</a></li>
              <li><a>Notifications</a></li>
              <li><a>Trading Preferences</a></li>
              <li><a>API Keys</a></li>
              <li><a>Display</a></li>
            </ul>
          </div>
        </div>

        {/* Main Settings Area */}
        <div className="md:col-span-2">
          {/* Account Settings */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title">Account Settings</h2>
              <form className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Display Name</span>
                  </label>
                  <input type="text" className="input input-bordered" value="John Doe" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" className="input input-bordered" value="john.doe@example.com" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input type="tel" className="input input-bordered" value="+1 234 567 8900" />
                </div>

                <button className="btn btn-primary">Save Changes</button>
              </form>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Security Settings</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" checked />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Login Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified of new logins</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" />
                </div>

                <button className="btn btn-outline btn-warning">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings
