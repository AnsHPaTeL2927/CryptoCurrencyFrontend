import Navbar from "./components/Navbar";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Portfolio from "./pages/Portfolio";

// Market Pages
import Chart from './pages/market/Chart';
import Currencies from './pages/market/Currencies';
import Favorites from './pages/market/Favorites';

// Content Pages
import News from './pages/content/News';
import Blogs from './pages/content/Blogs';

// Web3 Pages
import NFT from './pages/web3/NFT';
import DeFi from './pages/web3/DeFi';

// Account Pages
import Profile from './pages/account/Profile';
import Settings from './pages/account/Settings';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
        <Routes>
          {/* Main Routes */} 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/portfolio" element={<Portfolio />} />

          {/* Market Routes */} 
          <Route path="/charts" element={<Chart />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* Content Routes */}
          <Route path="/news" element={<News />} />
          <Route path="/blogs" element={<Blogs />} />

          {/* Trading Routes */}
          {/* <Route path="/trading/spot" element={<SpotTrading />} />
          <Route path="/trading/futures" element={<Futures />} />
          <Route path="/trading/margin" element={<Margin />} /> */}

          {/* Web3 Routes */}
          <Route path="/nft" element={<NFT />} />
          <Route path="/defi" element={<DeFi />} />

          {/* Account Routes */}
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/settings" element={<Settings />} />
        </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
