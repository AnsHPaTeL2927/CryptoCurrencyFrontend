import React, { useState } from 'react';

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTimeFilter, setActiveTimeFilter] = useState('24h');
  const [activeCategory, setActiveCategory] = useState('all');

  const timeFilters = [
    { id: '24h', name: 'Last 24 Hours' },
    { id: '7d', name: 'Last 7 Days' },
    { id: '30d', name: 'Last 30 Days' }
  ];

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nfts', name: 'NFTs' },
    { id: 'regulation', name: 'Regulation' },
    { id: 'technology', name: 'Technology' }
  ];

  const dummyNews = [
    {
      id: 1,
      title: "Bitcoin Surges Past $50,000 as Institutional Interest Grows",
      category: "bitcoin",
      source: "CryptoNews",
      image: "/api/placeholder/800/400",
      readTime: "5 min",
      content: "Bitcoin has reached a new milestone as institutional investors continue to show strong interest in cryptocurrency investments. Major financial institutions are increasingly adding Bitcoin to their portfolios, driving the price to new heights.",
      date: "2024-02-18",
      author: "Sarah Johnson",
      views: 15420,
      tags: ["Bitcoin", "Investment", "Market Analysis"]
    },
    {
      id: 2,
      title: "Ethereum 2.0 Upgrade Shows Promising Results in Latest Tests",
      category: "ethereum",
      source: "BlockchainDaily",
      image: "/api/placeholder/800/400",
      readTime: "8 min",
      content: "The latest test results from the Ethereum 2.0 upgrade demonstrate significant improvements in network performance and energy efficiency. Developers report successful implementation of key features.",
      date: "2024-02-18",
      author: "Michael Chen",
      views: 12350,
      tags: ["Ethereum", "Technology", "Blockchain"]
    },
    {
      id: 3,
      title: "New DeFi Protocol Achieves $1B Total Value Locked",
      category: "defi",
      source: "DeFiWorld",
      image: "/api/placeholder/800/400",
      readTime: "6 min",
      content: "A revolutionary new DeFi protocol has reached $1 billion in total value locked within just two weeks of launch. The platform offers innovative yield farming strategies and improved security measures.",
      date: "2024-02-18",
      author: "Alex Thompson",
      views: 9840,
      tags: ["DeFi", "TVL", "Yield Farming"]
    },
    {
      id: 4,
      title: "Major NFT Collection Sets New Sales Record",
      category: "nfts",
      source: "NFTInsider",
      image: "/api/placeholder/800/400",
      readTime: "4 min",
      content: "A prominent NFT collection has broken previous sales records, with a single piece selling for over $10 million. The sale marks a significant milestone in the digital art market.",
      date: "2024-02-18",
      author: "Emily Parker",
      views: 8760,
      tags: ["NFT", "Digital Art", "Auction"]
    },
    {
      id: 5,
      title: "New Crypto Regulations Proposed in European Union",
      category: "regulation",
      source: "CryptoRegWatch",
      image: "/api/placeholder/800/400",
      readTime: "7 min",
      content: "The European Union has proposed new cryptocurrency regulations aimed at increasing transparency and security in the digital asset market. The proposal includes stricter KYC requirements.",
      date: "2024-02-18",
      author: "Thomas Weber",
      views: 11230,
      tags: ["Regulation", "EU", "Compliance"]
    },
    {
      id: 6,
      title: "Revolutionary Blockchain Scaling Solution Unveiled",
      category: "technology",
      source: "TechCrypto",
      image: "/api/placeholder/800/400",
      readTime: "9 min",
      content: "A team of researchers has announced a breakthrough in blockchain scaling technology, promising to handle over 100,000 transactions per second while maintaining decentralization.",
      date: "2024-02-18",
      author: "David Kim",
      views: 13580,
      tags: ["Technology", "Scaling", "Innovation"]
    }
  ];

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-4xl font-bold mb-2">Cryptocurrency News</h1>
        <p className="text-base-content/70">Stay updated with the latest crypto news and insights</p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col gap-6">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search news..."
            className="input input-bordered w-full pl-12 h-14 bg-white focus:outline-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-ghost btn-circle absolute left-2 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Time Filters */}
          <div className="flex flex-wrap gap-2">
            {timeFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveTimeFilter(filter.id)}
                className={`btn ${activeTimeFilter === filter.id ? 'btn-primary' : 'btn-ghost'} min-w-[120px] md:min-w-[140px]`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`btn btn-sm ${activeCategory === category.id ? 'btn-primary' : 'btn-ghost'} hover:btn-primary transition-colors`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {dummyNews.map(news => (
          <div key={news.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure className="relative">
              <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="badge badge-primary">{news.source}</div>
                <div className="badge badge-ghost">{news.readTime}</div>
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title line-clamp-2">{news.title}</h2>
              <p className="text-base-content/70 line-clamp-3">{news.content}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {news.tags.map((tag, index) => (
                  <div key={index} className="badge badge-outline">{tag}</div>
                ))}
              </div>
              
              <div className="card-actions justify-between items-center mt-4">
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {news.views.toLocaleString()}
                </div>
                <button className="btn btn-primary btn-sm">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;