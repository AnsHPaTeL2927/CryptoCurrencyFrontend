import { useState } from 'react';

const NewsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('latest');
  
  const categories = [
    { id: 'latest', name: 'Latest News', count: 28 },
    { id: 'trending', name: 'Trending', count: 12 },
    { id: 'bitcoin', name: 'Bitcoin', count: 8 },
    { id: 'defi', name: 'DeFi', count: 15 },
    { id: 'nft', name: 'NFT', count: 6 }
  ];

  const news = [
    {
      id: 1,
      title: "Bitcoin Sets New 2024 High Above $52K as Market Cap Dominance Grows",
      source: "CryptoNews",
      sourceIcon: "/api/placeholder/24/24",
      time: "2h ago",
      readTime: "5 min read",
      summary: "The leading cryptocurrency continues its bullish momentum...",
      trending: true,
      impact: "high",
      category: "bitcoin"
    },
    {
      id: 2,
      title: "Major DeFi Protocol Launches Layer 2 Solution for Improved Scalability",
      source: "DeFi Daily",
      sourceIcon: "/api/placeholder/24/24",
      time: "4h ago",
      readTime: "3 min read",
      summary: "A leading DeFi platform announces significant upgrades...",
      trending: false,
      impact: "medium",
      category: "defi"
    },
    {
      id: 3,
      title: "NFT Sales Volume Surges as New Collections Hit Market",
      source: "NFT Insider",
      sourceIcon: "/api/placeholder/24/24",
      time: "6h ago",
      readTime: "4 min read",
      summary: "The NFT market shows strong recovery signs...",
      trending: true,
      impact: "medium",
      category: "nft"
    }
  ];

  const getImpactBadge = (impact) => {
    const colors = {
      high: 'bg-error',
      medium: 'bg-warning',
      low: 'bg-info'
    };
    return colors[impact] || 'bg-ghost';
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body p-6">
        <div className="flex flex-col mb-6">
          <h2 className="text-xl font-bold">Crypto News</h2>
          <p className="text-base-content/60 text-sm">
            Stay updated with the latest crypto news and trends
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn btn-sm ${
                selectedCategory === category.id 
                  ? 'btn-primary' 
                  : 'btn-ghost'
              }`}
            >
              {category.name}
              <div className="badge badge-sm">{category.count}</div>
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-4">
          {news.map(item => (
            <div 
              key={item.id}
              className="group bg-base-200 rounded-lg p-4 hover:bg-base-300 transition-all duration-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={item.sourceIcon}
                      alt={item.source}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-sm font-medium">{item.source}</span>
                    <span className="text-xs text-base-content/60">• {item.time}</span>
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-primary cursor-pointer">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-base-content/70 mb-3">
                    {item.summary}
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  {item.trending && (
                    <div className="badge badge-primary gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Trending
                    </div>
                  )}
                  <div className={`badge ${getImpactBadge(item.impact)}`}>
                    {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-base-content/60">{item.readTime}</span>
                <button className="btn btn-ghost btn-sm">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6">
          <button className="btn btn-outline w-full">
            View All News
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;