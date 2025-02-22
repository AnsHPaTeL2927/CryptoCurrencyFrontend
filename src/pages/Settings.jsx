import { useState } from "react";
import { AccountForm } from '../components/Settings/Forms/AccountForm'
import { ApiKeysForm } from "../components/Settings/Forms/ApiKeysForm";
import { DisplayForm } from '../components/Settings/Forms/DisplayForm'
import { NotificationForm } from '../components/Settings/Forms/NotificationForm'
import { SecurityForm } from '../components/Settings/Forms/SecurityForm'
import { TradingForm } from '../components/Settings/Forms/TradingForm'
import { ApiDocsCard } from "../components/Settings/Cards/ApiDocsCard";
import { QuickActionsCard } from '../components/Settings/Cards/QuickActionsCard'
import { SecurityTipsCard } from "../components/Settings/Cards/SecurityTipsCard";
import { ThemePreviewCard } from '../components/Settings/Cards/ThemePreviewCard'
import { TradingLimitsCard } from '../components/Settings/Cards/TradingLimitsCard'
import Sidebar from '../components/Settings/Navigation/Sidebar'

const Settings = () => {
  // State management
  const [activeTab, setActiveTab] = useState("account");
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Form states
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

  const [display, setDisplay] = useState({
    theme: "dark",
    chartType: "candlestick",
    language: "en",
    timezone: "UTC",
    decimals: "2",
  });

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

  // Render active content
  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <>
            <AccountForm
              profile={profile}
              onChange={setProfile}
              onSubmit={(data) => handleSubmit("account", data)}
            />
            <QuickActionsCard />
          </>
        );
      case "security":
        return (
          <>
            <SecurityForm security={security} onChange={setSecurity} />
            <SecurityTipsCard />
          </>
        );
      case "notifications":
        return (
          <NotificationForm
            notifications={notifications}
            onChange={setNotifications}
          />
        );
      case "trading":
        return (
          <>
            <TradingForm trading={trading} onChange={setTrading} />
            <TradingLimitsCard />
          </>
        );
      case "api":
        return (
          <>
            <ApiKeysForm />
            <ApiDocsCard />
          </>
        );
      case "display":
        return (
          <>
            <DisplayForm display={display} onChange={setDisplay} />
            <ThemePreviewCard
              theme={display.theme}
              onThemeChange={(theme) => setDisplay({ ...display, theme })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <Sidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              showMobileNav={showMobileNav}
              setShowMobileNav={setShowMobileNav}
            />
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                </h2>
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;