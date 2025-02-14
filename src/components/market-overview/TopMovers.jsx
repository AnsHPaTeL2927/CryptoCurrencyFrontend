import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TopMovers = () => {
    const [currentTab, setCurrentTab] = useState('gainers');
    const [animate, setAnimate] = useState(true);

    const data = {
        gainers: [
            { symbol: 'SOL', name: 'Solana', price: 123.45, change: 12.34 },
            { symbol: 'AVAX', name: 'Avalanche', price: 89.32, change: 10.45 },
            { symbol: 'MATIC', name: 'Polygon', price: 2.34, change: 8.76 },
            { symbol: 'DOT', name: 'Polkadot', price: 18.76, change: 8.23 },
            { symbol: 'LINK', name: 'Chainlink', price: 15.67, change: 7.89 }
        ],
        losers: [
            { symbol: 'DOGE', name: 'Dogecoin', price: 0.123, change: -8.45 },
            { symbol: 'ADA', name: 'Cardano', price: 0.45, change: -7.23 },
            { symbol: 'UNI', name: 'Uniswap', price: 6.54, change: -6.78 },
            { symbol: 'ATOM', name: 'Cosmos', price: 8.90, change: -6.45 },
            { symbol: 'XLM', name: 'Stellar', price: 0.11, change: -5.67 }
        ]
    };

    useEffect(() => {
        setAnimate(false);
        const timeout = setTimeout(() => setAnimate(true), 50);
        return () => clearTimeout(timeout);
    }, [currentTab]);

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="card-title">Top Movers</h2>

                    <div className="tabs tabs-boxed">
                        <button
                            className={`tab ${currentTab === 'gainers' ? 'tab-active' : ''}`}
                            onClick={() => setCurrentTab('gainers')}
                        >
                            Gainers
                        </button>
                        <button
                            className={`tab ${currentTab === 'losers' ? 'tab-active' : ''}`}
                            onClick={() => setCurrentTab('losers')}
                        >
                            Losers
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    {data[currentTab].map((coin, index) => (
                        <div
                            key={coin.symbol}
                            className={`flex items-center justify-between p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-all cursor-pointer ${animate ? 'animate-slideInRight' : 'opacity-0'
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center font-bold">
                                    {coin.symbol.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-medium">{coin.symbol}</div>
                                    <div className="text-xs opacity-70">{coin.name}</div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="font-medium">
                                    ${coin.price.toLocaleString()}
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${coin.change >= 0 ? 'text-success' : 'text-error'
                                    }`}>
                                    {coin.change >= 0 ? (
                                        <ArrowUpRight size={16} />
                                    ) : (
                                        <ArrowDownRight size={16} />
                                    )}
                                    {Math.abs(coin.change)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-base-200">
                    <div className="text-sm opacity-70 text-center">
                        Updated every 5 minutes
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopMovers;