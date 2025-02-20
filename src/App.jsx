import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import { ThemeProvider } from "./pages/context/themeContext";
import { AuthProvider } from "./pages/context/AuthContext";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";

// Trading Pages
import SpotTrading from "./pages/Trading/SpotTrading";
import OrderHistory from "./pages/Trading/OrderHistory";
import FuturesTrading from "./pages/Trading/FuturesTrading";
import MarginTrading from "./pages/Trading/MarginTrading";

// Market Pages
import MarketOverview from "./pages/market/MarketOverview";
import Charts from "./pages/Market/Chart";

// Web3 Pages
import DeFi from "./pages/web3/DeFi";
import NFT from "./pages/web3/NFT";

// Resources Pages
import News from "./pages/content/News";
import Learn from "./pages/content/Learn";

// Settings & Support Pages
import Settings from "./pages/Settings";
import Support from "./pages/Support";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import GoogleCallback from "./components/GoogleCallback";
import Profile from "./pages/Profile";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Navbar />
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />

          {/* Trading Routes */}
          <Route path="/trading" element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="spot" element={<SpotTrading />} />
            <Route path="futures" element={<FuturesTrading />} />
            <Route path="margin" element={<MarginTrading />} />
            <Route path="history" element={<OrderHistory />} />
          </Route>

          {/* Market Routes */}
          <Route path="/market">
            <Route
              path="overview"
              element={
                <ProtectedRoute>
                  <MarketOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="charts"
              element={
                <ProtectedRoute>
                  <Charts />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Web3 Routes */}
          <Route
            path="/defi"
            element={
              <ProtectedRoute>
                <DeFi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nft"
            element={
              <ProtectedRoute>
                <NFT />
              </ProtectedRoute>
            }
          />

          {/* Resources Routes */}
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <Learn />
              </ProtectedRoute>
            }
          />

          {/* Settings & Support Routes */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
