import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New feature released!",
      time: "2 hours ago",
      read: false,
      type: "feature",
    },
    {
      id: 2,
      message: "Your account was logged in from a new device",
      time: "5 hours ago",
      read: false,
      type: "security",
    },
    {
      id: 3,
      message: "Welcome to our platform!",
      time: "1 day ago",
      read: false,
      type: "info",
    },
  ]);

  const searchRef = useRef(null);

  // Handle clicks outside search only
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Theme handling
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Simple toggle for notifications - only triggered by icon click
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.querySelector('input[type="search"]')?.focus();
      }, 100);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "feature":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "security":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-warning"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-info"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="drawer">
      <input
        id="drawer-sidebar"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-lg">
          <div className="navbar-start">
            <label
              htmlFor="drawer-sidebar"
              className="btn btn-ghost btn-circle drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>

          <div className="navbar-center">
            {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
            {theme === 'dark' ? <img src="public/logo - without background.png" alt="" className="h-10"/> : <img src="public/logo - with background.jpg" alt="" className="h-10"/>}
          </div>

          <div className="navbar-end">
            {/* Search with animation */}
            <div className="relative flex items-center" ref={searchRef}>
              <div
                className={`absolute right-0 flex items-center transition-all duration-300 ease-in-out ${
                  isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <input
                  type="search"
                  placeholder="Search..."
                  className="input input-bordered w-full h-9 pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="btn btn-ghost btn-circle"
                onClick={toggleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Notifications */}
            <div className="dropdown dropdown-end">
              <button
                className="btn btn-ghost btn-circle ml-2"
                onClick={toggleNotifications}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="badge badge-primary badge-xs indicator-item">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </button>
              {showNotifications && (
                <div className="dropdown-content mt-3 z-[1] card card-compact w-96 shadow bg-base-100">
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-sm text-base-content/70">
                          {unreadCount} unread
                        </span>
                      )}
                    </div>
                    <div className="divider my-0"></div>
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id)}
                        className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                          !notif.read
                            ? "bg-primary/10 hover:bg-primary/20"
                            : "hover:bg-base-200"
                        }`}
                      >
                        <div
                          className={`mt-1 ${
                            !notif.read ? "animate-pulse" : ""
                          }`}
                        >
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm ${
                              !notif.read ? "font-medium" : ""
                            }`}
                          >
                            {notif.message}
                          </p>
                          <p className="text-xs text-base-content/70 mt-1">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <label className="swap swap-rotate ml-5 mr-5">
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <svg
                className="swap-off h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>

        {/* Page content here */}
        <div className="p-4">{/* Your main content */}</div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="drawer-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Main Navigation */}
          <li className="menu-title">Main</li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          <li>
            <a href="/portfolio">Portfolio</a>
          </li>

          {/* Market Section */}
          <li className="menu-title">Market</li>
          <li>
            <a href="/charts">Charts</a>
          </li>
          <li>
            <a href="/currencies">Currencies</a>
          </li>
          <li>
            <a href="/favorites">Favorites</a>
          </li>

          {/* Content Section */}
          <li className="menu-title">Content</li>
          <li>
            <a href="/news">News</a>
          </li>
          <li>
            <a href="/blogs">Blogs</a>
          </li>

          {/* Trading Dropdown */}
          <li>
            <details>
              <summary>Trading</summary>
              <ul>
                <li>
                  <a href="/trading/spot">Spot Trading</a>
                </li>
                <li>
                  <a href="/trading/futures">Futures</a>
                </li>
                <li>
                  <a href="/trading/margin">Margin</a>
                </li>
              </ul>
            </details>
          </li>

          {/* Web3 Section */}
          <li className="menu-title">Web3</li>
          <li>
            <a href="/nft">NFT</a>
          </li>
          <li>
            <a href="/defi">DeFi</a>
          </li>

          {/* Account Section */}
          <li className="menu-title">Account</li>
          <li>
            <a href="/account/profile">Profile</a>
          </li>
          <li>
            <a href="/account/settings">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
