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
import Overview from "./pages/Market/Overview";
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

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Navbar />
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />

          {/* Trading Routes */}
          <Route path="/trading">
            <Route path="spot" element={<SpotTrading />} />
            <Route path="futures" element={<FuturesTrading />} />
            <Route path="margin" element={<MarginTrading />} />
            <Route path="history" element={<OrderHistory />} />
          </Route>

          {/* Market Routes */}
          <Route path="/market">
            <Route path="overview" element={<Overview />} />
            <Route path="charts" element={<Charts />} />
          </Route>

          {/* Web3 Routes */}
          <Route path="/defi" element={<DeFi />} />
          <Route path="/nft" element={<NFT />} />

          {/* Resources Routes */}
          <Route path="/news" element={<News />} />
          <Route path="/learn" element={<Learn />} />

          {/* Settings & Support Routes */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;