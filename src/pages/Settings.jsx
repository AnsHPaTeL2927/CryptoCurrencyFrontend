import { useState } from "react";
import {
  Bell,
  Lock,
  User,
  Settings as SettingsIcon,
  Code,
  MonitorSmartphone,
} from "lucide-react";

const Settings = () => {
  // State for active tab/section
  const [activeTab, setActiveTab] = useState("account");

  // States for different settings sections
  const [profile, setProfile] = useState({
    displayName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JD",
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: false,
    tradingPin: false,
    sessionTimeout: "30",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    tradeAlerts: true,
    priceAlerts: true,
    newsAlerts: false,
    marketingEmails: false,
  });

  const [trading, setTrading] = useState({
    defaultLayout: "advanced",
    tradingMode: "live",
    orderConfirmation: true,
    riskWarnings: true,
    defaultLeverage: "10",
  });

  const [apiKeys, setApiKeys] = useState({
    keys: [],
  });

  const [display, setDisplay] = useState({
    theme: "dark",
    chartType: "candlestick",
    language: "en",
    timezone: "UTC",
    decimals: "2",
  });

  // Navigation items configuration
  const navItems = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "trading", label: "Trading", icon: SettingsIcon },
    { id: "api", label: "API Keys", icon: Code },
    { id: "display", label: "Display", icon: MonitorSmartphone },
  ];

  // Handle form submissions
  const handleSubmit = (section, data) => {
    switch (section) {
      case "account":
        setProfile(data);
        break;
      case "security":
        setSecurity(data);
        break;
      case "notifications":
        setNotifications(data);
        break;
      case "trading":
        setTrading(data);
        break;
      case "display":
        setDisplay(data);
        break;
      default:
        break;
    }
    // Show success message
    alert("Settings updated successfully!");
  };

  // Form components for each section
  const AccountForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit("account", profile);
      }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={profile.avatar} alt="Profile" />
          </div>
        </div>
        <button className="btn btn-outline">Change Avatar</button>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Display Name</span>
        </label>
        <input
          type="text"
          value={profile.displayName}
          onChange={(e) =>
            setProfile({ ...profile, displayName: e.target.value })
          }
          className="input input-bordered"
          placeholder="Enter your name"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="input input-bordered"
          placeholder="Enter your email"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Phone Number</span>
        </label>
        <input
          type="tel"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          className="input input-bordered"
          placeholder="Enter your phone number"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );

  const SecurityForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Two-Factor Authentication</h3>
          <p className="text-sm opacity-70">Add an extra layer of security</p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={security.twoFactor}
          onChange={(e) =>
            setSecurity({ ...security, twoFactor: e.target.checked })
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Login Alerts</h3>
          <p className="text-sm opacity-70">Get notified of new logins</p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={security.loginAlerts}
          onChange={(e) =>
            setSecurity({ ...security, loginAlerts: e.target.checked })
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Trading PIN</h3>
          <p className="text-sm opacity-70">Require PIN for trades</p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={security.tradingPin}
          onChange={(e) =>
            setSecurity({ ...security, tradingPin: e.target.checked })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Session Timeout (minutes)</span>
        </label>
        <select
          className="select select-bordered"
          value={security.sessionTimeout}
          onChange={(e) =>
            setSecurity({ ...security, sessionTimeout: e.target.value })
          }
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>

      <div className="pt-4">
        <button className="btn btn-warning btn-outline w-full">
          Change Password
        </button>
      </div>
    </div>
  );

  const NotificationsForm = () => (
    <div className="space-y-6">
      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
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
              setNotifications({ ...notifications, [key]: e.target.checked })
            }
          />
        </div>
      ))}
    </div>
  );

  const TradingForm = () => (
    <div className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Default Layout</span>
        </label>
        <select
          className="select select-bordered"
          value={trading.defaultLayout}
          onChange={(e) =>
            setTrading({ ...trading, defaultLayout: e.target.value })
          }
        >
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Trading Mode</span>
        </label>
        <select
          className="select select-bordered"
          value={trading.tradingMode}
          onChange={(e) =>
            setTrading({ ...trading, tradingMode: e.target.value })
          }
        >
          <option value="live">Live Trading</option>
          <option value="paper">Paper Trading</option>
          <option value="demo">Demo Mode</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Order Confirmation</h3>
          <p className="text-sm opacity-70">Confirm before executing trades</p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={trading.orderConfirmation}
          onChange={(e) =>
            setTrading({ ...trading, orderConfirmation: e.target.checked })
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Risk Warnings</h3>
          <p className="text-sm opacity-70">Show risk level warnings</p>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={trading.riskWarnings}
          onChange={(e) =>
            setTrading({ ...trading, riskWarnings: e.target.checked })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Default Leverage</span>
        </label>
        <select
          className="select select-bordered"
          value={trading.defaultLeverage}
          onChange={(e) =>
            setTrading({ ...trading, defaultLeverage: e.target.value })
          }
        >
          <option value="1">1x</option>
          <option value="5">5x</option>
          <option value="10">10x</option>
          <option value="20">20x</option>
        </select>
      </div>
    </div>
  );

  const ApiKeysSection = () => (
    <div className="space-y-6">
      <div className="alert alert-info">
        <div>
          <h3 className="font-bold">API Access Coming Soon!</h3>
          <div className="text-sm">
            API key management will be available in the next update.
          </div>
        </div>
      </div>

      <button className="btn btn-primary w-full" disabled>
        Generate New API Key
      </button>
    </div>
  );

  const DisplayForm = () => (
    <div className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Theme</span>
        </label>
        <select
          className="select select-bordered"
          value={display.theme}
          onChange={(e) => setDisplay({ ...display, theme: e.target.value })}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Default Chart Type</span>
        </label>
        <select
          className="select select-bordered"
          value={display.chartType}
          onChange={(e) =>
            setDisplay({ ...display, chartType: e.target.value })
          }
        >
          <option value="candlestick">Candlestick</option>
          <option value="line">Line</option>
          <option value="bar">Bar</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Language</span>
        </label>
        <select
          className="select select-bordered"
          value={display.language}
          onChange={(e) => setDisplay({ ...display, language: e.target.value })}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Timezone</span>
        </label>
        <select
          className="select select-bordered"
          value={display.timezone}
          onChange={(e) => setDisplay({ ...display, timezone: e.target.value })}
        >
          <option value="UTC">UTC</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
          <option value="GMT">GMT</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Decimal Places</span>
        </label>
        <select
          className="select select-bordered"
          value={display.decimals}
          onChange={(e) => setDisplay({ ...display, decimals: e.target.value })}
        >
          <option value="2">2 decimals</option>
          <option value="3">3 decimals</option>
          <option value="4">4 decimals</option>
          <option value="5">5 decimals</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="card bg-base-100 shadow-xl h-fit">
            <div className="card-body p-2">
              <ul className="menu bg-base-100 w-full">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <button
                      className={activeTab === id ? "active" : ""}
                      onClick={() => setActiveTab(id)}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Dynamic Section Title */}
                <h2 className="card-title mb-6">
                  {navItems.find((item) => item.id === activeTab)?.label}{" "}
                  Settings
                </h2>

                {/* Dynamic Content Based on Active Tab */}
                <div className="mt-4">
                  {activeTab === "account" && <AccountForm />}
                  {activeTab === "security" && <SecurityForm />}
                  {activeTab === "notifications" && <NotificationsForm />}
                  {activeTab === "trading" && <TradingForm />}
                  {activeTab === "api" && <ApiKeysSection />}
                  {activeTab === "display" && <DisplayForm />}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            {activeTab === "account" && (
              <div className="card bg-base-100 shadow-xl mt-6">
                <div className="card-body">
                  <h3 className="card-title text-lg">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <button className="btn btn-outline btn-info">
                      Export Data
                    </button>
                    <button className="btn btn-outline btn-error">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tips Card */}
            {activeTab === "security" && (
              <div className="card bg-base-100 shadow-xl mt-6">
                <div className="card-body">
                  <h3 className="card-title text-lg">Security Tips</h3>
                  <ul className="list-disc list-inside space-y-2 mt-4 text-sm opacity-70">
                    <li>Use a strong, unique password</li>
                    <li>Enable two-factor authentication for extra security</li>
                    <li>Never share your login credentials</li>
                    <li>Regularly check your account activity</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Trading Limits Card */}
            {activeTab === "trading" && (
              <div className="card bg-base-100 shadow-xl mt-6">
                <div className="card-body">
                  <h3 className="card-title text-lg">Trading Limits</h3>
                  <div className="mt-4 space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Daily Trading Limit</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Maximum Position Size
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="input input-bordered"
                      />
                    </div>
                    <button className="btn btn-primary w-full">
                      Update Limits
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API Documentation Link */}
            {activeTab === "api" && (
              <div className="card bg-base-100 shadow-xl mt-6">
                <div className="card-body">
                  <h3 className="card-title text-lg">API Documentation</h3>
                  <p className="text-sm opacity-70 mt-2">
                    Learn how to integrate with our trading platform using our
                    comprehensive API documentation.
                  </p>
                  <button className="btn btn-outline mt-4">
                    View Documentation
                  </button>
                </div>
              </div>
            )}

            {/* Theme Preview */}
            {activeTab === "display" && (
              <div className="card bg-base-100 shadow-xl mt-6">
                <div className="card-body">
                  <h3 className="card-title text-lg">Theme Preview</h3>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                        Light Theme
                      </div>
                      <button
                        className={`btn btn-sm ${
                          display.theme === "light"
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                        onClick={() =>
                          setDisplay({ ...display, theme: "light" })
                        }
                      >
                        Select
                      </button>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-32 bg-neutral rounded-lg flex items-center justify-center text-neutral-content">
                        Dark Theme
                      </div>
                      <button
                        className={`btn btn-sm ${
                          display.theme === "dark"
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                        onClick={() =>
                          setDisplay({ ...display, theme: "dark" })
                        }
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
