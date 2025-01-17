import { useState, useEffect, useRef } from "react";
import { useTheme } from "../pages/context/themeContext";
import { useAuth } from "../pages/context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
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

  const handleLinkClick = () => {
    setIsDrawerOpen(false);
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
            {theme === "dark" ? (
              <img
                src="public/logo - without background.png"
                alt=""
                className="h-10"
              />
            ) : (
              <img
                src="public/logo - with background.jpg"
                alt=""
                className="h-10"
              />
            )}
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

            {/* User Avatar Dropdown - Add this before the Theme Toggle */}
            {user ? (
              <div className="dropdown dropdown-end ml-2">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.photoURL ||
                        "https://api.dicebear.com/7.x/initials/svg?seed=" +
                          user.name
                      }
                      alt="User avatar"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" onClick={handleLinkClick}>
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" onClick={handleLinkClick}>
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
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </Link>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <button onClick={logout} className="text-error">
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}

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
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleLinkClick}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={handleLinkClick}>
              Portfolio
            </Link>
          </li>

          {/* Market Section */}
          <li className="menu-title">Market</li>
          <li>
            <Link to="/charts" onClick={handleLinkClick}>
              Charts
            </Link>
          </li>
          <li>
            <Link to="/currencies" onClick={handleLinkClick}>
              Currencies
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={handleLinkClick}>
              Favorites
            </Link>
          </li>

          {/* Content Section */}
          <li className="menu-title">Content</li>
          <li>
            <Link to="/news" onClick={handleLinkClick}>
              News
            </Link>
          </li>
          <li>
            <Link to="/blogs" onClick={handleLinkClick}>
              Blogs
            </Link>
          </li>

          {/* Trading Dropdown */}
          <li>
            <details>
              <summary>Trading</summary>
              <ul>
                <li>
                  <Link to="/trading/spot" onClick={handleLinkClick}>
                    Spot Trading
                  </Link>
                </li>
                <li>
                  <Link to="/trading/futures" onClick={handleLinkClick}>
                    Futures
                  </Link>
                </li>
                <li>
                  <Link to="/trading/margin" onClick={handleLinkClick}>
                    Margin
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          {/* Web3 Section */}
          <li className="menu-title">Web3</li>
          <li>
            <Link to="/nft" onClick={handleLinkClick}>
              NFT
            </Link>
          </li>
          <li>
            <Link to="/defi" onClick={handleLinkClick}>
              DeFi
            </Link>
          </li>

          {/* Account Section */}
          <li className="menu-title">Account</li>
          <li>
            <Link to="/profile" onClick={handleLinkClick}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={handleLinkClick}>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
