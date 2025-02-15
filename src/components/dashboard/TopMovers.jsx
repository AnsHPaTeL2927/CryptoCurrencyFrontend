import { useState, useEffect } from 'react';
import AnimatePulseBedge from '../common/AnimatePulseBedge';

const TopMovers = ({theme}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const movers = [
    // First page - Gainers
    { 
      type: 'gainers',
      data: [
        { symbol: 'SOL', name: 'Solana', price: 123.45, change24h: 12.34 },
        { symbol: 'AVAX', name: 'Avalanche', price: 89.32, change24h: 10.45 },
        { symbol: 'MATIC', name: 'Polygon', price: 2.34, change24h: 8.76 }
      ]
    },
    // Second page - Losers
    {
      type: 'losers',
      data: [
        { symbol: 'DOGE', name: 'Dogecoin', price: 0.123, change24h: -8.45 },
        { symbol: 'DOT', name: 'Polkadot', price: 18.76, change24h: -7.23 },
        { symbol: 'UNI', name: 'Uniswap', price: 6.54, change24h: -6.78 }
      ]
    }
  ];

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentSlide(prev => prev === movers.length - 1 ? 0 : prev + 1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide(prev => prev === 0 ? movers.length - 1 : prev - 1);
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide(prev => prev === movers.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Dynamic Header */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-lg">
              Top {movers[currentSlide].type === 'gainers' ? 'Gainers 📈' : 'Losers 📉'}
            </h2>
            <AnimatePulseBedge theme={theme} color='error'/>
        </div>

        {/* Enhanced Carousel */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Content Container with Fixed Height */}
          <div className="overflow-hidden relative min-h-[216px]">
            {/* Navigation Arrows - Absolute positioned within container */}
            <div className="absolute left-0 inset-y-0 z-10 flex items-center">
              <button 
                onClick={handlePrevSlide}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-base-300/50 hover:bg-base-300 transition-colors -ml-2"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="absolute right-0 inset-y-0 z-10 flex items-center">
              <button 
                onClick={handleNextSlide}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-base-300/50 hover:bg-base-300 transition-colors -mr-2"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Carousel Content */}
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {movers.map((page, pageIdx) => (
                <div key={pageIdx} className="min-w-full flex flex-col gap-2">
                  {page.data.map((item) => (
                    <div 
                      key={item.symbol}
                      className="bg-base-200 rounded-lg p-2 hover:bg-base-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                            {item.symbol.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{item.symbol}</div>
                            <div className="text-xs opacity-70">{item.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${item.price.toLocaleString()}
                          </div>
                          <div className={`text-sm ${item.change24h >= 0 ? 'text-success' : 'text-error'}`}>
                            {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {movers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 ${
                  currentSlide === idx 
                    ? 'w-6 h-2 bg-primary rounded-full' 
                    : 'w-2 h-2 bg-base-300 rounded-full hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-center mt-4 opacity-60">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default TopMovers;