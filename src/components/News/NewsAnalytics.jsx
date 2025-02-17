/* eslint-disable react/prop-types */
import { PieChart } from "lucide-react";
export const NewsAnalytics = ({ news }) => {
    // Sentiment and Impact Color Mapping
    const SENTIMENT_COLORS = {
        bullish: 'badge-success',
        bearish: 'badge-error',
        positive: 'badge-primary',
        neutral: 'badge-neutral'
    };

    const sentimentCounts = news.reduce((acc, item) => {
        acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
        return acc;
    }, {});

    const categoryCounts = news.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="card bg-base-100 shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <PieChart className="mr-2 text-primary" />
                News Analytics
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2">Sentiment Distribution</h3>
                    {Object.entries(sentimentCounts).map(([sentiment, count]) => (
                        <div key={sentiment} className="flex justify-between items-center mb-1">
                            <span className={`badge ${SENTIMENT_COLORS[sentiment]}`}>
                                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                            </span>
                            <span>{count}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Category Breakdown</h3>
                    {Object.entries(categoryCounts).map(([category, count]) => (
                        <div key={category} className="flex justify-between items-center mb-1">
                            <span className="badge badge-ghost">{category}</span>
                            <span>{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};