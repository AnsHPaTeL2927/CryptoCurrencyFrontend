/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Search, BookOpen, Tag, ArrowLeft, ThumbsUp, ThumbsDown, Share2, Bookmark } from 'lucide-react';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen },
    { id: 'trading', name: 'Trading Guide', icon: BookOpen },
    { id: 'security', name: 'Security', icon: BookOpen },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: BookOpen },
    { id: 'account', name: 'Account Management', icon: BookOpen },
    { id: 'payments', name: 'Payments & Withdrawals', icon: BookOpen }
  ];

  const articles = [
    {
      id: 1,
      title: 'Getting Started with Trading',
      category: 'getting-started',
      tags: ['basics', 'trading'],
      views: 1234,
      helpful: 89,
      lastUpdated: '2024-02-15',
      content: `
        # Getting Started with Trading

        Welcome to our trading platform! This guide will help you understand the basics of trading cryptocurrencies.

        ## Account Setup
        1. Complete your profile
        2. Verify your identity
        3. Add payment method

        ## Making Your First Trade
        - Research the market
        - Choose your cryptocurrency
        - Set your budget
        - Execute the trade

        ## Important Tips
        - Start with small amounts
        - Use stop-loss orders
        - Keep track of your trades
        - Stay informed about market trends

        ## Risk Management
        - Diversify your portfolio
        - Only invest what you can afford to lose
        - Use proper position sizing
        - Monitor market conditions
      `
    },
    {
      id: 2,
      title: 'Common Trading Issues and Solutions',
      category: 'troubleshooting',
      tags: ['problems', 'solutions'],
      views: 856,
      helpful: 67,
      lastUpdated: '2024-02-18',
      content: '...'
    },
    {
      id: 3,
      title: 'Understanding Trading Fees',
      category: 'trading',
      tags: ['fees', 'costs'],
      views: 567,
      helpful: 45,
      lastUpdated: '2024-02-17',
      content: '...'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {selectedArticle ? (
        <ArticleView 
          article={selectedArticle} 
          onBack={() => setSelectedArticle(null)}
        />
      ) : (
        <>
          {/* Search and Category Selection */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
              <input
                type="text"
                placeholder="Search articles..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="select select-bordered w-full lg:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {categories.map(category => (
              <div
                key={category.id}
                className="card bg-base-100 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="card-body">
                  <h3 className="card-title">
                    <category.icon className="w-5 h-5" />
                    {category.name}
                  </h3>
                  <p className="text-base-content/70">
                    {articles.filter(a => a.category === category.id).length} articles
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Articles */}
          {selectedCategory === 'all' && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.slice(0, 2).map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                    featured
                  />
                ))}
              </div>
            </div>
          )}

          {/* Article List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {selectedCategory === 'all' ? 'All Articles' : 
                `Articles in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            {filteredArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
            {filteredArticles.length === 0 && (
              <div className="text-center py-8 text-base-content/60">
                No articles found matching your criteria
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Article Card Component
const ArticleCard = ({ article, onClick, featured }) => (
  <div 
    className={`card bg-base-100 hover:shadow-lg transition-shadow cursor-pointer
      ${featured ? 'border border-primary/20' : ''}`}
    onClick={onClick}
  >
    <div className="card-body">
      <h3 className="card-title text-lg">{article.title}</h3>
      <div className="flex flex-wrap gap-2 my-2">
        {article.tags.map(tag => (
          <div key={tag} className="badge badge-outline gap-1">
            <Tag className="w-3 h-3" />
            {tag}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-base-content/70">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          {article.helpful} helpful
        </div>
        <div>
          Updated {new Date(article.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  </div>
);

// Article View Component
const ArticleView = ({ article, onBack }) => {
  const [isHelpful, setIsHelpful] = useState(null);

  return (
    <div>
      {/* Article Header */}
      <div className="mb-6">
        <button className="btn btn-ghost btn-sm mb-4" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </button>
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {article.views} views
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {article.helpful} found helpful
          </div>
          <div>
            Last updated {new Date(article.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose max-w-none mb-8">
        {article.content}
      </div>

      {/* Article Footer */}
      <div className="border-t pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-base-content/70">Was this article helpful?</span>
            <div className="flex gap-2">
              <button 
                className={`btn btn-sm ${isHelpful === true ? 'btn-success' : 'btn-ghost'}`}
                onClick={() => setIsHelpful(true)}
              >
                <ThumbsUp className="w-4 h-4" />
                Yes
              </button>
              <button 
                className={`btn btn-sm ${isHelpful === false ? 'btn-error' : 'btn-ghost'}`}
                onClick={() => setIsHelpful(false)}
              >
                <ThumbsDown className="w-4 h-4" />
                No
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="btn btn-ghost btn-sm">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;