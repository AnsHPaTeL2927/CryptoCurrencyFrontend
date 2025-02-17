/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import {
  Globe,
  Search,
  Filter,
  TrendingUp,
  Clock,
  ArrowUpRight,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { NewsCategoryFilter } from '../../components/News/NewsCategoryFilter';
import { NewsCard } from '../../components/News/NewsCard';
import { NewsAnalytics } from '../../components/News/NewsAnalytics';
import { NewsDetailModal } from '../../components/News/NewsDetailModal';

// Mock News Data (Replace with actual API integration)
const mockNewsData = [
  {
    id: 1,
    title: "Bitcoin Breaks Through $50,000 Barrier",
    summary: "Major institutional investors drive crypto market surge",
    fullContent: "In a landmark moment for cryptocurrency, Bitcoin has surpassed the $50,000 mark, signaling renewed investor confidence...",
    source: "CryptoNews Daily",
    sourceUrl: "https://example.com",
    category: "Market",
    tags: ["Bitcoin", "Market Trends"],
    impact: "High",
    sentiment: "bullish",
    timestamp: "2 hours ago",
    imageUrl: "public/bitcoin.jpg",
    readTime: 5,
    author: "John Crypto"
  },
  {
    id: 2,
    title: "Ethereum 2.0 Upgrade Reaches Critical Milestone",
    summary: "Major network improvements set to revolutionize blockchain technology",
    fullContent: "Developers have confirmed significant progress in Ethereum's transition to a more scalable and efficient network...",
    source: "Blockchain Insider",
    sourceUrl: "https://example.com",
    category: "Technology",
    tags: ["Ethereum", "Blockchain"],
    impact: "Medium",
    sentiment: "positive",
    timestamp: "5 hours ago",
    imageUrl: "/api/placeholder/800/400",
    readTime: 4,
    author: "Sarah Tech"
  },
  {
    id: 3,
    title: "SEC Introduces Comprehensive Crypto Regulation Guidelines",
    summary: "New regulations aim to protect investors and stabilize crypto markets",
    fullContent: "The Securities and Exchange Commission has unveiled detailed guidelines for cryptocurrency trading and investment...",
    source: "Regulatory Crypto",
    sourceUrl: "https://example.com",
    category: "Regulation",
    tags: ["Regulation", "SEC", "Compliance"],
    impact: "High",
    sentiment: "neutral",
    timestamp: "8 hours ago",
    imageUrl: "/api/placeholder/800/400",
    readTime: 6,
    author: "Michael Reg"
  },
  {
    id: 4,
    title: "DeFi Platforms Continue Exponential Growth",
    summary: "Decentralized Finance attracts billions in new investments",
    fullContent: "Decentralized Finance (DeFi) platforms have seen unprecedented growth, attracting significant institutional interest...",
    source: "DeFi Insights",
    sourceUrl: "https://example.com",
    category: "Innovation",
    tags: ["DeFi", "Blockchain", "Investment"],
    impact: "Medium",
    sentiment: "positive",
    timestamp: "12 hours ago",
    imageUrl: "/api/placeholder/800/400",
    readTime: 5,
    author: "Emily Innovate"
  }
];

// // Advanced Filters Component
// const AdvancedFilters = ({ 
//   onFilterChange, 
//   sentiments = ['bullish', 'bearish', 'positive', 'neutral'],
//   impacts = ['High', 'Medium', 'Low']
// }) => {
//   const [selectedSentiments, setSelectedSentiments] = useState([]);
//   const [selectedImpacts, setSelectedImpacts] = useState([]);

//   const handleSentimentToggle = (sentiment) => {
//     setSelectedSentiments(prev => 
//       prev.includes(sentiment) 
//         ? prev.filter(s => s !== sentiment)
//         : [...prev, sentiment]
//     );
//   };

//   const handleImpactToggle = (impact) => {
//     setSelectedImpacts(prev => 
//       prev.includes(impact) 
//         ? prev.filter(i => i !== impact)
//         : [...prev, impact]
//     );
//   };

//   useEffect(() => {
//     onFilterChange({
//       sentiments: selectedSentiments,
//       impacts: selectedImpacts
//     });
//   }, [selectedSentiments, selectedImpacts, onFilterChange]);

//   return (
//     <div className="dropdown dropdown-bottom">
//       <div tabIndex={0} className="btn m-1">
//         <Filter className="mr-2" />
//         Advanced Filters
//       </div>
//       <ul tabIndex={0} className="dropdown-content menu p-4 shadow bg-base-100 rounded-box w-72 space-y-4">
//         <li>
//           <h3 className="font-bold">Sentiment</h3>
//           <div className="flex flex-wrap gap-2">
//             {sentiments.map(sentiment => (
//               <button
//                 key={sentiment}
//                 className={`btn btn-xs ${
//                   selectedSentiments.includes(sentiment) 
//                     ? 'btn-primary' 
//                     : 'btn-ghost'
//                 }`}
//                 onClick={() => handleSentimentToggle(sentiment)}
//               >
//                 {sentiment}
//               </button>
//             ))}
//           </div>
//         </li>
//         <li>
//           <h3 className="font-bold">Impact</h3>
//           <div className="flex flex-wrap gap-2">
//             {impacts.map(impact => (
//               <button
//                 key={impact}
//                 className={`btn btn-xs ${
//                   selectedImpacts.includes(impact) 
//                     ? 'btn-primary' 
//                     : 'btn-ghost'
//                 }`}
//                 onClick={() => handleImpactToggle(impact)}
//               >
//                 {impact}
//               </button>
//             ))}
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// Trending News Sidebar Component
const TrendingNewsSidebar = ({ news }) => {
  // Sort news by read time (as a proxy for importance)
  const trendingNews = [...news]
    .sort((a, b) => b.readTime - a.readTime)
    .slice(0, 3);

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2 text-primary" />
        Trending News
      </h2>
      <div className="space-y-4">
        {trendingNews.map(item => (
          <div 
            key={item.id} 
            className="flex items-center space-x-3 hover:bg-base-200 p-2 rounded-lg transition-colors"
          >
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
              <div className="flex items-center space-x-2 text-xs text-base-content/70">
                <Clock size={12} />
                <span>{item.readTime} min read</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Newsletter Signup Component
const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Signup email:', email);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title flex items-center">
          <Zap className="mr-2" />
          Stay Informed
        </h2>
        <p>Get the latest crypto news delivered to your inbox</p>
        <form onSubmit={handleSubmit} className="form-control">
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-square">
              <ArrowUpRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// News Page Component
const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNews, setFilteredNews] = useState(mockNewsData);
  const [selectedNews, setSelectedNews] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState({
    sentiments: [],
    impacts: []
  });

  const categories = ['All', 'Market', 'Technology', 'Regulation', 'Innovation'];

  // Comprehensive news filtering logic
  useEffect(() => {
    let result = mockNewsData;

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(news => news.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(
        news =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Advanced sentiment filter
    if (advancedFilters.sentiments.length > 0) {
      result = result.filter(news =>
        advancedFilters.sentiments.includes(news.sentiment)
      );
    }

    // Advanced impact filter
    if (advancedFilters.impacts.length > 0) {
      result = result.filter(news =>
        advancedFilters.impacts.includes(news.impact)
      );
    }

    setFilteredNews(result);
  }, [searchQuery, selectedCategory, advancedFilters]);

  // Handler for opening news detail modal
  const handleNewsClick = useCallback((news) => {
    setSelectedNews(news);
  }, []);

  // Handler for closing news detail modal
  const handleCloseModal = useCallback(() => {
    setSelectedNews(null);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Globe className="text-primary" />
          Crypto News Hub
        </h1>
      </div>

      {/* Category Filter */}
      <NewsCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.length === 0 ? (
            <div className="col-span-full alert alert-info shadow-lg">
              <div>
                <AlertCircle />
                <span>No news found matching your criteria.</span>
              </div>
            </div>
          ) : (
            filteredNews.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                onCardClick={handleNewsClick}
              />
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block space-y-6">
          <TrendingNewsSidebar news={filteredNews} />
          <NewsAnalytics news={filteredNews} />
          <NewsletterSignup />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="btn-group">
          <button className="btn">Previous</button>
          <button className="btn">Next</button>
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <NewsDetailModal news={selectedNews} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NewsPage;