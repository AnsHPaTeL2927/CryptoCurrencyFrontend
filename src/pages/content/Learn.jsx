import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Learn = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const difficultyLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const courses = [
    {
      id: 1,
      title: "Cryptocurrency Basics",
      description: "Learn the fundamentals of cryptocurrency, blockchain technology, and digital assets.",
      level: "beginner",
      duration: "2 hours",
      modules: 5,
      image: "/api/placeholder/800/400",
      category: "fundamentals",
      progress: 0,
      topics: ["Bitcoin", "Blockchain", "Wallets", "Exchanges"],
      enrolled: 15240
    },
    {
      id: 2,
      title: "DeFi Fundamentals",
      description: "Understanding decentralized finance, protocols, and yield farming strategies.",
      level: "intermediate",
      duration: "3 hours",
      modules: 6,
      image: "/api/placeholder/800/400",
      category: "defi",
      progress: 0,
      topics: ["Lending", "Borrowing", "Yield Farming", "Liquidity Pools"],
      enrolled: 12350
    },
    {
      id: 3,
      title: "Advanced Trading Strategies",
      description: "Master cryptocurrency trading with advanced technical analysis and risk management.",
      level: "advanced",
      duration: "4 hours",
      modules: 8,
      image: "/api/placeholder/800/400",
      category: "trading",
      progress: 0,
      topics: ["Technical Analysis", "Risk Management", "Trading Psychology", "Market Analysis"],
      enrolled: 8760
    },
    {
      id: 4,
      title: "NFT Creation & Trading",
      description: "Learn to create, value, and trade Non-Fungible Tokens in the digital art market.",
      level: "intermediate",
      duration: "2.5 hours",
      modules: 5,
      image: "/api/placeholder/800/400",
      category: "nft",
      progress: 0,
      topics: ["NFT Creation", "Marketplaces", "Valuation", "Trading"],
      enrolled: 10890
    },
    {
      id: 5,
      title: "Blockchain Development",
      description: "Introduction to blockchain development and smart contract programming.",
      level: "advanced",
      duration: "5 hours",
      modules: 10,
      image: "/api/placeholder/800/400",
      category: "development",
      progress: 0,
      topics: ["Smart Contracts", "Solidity", "Web3.js", "DApp Development"],
      enrolled: 7650
    },
    {
      id: 6,
      title: "Crypto Security Best Practices",
      description: "Essential security practices for protecting your cryptocurrency investments.",
      level: "beginner",
      duration: "1.5 hours",
      modules: 4,
      image: "/api/placeholder/800/400",
      category: "security",
      progress: 0,
      topics: ["Wallet Security", "Safe Trading", "Scam Prevention", "Best Practices"],
      enrolled: 18920
    }
  ];

  const quickGuides = [
    {
      title: "What is Bitcoin?",
      duration: "5 min read",
      category: "fundamentals"
    },
    {
      title: "Understanding Blockchain",
      duration: "7 min read",
      category: "technology"
    },
    {
      title: "Crypto Wallets Explained",
      duration: "6 min read",
      category: "security"
    },
    {
      title: "DeFi Quick Start",
      duration: "8 min read",
      category: "defi"
    }
  ];

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <h1 className="text-4xl font-bold mb-2">Learn Cryptocurrency</h1>
        <p className="text-base-content/70">Master the world of cryptocurrency with our comprehensive courses</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search courses..."
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

        {/* Difficulty Filters */}
        <div className="flex flex-wrap gap-2">
          {difficultyLevels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`btn ${selectedLevel === level.id ? 'btn-primary' : 'btn-ghost'}`}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>

      {/* Learning Path Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Recommended Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-primary text-primary-content">
            <div className="card-body">
              <h3 className="card-title">Start Here</h3>
              <p>Begin with cryptocurrency basics and fundamentals</p>
              <div className="card-actions justify-end">
                <button className="btn btn-ghost">Get Started</button>
              </div>
            </div>
          </div>
          <div className="card bg-secondary text-secondary-content">
            <div className="card-body">
              <h3 className="card-title">Intermediate</h3>
              <p>Advance to trading strategies and DeFi concepts</p>
              <div className="card-actions justify-end">
                <button className="btn btn-ghost">Continue</button>
              </div>
            </div>
          </div>
          <div className="card bg-accent text-accent-content">
            <div className="card-body">
              <h3 className="card-title">Advanced</h3>
              <p>Master advanced topics and blockchain development</p>
              <div className="card-actions justify-end">
                <button className="btn btn-ghost">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <figure>
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <div className="badge badge-primary">{course.level}</div>
                  <div className="badge badge-ghost">{course.duration}</div>
                </div>
                <h3 className="card-title">{course.title}</h3>
                <p className="text-base-content/70 line-clamp-2">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="badge badge-outline">{topic}</div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{course.modules} Modules</span>
                    <span>{course.enrolled.toLocaleString()} Enrolled</span>
                  </div>
                  <progress 
                    className="progress progress-primary w-full" 
                    value={course.progress} 
                    max="100"
                  ></progress>
                </div>
                
                <div className="card-actions justify-end mt-4">
                  <Link to={`/learn/${course.id}`} className="btn btn-primary">
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Guides Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Quick Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickGuides.map((guide, index) => (
            <div key={index} className="card bg-base-100 shadow hover:shadow-lg transition-all">
              <div className="card-body">
                <h3 className="card-title text-lg">{guide.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-base-content/70">{guide.duration}</span>
                  <Link to="#" className="btn btn-ghost btn-sm">Read Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary rounded-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Glossary</h3>
                <p className="text-sm text-base-content/70">Cryptocurrency terms explained</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary rounded-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Video Tutorials</h3>
                <p className="text-sm text-base-content/70">Visual learning resources</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-accent rounded-lg p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Community Forum</h3>
                <p className="text-sm text-base-content/70">Discuss and learn together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;